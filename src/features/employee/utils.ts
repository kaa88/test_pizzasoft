import { Employee, SortOrder } from "./model";

export const sortByName = (list: Employee[], order: SortOrder): Employee[] => {
  const newList = [...list];
  return newList.sort((a, b) =>
    order === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );
};
export const sortByDate = (list: Employee[], order: SortOrder): Employee[] => {
  const newList = [...list];
  return newList.sort((a, b) =>
    order === "asc"
      ? getTimestamp(a.birthday) - getTimestamp(b.birthday)
      : getTimestamp(b.birthday) - getTimestamp(a.birthday)
  );
};

export const getTimestamp = (date: string): number => {
  const properDateStr = date.split(".").reverse().join("-");
  return new Date(properDateStr).getTime();
};
