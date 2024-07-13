import { ChangeEvent, ComponentPropsWithoutRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import cn from "classnames";
import styles from "./SortSelector.module.scss";
import { setSort } from "../../../store";
import {
  SortField,
  SortFieldNames,
  SortOrder,
  SortOrderdNames,
} from "../../../model";

const sortFieldNames: SortFieldNames = {
  name: "Имя",
  birthday: "Дата рождения",
};
const sortOrderNames: SortOrderdNames = {
  asc: "А-Я",
  desc: "Я-А",
};

interface SortSelectorProps extends ComponentPropsWithoutRef<"div"> {}

export const SortSelector = ({
  className,
  ...props
}: SortSelectorProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.employee.sort);

  const handleSortFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.currentTarget.dataset.field as SortField | undefined;
    if (field) dispatch(setSort({ ...sort, field }));
  };
  const handleSortOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const order = e.currentTarget.dataset.order as SortOrder | undefined;
    if (order) dispatch(setSort({ ...sort, order }));
  };

  return (
    <div className={cn([className, styles._])} {...props}>
      <p className={styles.title}>Сортировка</p>

      {Object.entries(sortFieldNames).map(([key, value]) => (
        <label key={key}>
          <input
            type="radio"
            name="sortField"
            data-field={key}
            onChange={handleSortFieldChange}
            checked={sort.field === key}
          />
          <span>{value}</span>
        </label>
      ))}

      {Object.entries(sortOrderNames).map(([key, value]) => (
        <label key={key}>
          <input
            type="radio"
            name="sortOrder"
            data-order={key}
            onChange={handleSortOrderChange}
            checked={sort.order === key}
          />
          <span>{value}</span>
        </label>
      ))}
    </div>
  );
};
