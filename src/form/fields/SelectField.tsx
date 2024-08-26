import { type FC } from "react";
import Select from "react-select";

type Option = { value: string; label: string };

type SelectOptions = {
	options: Option[];
};

type Props = {
	value: string;
	onChange: (value: string | undefined) => void;
	onBlur: () => void;
	disabled?: boolean;
} & SelectOptions;

const SelectField: FC<Props> = ({
	value,
	options,
	onChange,
	disabled,
	...props
}) => {
	return (
		<Select
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
