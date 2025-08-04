import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/app/pages/home/_index";
import ExperiencePage from "@/app/pages/experience/_index";
import HobbiesPage from "./app/pages/hobbies/_index";
import ContactPage from "./app/pages/contact/_index";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/experience",
        element: <ExperiencePage />,
      },
      {
        path: "/hobbies",
        element: <HobbiesPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
]);
