import { type FormEvent, useId } from "react";
import { css } from "@emotion/react";
import {
	useFormContext,
	type Path,
	type UseFormRegisterReturn,
} from "react-hook-form";
import { Label } from "./Label";

type ChildrenProps<FormValues extends Record<string, unknown>> = {
	id: string;
	onInvalid: (event: FormEvent) => void;
} & UseFormRegisterReturn<Path<FormValues>>;

type Props<FormValues extends Record<string, unknown>> = {
	label: string;
	name: Path<FormValues>;
	children: (props: ChildrenProps<FormValues>) => JSX.Element;
};

const Field = <FormValue extends Record<string, unknown>>({
	label,
	name,
	children,
}: Props<FormValue>) => {
	const id = useId();
	const { register, getFieldState } = useFormContext<FormValue>();
	const test = getFieldState(name);

	// prevent the default behavior of the form when the field is invalid
	const handleInvalid = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<div css={styles.container}>
			<div>
				<Label fieldId={id} label={label} />
			</div>
			<div css={styles.fieldContainer}>
				{children({ id, onInvalid: handleInvalid, ...register(name) })}
			</div>
		</div>
	);
};

const styles = {
	container: css`
		display: grid;
		grid-template-rows: min-content 1fr;
		gap: 4px;
	`,
	fieldContainer: css`
		display: flex;
	`,
};

export { Field };
