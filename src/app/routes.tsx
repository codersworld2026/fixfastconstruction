import { createBrowserRouter } from "react-router";
import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";
import ServicesPage from "./components/ServicesPage";
import ServiceDetailPage from "./components/ServiceDetailPage";
import ProjectsPage from "./components/ProjectsPage";
import { servicePages } from "./data/site";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
  {
    path: "/services",
    Component: ServicesPage,
  },
  {
    path: "/projects",
    Component: ProjectsPage,
  },
  // Individual service pages, generated from shared data so each gets its own
  // route, title, description and canonical URL.
  ...servicePages.map((service) => ({
    path: `/${service.slug}`,
    element: <ServiceDetailPage slug={service.slug} />,
  })),
]);
