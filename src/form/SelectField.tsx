import { forwardRef } from "react";
import Select from "react-select";

type Option = { value: string; label: string };

type Props = {
	options: Option[];
} & Omit<JSX.IntrinsicElements["input"], "type" | "children">;

const SelectField = forwardRef<HTMLInputElement, Props>(
	({ value, options, onChange, ...props }, ref) => {
		return (
			<Select
				ref={ref}
				defaultValue={options.find((option) => option.value === value)}
				options={options}
				onChange={(option) => onChange(option.value)}
				{...props}
			/>
		);
	},
);

export { SelectField };
export type { Option };
