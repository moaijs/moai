import { TreeNode } from "../tree";
import { isTreeLeaf } from "./leaf";

interface Params {
	node: TreeNode;
	loadChildren: (node: TreeNode) => Promise<TreeNode[]>;
}

export const refreshTree = async (params: Params): Promise<TreeNode> => {
	const { loadChildren, node } = params;

	if (isTreeLeaf(node)) return node;
	if (node.children === undefined) return node; // Not expanded

	const prevs = new Map(node.children.map((child) => [child.id, child]));
	const currs = await loadChildren(node);
	const promises = currs.map(async (child) => {
		const prev = prevs.get(child.id);
		const target = prev === undefined ? child : prev;
		const next = await refreshTree({ loadChildren, node: target });
		return next;
	});
	const nexts = await Promise.all(promises);

	return { ...node, children: nexts };
};
