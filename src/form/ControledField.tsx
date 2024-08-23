import { type FormEvent, useId } from "react";
import {
	useFormContext,
	Controller,
	type ControllerRenderProps,
	type Path,
} from "react-hook-form";
import { css } from "@emotion/react";
import { Label } from "./Label.tsx";

type ChildrenProps<FormValues extends Record<string, unknown>> = {
	id: string;
	onInvalid: (event: FormEvent) => void;
} & ControllerRenderProps<FormValues, Path<FormValues>>;

type Props<FormValues extends Record<string, unknown>> = {
	label: string;
	name: Path<FormValues>;
	children: (props: ChildrenProps<FormValues>) => JSX.Element;
};

const ControlledField = <FormValue extends Record<string, unknown>>({
	label,
	name,
	children,
}: Props<FormValue>) => {
	const id = useId();
	const { control } = useFormContext<FormValue>();

	// prevent the default behavior of the form when the field is invalid
	const handleInvalid = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<div css={styles.container}>
			<Label fieldId={id} label={label} />
			<div css={styles.fieldContainer}>
				<Controller
					control={control}
					name={name}
					render={({ field }) =>
						children({ id, onInvalid: handleInvalid, ...field })
					}
				/>
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

export { ControlledField };
