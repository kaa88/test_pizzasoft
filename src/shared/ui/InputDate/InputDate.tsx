import { forwardRef, memo } from "react";
import { InputMask } from "@react-input/mask";
import { InputText, InputTextProps } from "../InputText/InputText";

export interface InputDateProps extends InputTextProps {}

export const InputDate = memo(
  forwardRef<HTMLInputElement, InputDateProps>((props, ref): JSX.Element => {
    return (
      <InputMask
        component={InputText}
        mask="__.__.____"
        replacement={{ _: /\d/ }}
        ref={ref}
        {...props}
      />
    );
  })
);
