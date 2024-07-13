import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import { useAppDispatch } from "../../../../../store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import styles from "../EmployeeCard/EmployeeCard.module.scss";

import {
  InputText,
  Dropdown,
  InputPhone,
  InputDate,
  Button,
} from "../../../../../shared";

import { RoleNames, Role, Employee } from "../../../model";
import { updateEmployee, addEmployee } from "../../../store";
import { validation } from "./validation";

export type Inputs = {
  name: string;
  role: string;
  phone: string;
  birthday: string;
  archive: boolean;
};

interface EmployeeFormProps extends ComponentPropsWithoutRef<"form"> {
  employee: Employee | null;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const EmployeeForm = ({
  employee,
  onSubmit: submitCallback,
  onCancel,
  className,
  ...props
}: EmployeeFormProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: employee?.name || "",
      role: employee?.role || "",
      phone: employee?.phone || "",
      birthday: employee?.birthday || "",
      archive: employee?.isArchive || false,
    },
    reValidateMode: "onSubmit",
  });

  const dropItems = Object.entries(RoleNames).map(([key, value]) => ({
    value: key,
    text: value,
  }));

  const handleDropChange = (value: string) => {
    setValue("role", value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data);

    const newEmployee: Omit<Employee, "id"> = {
      name: data.name,
      role: data.role as Role,
      phone: data.phone,
      birthday: data.birthday,
      isArchive: data.archive || false,
    };

    if (employee) {
      dispatch(
        updateEmployee({
          ...newEmployee,
          id: employee.id,
        })
      );
    } else dispatch(addEmployee(newEmployee));

    if (submitCallback) submitCallback();
  };

  return (
    <form
      className={cn([className, styles._])}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className={styles.block}>
        <p className={styles.blockTitle}>Имя</p>
        <InputText
          {...register("name", validation.name)}
          state={!!errors.name ? "error" : undefined}
          data-testid="name"
        />
        {!!errors.name?.message && (
          <p className={styles.blockError} role="alert">
            {errors.name?.message}
          </p>
        )}
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>Должность</p>
        <Controller
          name="role"
          control={control}
          rules={validation.role}
          render={({ field }) => {
            const { value, ref, ...rest } = field;
            return (
              <Dropdown
                className={styles.drop}
                items={dropItems}
                selected={value}
                {...rest}
                onChange={handleDropChange}
                state={!!errors.role ? "error" : undefined}
                data-testid="role"
              />
            );
          }}
        />
        {!!errors.role?.message && (
          <p className={styles.blockError} role="alert">
            {errors.role?.message}
          </p>
        )}
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>Телефон</p>
        <InputPhone
          {...register("phone", validation.phone)}
          state={!!errors.phone ? "error" : undefined}
          data-testid="phone"
        />
        {!!errors.phone?.message && (
          <p className={styles.blockError} role="alert">
            {errors.phone?.message}
          </p>
        )}
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>Дата рождения</p>
        <InputDate
          {...register("birthday", validation.birthday)}
          state={!!errors.birthday ? "error" : undefined}
          data-testid="birthday"
        />
        {!!errors.birthday?.message && (
          <p className={styles.blockError} role="alert">
            {errors.birthday?.message}
          </p>
        )}
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>В архиве</p>
        <Controller
          name="archive"
          control={control}
          render={({ field }) => {
            const { value, ...rest } = field;
            return (
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={value}
                {...rest}
                data-testid="archive"
              />
            );
          }}
        />
      </div>

      <div className={styles.cardButtons}>
        <Button
          className={styles.button}
          variant="success"
          type="submit"
          data-testid="submit-btn"
        >
          Сохранить
        </Button>
        <Button className={styles.button} onClick={onCancel} type="button">
          Отмена
        </Button>
      </div>
    </form>
  );
};
