import { forwardRef, memo } from "react";
import { InputMask } from "@react-input/mask";
import { InputText, InputTextProps } from "../InputText/InputText";

export interface InputPhoneProps extends InputTextProps {}

export const InputPhone = memo(
  forwardRef<HTMLInputElement, InputPhoneProps>((props, ref): JSX.Element => {
    return (
      <InputMask
        component={InputText}
        mask="+7 (___) ___-____"
        replacement={{ _: /\d/ }}
        ref={ref}
        {...props}
      />
    );
  })
);
