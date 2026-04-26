import { createBrowserRouter } from "react-router";
import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
]);
