export default function useQuerySelector(parentNode: ParentNode, selector: string) {
	const el = parentNode.querySelectorAll(selector);
	return el.length === 1 ? el[0] : el;
}
