import { ComponentPropsWithoutRef } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import cn from "classnames";

import styles from "./EmployeePage.module.scss";

import { PAGES } from "../../router";

import { Button, Container } from "../../shared";
import { EmployeeCard } from "../../features/employee";

interface EmployeePageProps extends ComponentPropsWithoutRef<"div"> {
  isNew?: boolean;
}

export const EmployeePage = ({
  isNew,
  className,
  ...props
}: EmployeePageProps): JSX.Element => {
  const { id } = useParams();
  const employees = useAppSelector((state) => state.employee.list);
  const current = !!id && employees.find((item) => item.id === Number(id));

  return (
    <div className={cn([className, styles._])} {...props}>
      <Container>
        {isNew ? (
          <EmployeeCard employee={null} />
        ) : current ? (
          <EmployeeCard employee={current} />
        ) : (
          <p className={styles.message}>Сотрудник не найден</p>
        )}

        <div className={styles.navButtons}>
          <Button href={PAGES.LIST}>Вернуться на Главную</Button>
        </div>
      </Container>
    </div>
  );
};
