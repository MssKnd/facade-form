import { forwardRef } from "react";

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
		/>
	);
});

export { TextField };
