import { TreeNode } from "../tree";
import { isTreeLeaf } from "./leaf";

interface Params {
	/** Start from here */
	node: TreeNode;
	/** Id of the node to find */
	id: string;
}

/**
 * Check if a node is in the tree by its "id".
 *
 * This is a naive implementation that simply traverses all nodes O(n) to
 * check for "id". If your "id"s can represent the path, use the optimized
 * version which can skip branches O(logN).
 */
export const isTreeNodeExist = (params: Params): boolean => {
	const { node, id } = params;
	if (node.id === id) return true;
	if (isTreeLeaf(node)) return false;
	if (node.children === undefined) return false;
	return node.children.some((child) => {
		return isTreeNodeExist({ node: child, id });
	});
};
