import { TreeNode } from "../tree";

export const isTreeLeaf = (node: TreeNode): boolean => {
	if (node.isLeaf === undefined) {
		return node.children === undefined; // Sync
	} else {
		return node.isLeaf; // Async
	}
};
