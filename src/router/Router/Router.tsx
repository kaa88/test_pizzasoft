import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { PAGES, PAGE_NAMES } from "../const";
import { PageTitle } from "../PageTitle/PageTitle";

import { EmployeePage } from "../../pages/EmployeePage/EmployeePage";
import { ErrorPage } from "../../pages/ErrorPage/ErrorPage";
import { ListPage } from "../../pages/ListPage/ListPage";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: (
        <>
          <ErrorPage />
          <PageTitle title={PAGE_NAMES.ERROR} />
        </>
      ),
    },

    {
      element: <PageTitle />,
      children: [
        {
          path: PAGES.ROOT,
          loader: () => redirect(PAGES.LIST),
        },
        {
          path: PAGES.LIST,
          element: <ListPage />,
        },
        {
          path: PAGES.EMPLOYEE,
          element: <EmployeePage />,
        },
        {
          path: `${PAGES.EMPLOYEE}/:id`,
          element: <EmployeePage />,
        },
        {
          path: PAGES.NEW_EMPLOYEE,
          element: <EmployeePage isNew />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
