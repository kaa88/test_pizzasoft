export interface Employee {
  id: number;
  name: string;
  isArchive: boolean;
  role: Role;
  phone: string;
  birthday: string;
}

export const RoleNames = {
  driver: "Водитель",
  waiter: "Официант",
  cook: "Повар",
};
export type Role = keyof typeof RoleNames;
export type RoleNamesIndex = { [key in Role]: string };

export interface IState {
  list: Employee[];
  sort: {
    field: SortField;
    order: SortOrder;
  };
  filter: Partial<Omit<Employee, "id">>;
}

export type SortField = "name" | "birthday";
export type SortFieldNames = { [key in SortField]: string };

export type SortOrder = "asc" | "desc";
export type SortOrderdNames = { [key in SortOrder]: string };
