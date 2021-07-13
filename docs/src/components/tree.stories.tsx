import { useState } from "react";
import { Meta } from "@storybook/react";
import { Tree, TreeProps } from "../../../core/src";
import { Utils } from "../utils/utils";

const meta: Meta = {
	title: "Components/Tree",
	component: Tree,
	argTypes: {
		parentMode: Utils.arg(["select", "expand"]),
	},
};

export default meta;

const root = {
	id: "root",
	label: "Document",
	children: [
		{
			id: "hello-file",
			label: "hello.txt",
		},
		{
			id: "gallery-folder",
			label: "Gallery",
			children: [
				{
					id: "autumn-picture",
					label: "autumn.png",
				},
				{
					id: "summer-picture",
					label: "summer.png",
				},
			],
		},
	],
};

interface Props {
	parentMode: TreeProps["parentMode"];
}

export const Basic = (props: Props): JSX.Element => {
	const [expanded, setExpanded] = useState<Set<string>>(new Set());
	const [selected, setSelected] = useState<Set<string>>(new Set());

	return (
		<Tree
			expanded={expanded}
			setExpanded={setExpanded}
			selected={selected}
			setSelected={setSelected}
			node={root}
			parentMode={props.parentMode}
		/>
	);
};
