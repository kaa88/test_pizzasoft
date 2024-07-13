import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import styles from "./ErrorPage.module.scss";

import { PAGES } from "../../router";
import { Button, Container } from "../../shared";

interface ErrorPageProps extends ComponentPropsWithoutRef<"div"> {}

export const ErrorPage = ({
  className,
  ...props
}: ErrorPageProps): JSX.Element => {
  return (
    <div className={cn([className, styles._])} {...props}>
      <Container className={styles.container}>
        <h1>404</h1>
        <Button href={PAGES.LIST}>Вернуться на Главную</Button>
      </Container>
    </div>
  );
};
