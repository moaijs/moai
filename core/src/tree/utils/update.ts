import { TreeNode } from "../tree";

interface Params<T extends keyof TreeNode> {
	/** Start from here */
	current: TreeNode;
	/** Id of the node to be updated */
	id: string;
	/** The name of the property to be updated */
	key: T;
	/** The new value of the property */
	value: TreeNode[T];
}

/**
 * Update a property of a node.
 *
 * This is a naive implementation that simply traverses all nodes O(n) to
 * check for "id". If your "id"s can represent the path, use the optimized
 * version which can skip branches O(logN).
 */
export const updateTreeNode = <T extends keyof TreeNode>(
	params: Params<T>
): TreeNode => {
	const { current, id, key, value } = params;
	if (current.id === id) {
		return { ...current, [key]: value };
	} else if (current.children !== undefined) {
		const children = current.children.map((child) => {
			return updateTreeNode({ current: child, id, key, value });
		});
		return { ...current, children };
	} else {
		return current;
	}
};
