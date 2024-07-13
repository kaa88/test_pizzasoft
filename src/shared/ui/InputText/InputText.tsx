import styles from "./InputText.module.scss";
import { ComponentPropsWithRef, forwardRef, memo } from "react";
import cn from "classnames";

export interface InputTextProps extends ComponentPropsWithRef<"input"> {
  type?: "text" | "email" | "password" | "number";
  state?: "success" | "error";
}

export const InputText = memo(
  forwardRef<HTMLInputElement, InputTextProps>(
    ({ type = "text", state, className, ...props }, ref): JSX.Element => {
      return (
        <input
          className={cn(className, styles.input, !!state && styles[state])}
          type={type}
          ref={ref}
          {...props}
        />
      );
    }
  )
);
