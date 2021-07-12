import { useState } from "react";
import { Button } from "../../button/button";
import { DivPx } from "../../div/div";
import { Input } from "../../input/input";
import { TextArea } from "../../text-area/text-area";
import { DialogMain, DialogProps } from "../main/main";
import { DialogBody, DialogFooter } from "../sub/sub";
import { renderDialog } from "./native";

interface Props {
	children: React.ReactNode;
	onOk: (text: string) => void;
	onCancel: () => void;
	// Options
	initialText?: string;
	rows?: number;
	width?: DialogProps["width"];
}

export const PromptDialog = (props: Props): JSX.Element => {
	const [text, setText] = useState<string>(props.initialText ?? "");
	const base = {
		value: text,
		setValue: setText,
		autoFocus: true,
		autoselect: "true",
	};
	const rows = props.rows ?? 1;
	return (
		<DialogMain onEsc={props.onCancel} width={props.width}>
			<form onSubmit={() => props.onOk(text)}>
				<DialogBody>
					{props.children}
					<DivPx size={16} />
					{rows !== 1 ? (
						<TextArea {...base} rows={rows} />
					) : (
						<Input {...base} />
					)}
				</DialogBody>
				<DialogFooter>
					<Button minWidth onClick={props.onCancel}>
						Cancel
					</Button>
					<Button minWidth type="submit" highlight>
						OK
					</Button>
				</DialogFooter>
			</form>
		</DialogMain>
	);
};

/**
 * Moai's alternative to window.prompt
 * See https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt
 */
export const dialogPrompt = (
	message: React.ReactNode,
	initialText?: string,
	options?: {
		width?: Props["width"];
		rows?: Props["rows"];
	}
): Promise<string | null> => {
	return new Promise((resolve) => {
		renderDialog((unmount) => (
			<PromptDialog
				onCancel={() => {
					resolve(null);
					unmount();
				}}
				onOk={(text) => {
					resolve(text);
					unmount();
				}}
				children={message}
				width={options?.width}
				rows={options?.rows}
				initialText={initialText}
			/>
		));
	});
};
