const Pad2 = (n: number) => (n < 10 ? '0' + n : n);
const OrdTerm = ['th', 'st', 'nd', 'rd'];
const OrdinalTermination = (n: number) =>
	n > 3 && n < 21 ? 'th' : n % 10 < OrdTerm.length ? OrdTerm[n % 10] : 'th';
const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const fmt_date = (date: string | number | Date): string => {
	const d = new Date(date);
	return `the ${Pad2(d.getDate())}${OrdinalTermination(d.getDate())} of ${
		Months[d.getMonth()]
	} ${d.getFullYear()}`;
};
