import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./List.module.scss";
import { PAGES } from "../../../../../router";
import { useAppSelector } from "../../../../../store";

import { RoleNames } from "../../../model";
import { sortByName, sortByDate } from "../../../utils";

interface ListProps extends ComponentPropsWithoutRef<"div"> {}

export const List = ({ className, ...props }: ListProps): JSX.Element => {
  const { list, sort, filter } = useAppSelector((state) => state.employee);

  const filteredList = list
    .filter((item) => item.role === filter.role || !filter.role)
    .filter((item) => item.isArchive == filter.isArchive); // eslint-disable-line

  const sortedList =
    sort.field === "name"
      ? sortByName(filteredList, sort.order)
      : sortByDate(filteredList, sort.order);

  return (
    <div className={cn([className, styles.list])} {...props}>
      {sortedList.map((item) => (
        <Link
          className={cn(styles.item, item.isArchive && styles.archive)}
          to={`${PAGES.EMPLOYEE}/${item.id}`}
          key={item.id}
        >
          <span>{item.name}</span>
          <span>{RoleNames[item.role]}</span>
          <span>{item.phone}</span>
          <span>{item.birthday}</span>
        </Link>
      ))}
    </div>
  );
};
