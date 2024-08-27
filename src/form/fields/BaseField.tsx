import { type FormEvent, memo, useId } from "react";
import { css } from "@emotion/react";
import { FieldLabel } from "./FieldLabel";
import type { BaseFieldProps } from "../create-form";

type BaseChildrenProps = {
	id: string;
	isvalid: boolean;
	onInvalid: (event: FormEvent) => void;
};

type Props<FormValues extends Record<string, unknown>> = Pick<
	BaseFieldProps<FormValues>,
	"label" | "errorMessage"
> & {
	children: (props: BaseChildrenProps) => JSX.Element | JSX.Element[];
};

const BaseField = memo(
	<FormValue extends Record<string, unknown>>({
		label,
		// If there is an error message, it should be re-rendered, so receive errorMessage in Props
		errorMessage,
		children,
	}: Props<FormValue>) => {
		const id = useId();

		// prevent the default behavior of the form when the field is invalid
		const handleInvalid = (e: FormEvent) => e.preventDefault();

		return (
			<div css={styles.container}>
				<div css={styles.labelContainer}>
					<FieldLabel fieldId={id} label={label} />
					{errorMessage && (
						<span id={`${id}_error`} css={styles.error}>
							{errorMessage}
						</span>
					)}
				</div>
				{children({
					id,
					isvalid: errorMessage == null,
					onInvalid: handleInvalid,
				})}
			</div>
		);
	},
);

const styles = {
	container: css`
		display: grid;
		grid-template-rows: min-content 1fr;
		gap: 4px;

		&:has(input:not(:required)) {
			label::after {
				content: "optional";
				font-weight: normal;
				color: #aaa;
			}
		}
	`,
	labelContainer: css`
		display: flex;
		align-items: center;
		gap: 4px;
	`,
	error: css`
		font-size: 0.8rem;
		color: red;
	`,
};

export { BaseField, type BaseChildrenProps };
