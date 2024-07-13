import { ComponentPropsWithoutRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../EmployeeCard/EmployeeCard.module.scss";

import { useAppDispatch } from "../../../../../store";
import { PAGES } from "../../../../../router";

import { Button } from "../../../../../shared";

import { RoleNames, Employee } from "../../../model";
import { deleteEmployee } from "../../../store";

interface EmployeeInfoProps extends ComponentPropsWithoutRef<"div"> {
  employee: Employee;
  onEditStart: () => void;
}

export const EmployeeInfo = ({
  employee,
  onEditStart,
  className,
  ...props
}: EmployeeInfoProps): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (employee?.id) {
      dispatch(deleteEmployee(employee.id));
      navigate(PAGES.LIST);
    }
  };

  return (
    <div className={styles.info} {...props}>
      <div className={styles.block}>
        <p className={styles.blockTitle}>Имя</p>
        <p>{employee.name}</p>
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>Должность</p>
        <p>{employee?.role ? RoleNames[employee.role] : ""}</p>
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>Телефон</p>
        <p>{employee.phone}</p>
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>Дата рождения</p>
        <p>{employee.birthday}</p>
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>В архиве</p>
        <p>{employee.isArchive ? "да" : "нет"}</p>
      </div>

      <div className={styles.cardButtons}>
        <Button className={styles.button} onClick={onEditStart} type="button">
          Редактировать
        </Button>
        <Button
          className={styles.button}
          variant="error"
          onClick={handleDelete}
          type="button"
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};
