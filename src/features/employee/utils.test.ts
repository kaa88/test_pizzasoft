import { Employee } from "./model";
import { getTimestamp, sortByDate, sortByName } from "./utils";

const testEmpls: Employee[] = [
  {
    id: 7,
    name: "Александр Третьяков",
    isArchive: false,
    role: "driver",
    phone: "",
    birthday: "31.05.1979",
  },
  {
    id: 9,
    name: "Агафон Громов",
    isArchive: true,
    role: "driver",
    phone: "",
    birthday: "07.06.1988",
  },
  {
    id: 8,
    name: "Пелагея Морозова",
    isArchive: false,
    role: "driver",
    phone: "",
    birthday: "11.09.1981",
  },
];

describe("Test Employee utils", () => {
  test("test sortByName", () => {
    expect(sortByName(testEmpls, "desc")).toEqual([
      {
        id: 8,
        name: "Пелагея Морозова",
        isArchive: false,
        role: "driver",
        phone: "",
        birthday: "11.09.1981",
      },
      {
        id: 7,
        name: "Александр Третьяков",
        isArchive: false,
        role: "driver",
        phone: "",
        birthday: "31.05.1979",
      },
      {
        id: 9,
        name: "Агафон Громов",
        isArchive: true,
        role: "driver",
        phone: "",
        birthday: "07.06.1988",
      },
    ]);
  });

  test("test sortByName", () => {
    expect(sortByDate(testEmpls, "asc")).toEqual([
      {
        id: 7,
        name: "Александр Третьяков",
        isArchive: false,
        role: "driver",
        phone: "",
        birthday: "31.05.1979",
      },
      {
        id: 8,
        name: "Пелагея Морозова",
        isArchive: false,
        role: "driver",
        phone: "",
        birthday: "11.09.1981",
      },
      {
        id: 9,
        name: "Агафон Громов",
        isArchive: true,
        role: "driver",
        phone: "",
        birthday: "07.06.1988",
      },
    ]);
  });

  test("test getTimestamp", () => {
    const result = new Date("1982-03-24").getTime();
    expect(getTimestamp("24.03.1982")).toBe(result);
    expect(getTimestamp("1982-03-24")).toBe(result);
    expect(getTimestamp("10.01-2000")).toBe(NaN);
  });
});
