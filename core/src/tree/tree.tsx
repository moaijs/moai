import { useEffect } from "react";
import { TreeRow } from "./row/row";

export interface TreeNode {
	id: string;
	label: string;
	/**
	 * May be undefined when:
	 * - Node is a leaf
	 * - Node is not fetched in case of async Tree
	 */
	children?: TreeNode[];
	/**
	 * Required in case async Tree (i.e. props.loadChildren is defined) since
	 * parent nodes also have undefined children before loading
	 */
	isLeaf?: boolean;
}

export interface TreeProps {
	/**
	 * Nested level. This is only used to render the left padding of nested
	 * nodes. The consumer usually should not set this since they are passing
	 * the root node.
	 */
	level?: number;
	/**
	 * A tree's shape is completely controlled. The Tree component cannot
	 * change the tree shape (root) on its own.
	 */
	node: TreeNode;
	/**
	 * Because Tree is a controlled component, it can only ask the host to
	 * load children and update the root on their side.
	 *
	 * This returns "void" since it expects the "root" prop will be update and
	 * thus leads to a new render altogether.
	 */
	loadChildren?: (node: TreeNode) => Promise<void>;
	/**
	 * Selected nodes in controlled mode
	 */
	selected: Set<string>;
	/**
	 * Handler to set selected nodes in controlled mode
	 */
	setSelected: (set: Set<string>) => void;
	/**
	 * Expanded nodes in controlled mode
	 */
	expanded: Set<string>;
	/**
	 * Handler to set expanded nodes in controlled mode
	 */
	setExpanded: (set: Set<string>) => void;
	/**
	 * Whether clicking on a parent's title will select or expand it. If set to
	 * "select", clicking on the chevron arrow will expand it.
	 */
	parentMode: "select" | "expand";
}

export const Tree = (props: TreeProps): JSX.Element => {
	const expanded = props.expanded.has(props.node.id);

	const { loadChildren, node } = props;
	useEffect(() => {
		if (expanded) loadChildren?.(node);
	}, [loadChildren, expanded, node]);

	const body = (
		<>
			<TreeRow {...props} />
			{props.node.children && expanded && (
				<>
					{props.node.children.map((node) => (
						<Tree
							{...props}
							key={node.id}
							level={(props.level ?? 0) + 1}
							node={node}
						/>
					))}
				</>
			)}
		</>
	);
	return props.level === 0 ? <div>{body}</div> : body;
};
