import { forwardRef } from "react";
import { css } from "@emotion/react";

type TProps = Omit<JSX.IntrinsicElements["input"], "type">;

const TextField = forwardRef<HTMLInputElement, TProps>((props, ref) => {
	return (
		<input
			type="text"
			ref={ref}
			{...props}
			onInvalid={(e) => {
				e.preventDefault();
			}}
			css={style}
		/>
	);
});

const style = css`
  &:invalid {
    border: 1px solid red;
		background-color: #ffcccc;
  }
`;

export { TextField };
