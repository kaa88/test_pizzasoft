import styles from "./Button.module.scss";
import { ComponentPropsWithoutRef, memo } from "react";
import cn from "classnames";

import { Link } from "react-router-dom";

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  ComponentPropsWithoutRef<"a"> & {
    active?: boolean;
    variant?: "success" | "error";
  };

export const Button = memo(
  ({
    href,
    className,
    children,
    disabled,
    variant,
    ...props
  }: ButtonProps): JSX.Element => {
    const btnProps = {
      className: cn(
        className,
        styles._,
        disabled && styles.disabled,
        !!variant && styles[variant]
      ),
      disabled,
      tabIndex: disabled ? -1 : undefined,
      ...props,
    };
    const btnInner = children;

    return href ? (
      <Link to={href} {...btnProps}>
        {btnInner}
      </Link>
    ) : (
      <button {...btnProps}>{btnInner}</button>
    );
  }
);
