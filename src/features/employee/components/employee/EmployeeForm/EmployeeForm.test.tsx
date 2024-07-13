import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../../store";
import { EmployeeForm } from "./EmployeeForm";
import { Employee } from "../../../model";

const testEmployee: Employee = {
  id: 12,
  name: "Даниил Кузнецов",
  isArchive: true,
  role: "waiter",
  phone: "+7 (933) 582-2673",
  birthday: "25.05.1987",
};

const formEl = (
  <Provider store={store}>
    <EmployeeForm employee={testEmployee} />
  </Provider>
);

describe("Test Employee Form", () => {
  test("form has all fields", async () => {
    render(formEl);
    expect(screen.queryByTestId("name")).toBeInTheDocument();
    expect(screen.queryByTestId("role")).toBeInTheDocument();
    expect(screen.queryByTestId("birthday")).toBeInTheDocument();
    expect(screen.queryByTestId("phone")).toBeInTheDocument();
    expect(screen.queryByTestId("archive")).toBeInTheDocument();
  });

  test("form has submit button", async () => {
    render(formEl);
    expect(screen.queryByTestId("submit-btn")).toBeInTheDocument();
  });

  test("name has incorrect value alert", async () => {
    render(formEl);
    fireEvent.input(screen.getByTestId("name"), {
      target: {
        value: "Василий",
      },
    });
    expect(screen.getByTestId("name")).toHaveValue("Василий");
    fireEvent.submit(screen.getByTestId("submit-btn"));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });
});
