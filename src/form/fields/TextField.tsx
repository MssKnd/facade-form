import { forwardRef } from "react";
import { css } from "@emotion/react";

type Props = {
	isvalid?: boolean;
} & Omit<JSX.IntrinsicElements["input"], "type" | "children">;

const TextField = forwardRef<HTMLInputElement, Props>(
	({ isvalid, ...props }, ref) => {
		return (
			<input
				type="text"
				ref={ref}
				{...props}
				aria-invalid={isvalid ? undefined : true}
				aria-errormessage={isvalid ? undefined : `${props.id}_error`}
				css={style}
			/>
		);
	},
);

const style = css`
	flex-grow: 1;

	height: 32px;
	font-size: 1rem;
	padding: 0 8px;
	border: 1px solid hsl(0, 0%, 80%);
	border-radius: 4px;

  &[aria-invalid="true"] {
    border: 1px solid red;
		background-color: #ffcccc;
  }
`;

export { TextField };
