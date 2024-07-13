import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import styles from "./Container.module.scss";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {}

export const Container = ({
  className,
  children,
  ...props
}: ContainerProps): JSX.Element => {
  return (
    <div className={cn([className, styles._])} {...props}>
      {children}
    </div>
  );
};
