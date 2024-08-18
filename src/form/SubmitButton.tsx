import type { FC } from "react";

type Props = {
	label: string;
} & Omit<JSX.IntrinsicElements["button"], "type">;

const SubmitButton: FC<Props> = ({ label, ...props }) => {
	return (
		<button type="submit" {...props}>
			{label}
		</button>
	);
};

export { SubmitButton };
