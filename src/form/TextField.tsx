import { forwardRef } from "react";
import { css } from "@emotion/react";

type Props = {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
} & Omit<JSX.IntrinsicElements["input"], "type" | "children">;

const TextField = forwardRef<HTMLInputElement, Props>(
	({ onChange, onBlur, ...props }, ref) => {
		return (
			<input
				type="text"
				ref={ref}
				onChange={undefined}
				onBlur={(e) => {
					onChange(e);
					onBlur(e);
				}}
				{...props}
				css={style}
			/>
		);
	},
);

const style = css`
	flex-grow: 1;
  &:invalid {
    border: 1px solid red;
		background-color: #ffcccc;
  }
`;

export { TextField };
