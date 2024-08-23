import { type FormEvent, useId } from "react";
import { css } from "@emotion/react";
import { FieldLabel } from "./FieldLabel";
import type { BaseFieldProps } from "../create-form";

type ChildrenProps = {
	id: string;
	onInvalid: (event: FormEvent) => void;
};

type Props<FormValues extends Record<string, unknown>> = Pick<
	BaseFieldProps<FormValues>,
	"label" | "errorMessage"
> & {
	children: (props: ChildrenProps) => JSX.Element;
};

const BaseField = <FormValue extends Record<string, unknown>>({
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
			<div css={styles.fieldContainer}>
				{children({
					id,
					onInvalid: handleInvalid,
				})}
			</div>
		</div>
	);
};

const styles = {
	container: css`
		display: grid;
		grid-template-rows: min-content 1fr;
		gap: 4px;

		&:has(input:not(:required)) {
			label::after {
				content: "optional";
				color: #ccc;
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
	fieldContainer: css`
		display: flex;
	`,
};

export { BaseField };
