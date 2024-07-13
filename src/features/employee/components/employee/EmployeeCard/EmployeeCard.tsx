import { ComponentPropsWithoutRef, useState } from "react";
import cn from "classnames";

import styles from "./EmployeeCard.module.scss";

import { Employee } from "../../../model";
import { EmployeeInfo } from "../EmployeeInfo/EmployeeInfo";
import { EmployeeForm } from "../EmployeeForm/EmployeeForm";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../../../../router";

interface EmployeeCardProps extends ComponentPropsWithoutRef<"div"> {
  employee: Employee | null;
}

export const EmployeeCard = ({
  employee,
  className,
  ...props
}: EmployeeCardProps): JSX.Element => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  const save = () => setIsEdit(false);
  const saveAndReturn = () => {
    save();
    navigate(PAGES.LIST);
  };

  return (
    <div className={cn([className, styles._])} {...props}>
      <div className={styles.card}>
        {employee ? (
          <h1>
            Сотрудник <span>#{employee.id}</span>
          </h1>
        ) : (
          <h1>Новый сотрудник</h1>
        )}

        {isEdit || !employee ? (
          <EmployeeForm
            employee={employee}
            onSubmit={employee ? save : saveAndReturn}
            onCancel={employee ? save : saveAndReturn}
          />
        ) : (
          <EmployeeInfo
            employee={employee}
            onEditStart={() => setIsEdit(true)}
          />
        )}
      </div>
    </div>
  );
};
