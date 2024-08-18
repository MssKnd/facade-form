import { useFormContext, Controller } from "react-hook-form";
import type { ControllerRenderProps } from "react-hook-form";
import { FormEvent, useId } from "react";
import type { Path } from "react-hook-form";

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
	const handleInvalid = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<div>
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

export { ControlledField };
