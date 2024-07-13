import { ComponentPropsWithoutRef } from "react";
import { ScrollRestoration } from "react-router-dom";
import cn from "classnames";
import styles from "./ListPage.module.scss";

import { Button, Container } from "../../shared";
import { FilterSelector, List, SortSelector } from "../../features/employee";
import { PAGES } from "../../router";

interface ListPageProps extends ComponentPropsWithoutRef<"div"> {}

export const ListPage = ({
  className,
  ...props
}: ListPageProps): JSX.Element => {
  return (
    <div className={cn([className, styles._])} {...props}>
      <ScrollRestoration />

      <header className={styles.header}>
        <Container className={styles.container}>
          <SortSelector className={styles.headerBlock} />
          <FilterSelector className={styles.headerBlock} />
        </Container>
      </header>

      <main className={styles.main}>
        <Container>
          <Button className={styles.addBtn} href={PAGES.NEW_EMPLOYEE}>
            Добавить сотрудника
          </Button>
          <List />
        </Container>
      </main>
    </div>
  );
};
