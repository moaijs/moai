import { TreeNode } from "../tree";
import { isTreeLeaf } from "./leaf";

interface Params {
	/** Start from here */
	node: TreeNode;
	/** Id of the parent node to add to */
	id: string;
	/** The new node to be added */
	addNode: TreeNode;
	/** If set, sort the "children" of "id" after add node */
	sort: boolean;
}

const compareNode = (a: TreeNode, b: TreeNode): number =>
	a.id.localeCompare(b.id);

/**
 * Add a node in the tree.
 *
 * - If "id" is leaf: throws error
 * - If "id" does not exist: throws error
 * - If "id" is not loaded (false isLeaf and undefined children): skip
 *
 * This is a naive implementation that simply traverses all nodes O(n) to
 * check for "id". If your "id"s can represent the path, use the optimized
 * version which can skip branches O(logN).
 */
export const addTreeNode = ({ node, id, addNode, sort }: Params): TreeNode => {
	if (node.id === id) {
		if (isTreeLeaf(node)) throw Error("Cannot add node to a leaf");
		if (node.children === undefined) return node; // Skip as not loaded
		const children: TreeNode[] = [...node.children, addNode];
		if (sort) children.sort(compareNode);
		return { ...node, children };
	} else {
		if (isTreeLeaf(node)) return node;
		if (node.children === undefined) return node; // Skip as not loaded
		const children = node.children.map((child) => {
			return addTreeNode({ node: child, id, addNode, sort });
		});
		return { ...node, children };
	}
};
