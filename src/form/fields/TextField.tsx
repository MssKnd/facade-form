import { forwardRef, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import type { ChangeHandler } from "react-hook-form";

type Props = {
	onChange: ChangeHandler;
	onBlur: ChangeHandler;
	defaultValue?: string;
	isvalid?: boolean;
} & Omit<JSX.IntrinsicElements["input"], "type" | "children">;

const TextField = forwardRef<HTMLInputElement, Props>(
	({ isvalid, onChange, onBlur, ...props }, ref) => {
		return (
			<input
				key={props.id}
				type="text"
				ref={ref}
				onChange={undefined}
				onBlur={(e) => {
					onChange(e);
					onBlur(e);
				}}
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

  &[aria-invalid="true"] {
    border: 1px solid red;
		background-color: #ffcccc;
  }
`;

export { TextField };
