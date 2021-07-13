import { Button } from "../../button/button";
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";
import { TreeProps } from "../tree";
import { isTreeLeaf } from "../utils/leaf";
import s from "./row.module.css";

// For indentation, like in source code
const Tab = () => (
	<div className={[Button.sizes.smallIcon.main, s.tab].join(" ")} />
);

const toggle = async (props: TreeProps): Promise<void> => {
	const expanded = new Set(props.expanded);
	if (expanded.has(props.node.id)) {
		expanded.delete(props.node.id);
	} else {
		expanded.add(props.node.id);
	}
	props.setExpanded(expanded);
};

export const TreeRow = (props: TreeProps): JSX.Element => {
	const expanded = props.expanded.has(props.node.id);
	const selected = props.selected.has(props.node.id);
	const isLeaf = isTreeLeaf(props.node);
	return (
		<div
			className={[
				s.container,
				Button.styles.flat.main,
				selected ? Button.styles.flat.selected : "",
			].join(" ")}
			// @TODO: Handle a11y properly
			onClick={() => {
				if (isLeaf || props.parentMode === "select") {
					props.setSelected(new Set([props.node.id]));
				} else {
					toggle(props);
				}
			}}
		>
			{[...Array(props.level ?? 0)].map((_v, i) => (
				<Tab key={i} />
			))}
			<div className={s.toggle}>
				{isLeaf === false ? (
					<Button
						icon={expanded ? RiArrowDownSLine : RiArrowRightSLine}
						iconLabel={expanded ? "Collapse group" : "Expand group"}
						onClick={() => toggle(props)}
						style={Button.styles.flat}
						size={Button.sizes.smallIcon}
					/>
				) : (
					<Tab />
				)}
			</div>
			<div className={s.label}>{props.node.label}</div>
		</div>
	);
};
