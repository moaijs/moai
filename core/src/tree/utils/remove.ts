import { TreeNode } from "../tree";
import { isTreeLeaf } from "./leaf";

interface Params {
	tree: TreeNode;
	deleteId: string;
}

/**
 * Remove a node from the tree.
 *
 * This is a naive implementation that simply traverses all nodes O(n) to
 * check for "deleteId". If your "id"s can represent the path, use the
 * optimized version which can skip branches O(logN).
 */
export const removeTreeNode = (params: Params): TreeNode => {
	const { tree, deleteId } = params;

	if (isTreeLeaf(tree)) return tree;
	if (tree.children === undefined) return tree;

	// @TODO: The performance here is worst
	const children = tree.children
		.filter((child) => child.id !== deleteId)
		.map((child) => removeTreeNode({ tree: child, deleteId }));

	return { ...tree, children };
};
