import { RegisterOptions } from "react-hook-form";
import { RoleNames } from "../../../model";
import { getTimestamp } from "../../../utils";
import { Inputs } from "./EmployeeForm";

export const validation: { [key in keyof Inputs]: any } = {
  name: {
    required: "Обязательное поле",
    pattern: {
      value: /[А-Я][а-я]+\s[А-Я][а-я]+/,
      message:
        "Поле должно содержать Имя и Фамилию с заглавной буквы через пробел",
    },
  } as RegisterOptions<Inputs, "name">,
  role: {
    required: "Обязательное поле",
    validate: (v) =>
      Object.keys(RoleNames).includes(v) || "Некорректное значение",
  } as RegisterOptions<Inputs, "role">,
  phone: {
    required: "Обязательное поле",
    pattern: {
      value: /^\+7 \(\d{3}\) \d{3}-\d{4}$/,
      message: "Введите телефон в формате +7 (123) 456-7890",
    },
  } as RegisterOptions<Inputs, "phone">,
  birthday: {
    required: "Обязательное поле",
    validate: (v) => {
      const timestamp = getTimestamp(v);
      const minDate = new Date("1900-01-01").getTime();
      if (!(v.length === 10 && !isNaN(timestamp)))
        return "Некорректная дата. Введите дату в формате ДД.ММ.ГГГГ";
      if (timestamp < minDate) return "Столько не живут";
      if (timestamp > Date.now()) return "Дата должна быть меньше текущей даты";
      return true;
    },
  } as RegisterOptions<Inputs, "birthday">,
  archive: undefined,
};
