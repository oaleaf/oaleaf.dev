export type BlogPost = {
	title: string;
	author: string;
	date: Date;
	editedOn?: Date;
	shortContent?: string;
	tags?: string[];
	category?: string;
	preview?: string;
	ref: string;
};

const Map = import.meta.globEager(`../../routes/blog/posts/*.svx`);

const blog_post_links = ['typing-container'];
const map = (ref: string): BlogPost => {
	const k = `../../routes/blog/posts/${ref}.svx`;
	const metadata = Map[k].metadata;

	return {
		title: metadata.title,
		author: metadata.author,
		date: new Date(metadata.date),
		editedOn: metadata.editedOn ? new Date(metadata.editedOn) : undefined,
		shortContent: metadata.shortContent || undefined,
		tags: metadata.tags || undefined,
		category: metadata.category || undefined,
		preview: metadata.preview || undefined,
		ref: ref.replace(/\/index$/, '')
	};
};

const compose = (args: string[]): BlogPost[] => args.map(map);

export const BlogPosts: BlogPost[] = compose(blog_post_links);
