<script context='module' lang='ts'>
	import * as htmlparser2 from 'htmlparser2';

	export interface TagAttrs {
		[key: string]: string;
	}

	export type Event = { text: string } | { tag: string, tag_attrs?: TagAttrs, close?: boolean } | { closeTag: string };
	export type TextWithEvents = Event[];

	export type TypingContainerInternalState = {
		suspend: (time: number) => Promise<void>,
	};
</script>

<script lang='ts'>
	export let available_texts: (string | TextWithEvents)[];
	export let single_mode = false;
	export let install_tab_hook = false;
	export let repeat = true;

	export let on_tab_callback: (() => void) = () => {
		return;
	};

	export let on_reached_end: ((() => void) | null) = null;

	export let on_index_raise_callback: ((index: number, internal_state: TypingContainerInternalState) => void) = () => {
		return;
	};

	if (single_mode) {
		repeat = false;
	}

	if (repeat && on_reached_end !== null) {
		console.error('TypingContainer: repeat and on_reached_end cannot be used together');
	}

	if (install_tab_hook && single_mode) {
		console.error('TypingContainer: single_mode and install_tab_hook cannot be used together');
	}

	const CPM = 1000;
	const CPS = CPM / 60;
	const HOLD_TIME = [7, 10, 100];
	const DELETE_SPEEDUP = 5;

	const INTERVAL_TIME = 1000 / CPS / DELETE_SPEEDUP;

	const parse = (text: string): TextWithEvents => {
		let events: TextWithEvents = [];

		const parser = new htmlparser2.Parser({
				onopentag(name, attrs) {
					events.push({ tag: name, tag_attrs: attrs });
				},
				ontext(text) {
					events.push({ text });
				},
				onclosetag(name) {
					if (events[events.length - 1].tag === name) {
						events[events.length - 1].close = true;
					} else {
						events.push({ closeTag: name });
					}
				}
			},
			{ decodeEntities: true });

		parser.write(text);
		parser.end();

		return events;
	};

	const parsed_texts = available_texts.map(l => typeof l === 'string' ? parse(l) : l);

	const fmt_tag = (tag: { tag: string, tag_attrs?: TagAttrs, close?: boolean }): string => {
		let attrs = Object.entries(tag.tag_attrs || {}).map(([key, value]) => `${key}="${value}"`).join(' ');
		if (attrs !== '') {
			attrs = ` ${attrs}`;
		}
		const closed = tag.close ? '/' : '';
		return `<${tag.tag}${attrs}${closed}>`;
	};

	const compute_len = (text: string | TextWithEvents): number => {
		if (typeof text === 'string') {
			return text.length;
		}

		let len = 0;
		for (const e of text) {
			if (e.text) {
				len += e.text.length;
			}
			if (e.tag) {
				len += fmt_tag(e).length;
			}
			if (e.closeTag) {
				len += `</${e.closeTag}>`.length;
			}
		}

		return len;
	};


	/*
	* State
	* */
	let index = 0;
	let text: TextWithEvents = parsed_texts[index];
	let totalLen = compute_len(text);

	let hold_state = -1;
	let hold_offset = 0;
	let type_offset = 0;

	let caret_pos = 0;
	let left: string, right: string;
	let tag_end = -1;
	let increase = true;
	let timer;


	const raiseIndex = () => {
		if (at_end() && !repeat) {
			return;
		}

		index = (index + 1) % parsed_texts.length;

		on_index_raise_callback(index, {
			suspend: (time: number) => {
				return new Promise(resolve => {
					if (timer) {
						clearInterval(timer);
						timer = null;
					}

					setTimeout(() => {
						resolve();

						timer = setInterval(compute, INTERVAL_TIME);
					}, time);
				});
			}
		});
	};

	const at_end = () => index + 1 === available_texts.length;

	$: {
		text = parsed_texts[index];
		totalLen = compute_len(text);
	}

	const render = (
		caret_pos: number,
		text: string | TextWithEvents,
		increasing: boolean
	): { left: string, right: string, tag_end: number } => {
		if (typeof text === 'string') {
			let left = text.substring(0, caret_pos);
			let right = text.substring(caret_pos);

			return {
				left,
				right,
				tag_end: -1
			};
		}

		let left = '';
		let right = '';

		let tag_stack = [];
		let end_stack = [];

		let tag_end = -1;

		let len = 0;
		for (const e of text) {
			let next_len;
			if (e.text) {
				next_len = len + e.text.length;
			}
			if (e.tag) {
				next_len = len + fmt_tag(e).length;

				if (!e.close) {
					tag_stack.push(e);
				}
			}
			if (e.closeTag) {
				next_len = len + `</${e.closeTag}>`.length;
				tag_stack.pop();
			}

			if (caret_pos >= len && caret_pos < next_len) {
				end_stack = Array.from(tag_stack);

				if (e.tag || e.closeTag) {
					tag_end = increasing ? next_len : len;
				}
			}

			if (caret_pos >= next_len) {
				if (e.text) {
					left += e.text;
				} else if (e.tag) {
					left += fmt_tag(e);
				} else if (e.closeTag) {
					left += `</${e.closeTag}>`;
				}
			} else {
				if (e.text) {
					if (caret_pos >= len) {
						left += e.text.substring(0, caret_pos - len);
						right += e.text.substring(caret_pos - len);
					} else {
						right += e.text;
					}
				} else if (e.tag) {
					if (caret_pos >= len) {
						left += fmt_tag(e);
					} else {
						right += fmt_tag(e);
					}
				} else if (e.closeTag) {
					if (caret_pos >= len) {
						left += `</${e.closeTag}>`;
					} else {
						right += `</${e.closeTag}>`;
					}
				}
			}

			len = next_len;
		}

		let left_closing = end_stack.map(e => `</${e.tag}>`).reverse().join('');
		let right_opening = end_stack.map(fmt_tag).join('');

		return {
			left: left + left_closing,
			right: right_opening + right,
			tag_end
		};
	};

	$: {
		let result = render(caret_pos, text, increase);
		left = result.left;
		right = result.right;
		tag_end = result.tag_end;
	}

	const compute = () => {
		if (hold_state !== -1) {
			hold_offset += 1;

			if (hold_offset >= HOLD_TIME[hold_state] * DELETE_SPEEDUP) {
				if (hold_state != 0) {
					hold_state = -1;
				} else {
					hold_state = 1;
					raiseIndex();
				}
				hold_offset = 0;
			}

			return;
		}
		if (increase) {
			type_offset++;
			if (type_offset >= DELETE_SPEEDUP) {
				type_offset = 0;
			} else {
				return;
			}

			if (tag_end !== -1) {
				caret_pos = tag_end;
			}

			if (caret_pos >= totalLen) {
				if (!repeat && at_end()) {
					clearInterval(timer);

					if (on_reached_end) {
						on_reached_end();
					}
					hold_state = 100;
					return;
				}

				increase = false;

				hold_state = 2;
			}

			caret_pos++;
		} else {
			if (tag_end !== -1) {
				caret_pos = tag_end;
			}

			if (caret_pos <= 0) {
				increase = true;

				hold_state = 0;
			}

			caret_pos--;
		}
	};

	timer = setInterval(compute, INTERVAL_TIME);

	const handleKeydown = (event) => {
		if (install_tab_hook) {
			if (event.key === 'Tab') {
				event.preventDefault();

				clearInterval(timer);

				hold_state = 1;
				hold_offset = 0;

				caret_pos = 0;
				increase = true;

				raiseIndex();

				timer = setInterval(compute, INTERVAL_TIME);

				on_tab_callback();

				return;
			}
		}
	};
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- spaces between the `span.typed`, `div.caret-container-container` and `span.to-type`
 show up and they are ugly, so prettier should not to format this
 -->

<!-- prettier-ignore -->
<!--@formatter:off-->
<div class="typing-text">
  <span class="typed">{@html left}</span><div class="caret-container-container">
    <div class="caret-container"><span class="caret"
                                       class:caret-expand="{hold_state !== -1}"></span></div>
  </div><span class="to-type">{@html right}</span>
</div>
<!--@formatter:on-->

<style>
    .typing-text {
        min-height: 50px;
        line-height: 1.4;
    }

    /*disable font ligatures

      while the caret moves through a ligature, it has to split
      the characters, making it extremely ugly*/
    .typing-text {
        font-variant-ligatures: none;
    }

    .typed {
        font-variant-ligatures: none;
    }

    .caret-container-container {
        display: inline-block;
        position: relative;

        height: calc(min(5vw, 28px) + 3px);
        margin-bottom: -5px;
    }

    .caret-container {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 -1px 0 0;
        padding: 0;

        height: 100%;
        position: absolute;
        bottom: 0;
    }

    .caret {
        border-left: 2px solid var(--text-color);

        height: 100%;
    }

    .to-type {
        opacity: 0.3;
    }

    .caret-expand {
        animation: both caret-expand-animation 0.7s linear infinite alternate;
    }

    @keyframes caret-expand-animation {
        to {
            height: 0;
        }
    }
</style>