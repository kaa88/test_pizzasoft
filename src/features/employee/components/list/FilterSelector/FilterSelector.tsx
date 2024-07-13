import { ChangeEvent, ComponentPropsWithoutRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import cn from "classnames";
import styles from "./FilterSelector.module.scss";
import { Role, RoleNames } from "../../../model";
import { setFilter } from "../../../store";
import { Dropdown } from "../../../../../shared";

interface SortSelectorProps extends ComponentPropsWithoutRef<"div"> {}

export const FilterSelector = ({
  className,
  ...props
}: SortSelectorProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.employee.filter);

  const handleFilterRoleChange = (value: string) => {
    const role = value as Role;
    dispatch(setFilter({ ...filter, role }));
  };
  const handleFilterArchiveChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ ...filter, isArchive: e.currentTarget.checked }));
  };

  const dropItems = Object.entries(RoleNames).map(([key, value]) => ({
    value: key,
    text: value,
  }));

  return (
    <div className={cn([className, styles._])} {...props}>
      <p className={styles.title}>Фильтр</p>

      <Dropdown
        className={styles.dropdown}
        selected={filter.role || ""}
        items={dropItems}
        onChange={handleFilterRoleChange}
      />

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={filter.isArchive || false}
          onChange={handleFilterArchiveChange}
        />
        <span>в архиве</span>
      </label>
    </div>
  );
};
