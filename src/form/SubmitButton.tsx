import type { FC } from "react";

type Props = {
	label: string;
} & Omit<JSX.IntrinsicElements["button"], "type">;

const SubmitButton: FC<Props> = ({ id, label, ...props }) => {
	return (
		<button form={id} type="submit" {...props}>
			{label}
		</button>
	);
};

export { SubmitButton };
