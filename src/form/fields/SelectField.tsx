import { type FC } from "react";
import Select from "react-select";

type Option = { value: string; label: string };

type SelectOptions = {
	options: Option[];
};

type Props = {
	id: string;
	value: string;
	onChange: (value: string | undefined) => void;
	onBlur: () => void;
	disabled?: boolean;
} & SelectOptions;

const SelectField: FC<Props> = ({
	id,
	value,
	options,
	onChange,
	disabled,
	...props
}) => {
	return (
		<Select
			inputId={id}
			defaultValue={options.find((option) => option.value === value)}
			options={options}
			onChange={(option) => onChange(option?.value || "")}
			isDisabled={disabled}
			{...props}
			styles={{
				container: (provided) => ({
					...provided,
					flexGrow: 1,
				}),
			}}
		/>
	);
};

export { SelectField };
export type { Option, SelectOptions };
