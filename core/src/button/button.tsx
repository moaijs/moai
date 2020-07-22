import React from "react";

import { Icon, IconPath, IconSize } from "../icon/icon";
import { outline } from "../outline/outline";
import { DivPx, DivSize } from "../div/div";

import s from "./button.module.scss";
import flat from "./flat.module.scss";
import outset from "./outset.module.scss";

export interface ButtonStyle {
	main: string;
	selected: string;
	disabled: string;
	highlight: string;
}

export type ButtonSize = {
	main: string;
	iconSize: IconSize;
	iconMargin: DivSize;
};

const getClass = (props: Props) => {
	const { highlight, selected, size, style, isFullWidth, disabled } = props;
	if (highlight === true && selected === true)
		throw Error("Button cannot have both highlight and selected (yet).");
	const classes = [s.button, size.main, style.main];
	if (isFullWidth) classes.push(s.fullWidth);
	if (selected) classes.push(style.selected);
	if (highlight) classes.push(style.highlight);
	if (disabled) classes.push(style.disabled, s.disabled);
	return classes.join(" ");
};

interface Props {
	children?: React.ReactNode;
	icon?: IconPath;
	// target - button
	disabled?: boolean;
	onClick?: () => void;
	autoFocus?: boolean;
	// target - link
	target?: string;
	href?: string;
	// visual
	selected?: boolean;
	highlight?: boolean;
	isFullWidth?: boolean;
	// visual with default
	style: ButtonStyle;
	size: ButtonSize;
}

const validateProps = (props: Props) => {
	if (props.onClick === undefined && props.href === undefined)
		throw Error("onClick and href are undefined");
};

export const Button = (props: Props) => {
	validateProps(props);
	const children = (
		<>
			{props.icon && (
				<span className={s.icon}>
					<Icon size={props.size.iconSize} path={props.icon} />
				</span>
			)}
			{props.icon && props.children && (
				<DivPx size={props.size.iconMargin} />
			)}
			{props.children && <span className={s.text}>{props.children}</span>}
		</>
	);
	return props.href ? (
		<a
			className={getClass(props)}
			href={props.href}
			target={props.target}
			rel="noopener noreferrer"
			children={children}
		/>
	) : (
		<button
			className={getClass(props)}
			onClick={props.onClick}
			disabled={props.disabled}
			autoFocus={props.autoFocus}
			children={children}
		/>
	);
};

Button.style = {
	outset: {
		main: `${s.outset} ${outset.main} ${outline.normal}`,
		selected: outset.selected,
		highlight: outset.highlight,
		disabled: outset.disabled,
	} as ButtonStyle,
	flat: {
		main: `${flat.main} ${outline.normal}`,
		selected: flat.selected,
		highlight: "",
		disabled: "",
	} as ButtonStyle,
};

Button.size = {
	medium: {
		main: s.medium,
		iconSize: 16,
		iconMargin: 8,
	} as ButtonSize,
	small: {
		main: s.small,
		iconSize: 12,
		iconMargin: 4,
	} as ButtonSize,
};

Button.defaultProps = {
	style: Button.style.outset,
	size: Button.size.medium,
};
