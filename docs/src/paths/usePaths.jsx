import { useRoutes } from "react-router-dom";
import LandingPage from "../pages/client/landing/LandingPage";
import { Layout, BackofficeLayout } from "../Layout";
import ActivitiesPage from "../pages/client/activities/ActivitiesPage";
import StaysPage from "../pages/client/stays/StaysPage";
import ContactPage from "../pages/client/contact/ContactPage";
import MyListPage from "../pages/client/myList/MyListPage";
import Authen from "../pages/backoffice/Authen";
import BackOfficePage from "../pages/backoffice/BackOfficePage";
import BActivitiesPage from "../pages/backoffice/activities/BActivitiesPage";
import BStaysPage from "../pages/backoffice/stays/BStaysPage";
import BContactPage from "../pages/backoffice/contact/BContactPage";
import StaysSinglePage from "../pages/client/stays/singlePage/StaysSinglePage";
import Page404 from "../Page404";
import AuthForm from "../components/auth/form/AuthForm";
import Info from "../components/info/Info";

/* Client paths (Exported for nav bar) */
const clientPaths = [
  { path: "", element: <LandingPage /> },
  { path: "aktiviteter", element: <ActivitiesPage /> },
  { path: "ophold", element: <StaysPage /> },
  { path: "kontakt", element: <ContactPage /> },
  { path: "minliste", element: <MyListPage /> },
];

/*  Backoffice paths (Exported for nav bar) */
const backOfficePaths = [
  { path: "", element: <BackOfficePage /> },
  { path: "aktiviteter", element: <BActivitiesPage /> },
  { path: "ophold", element: <BStaysPage /> },
  { path: "kontakt", element: <BContactPage /> },
];

export const usePaths = () => {
  const routes = useRoutes([
    {
      path: "/backoffice/*",
      element: (
        <Authen>
          <BackofficeLayout />
        </Authen>
      ),
      children: backOfficePaths,
    },
    {
      path: "/*",
      element: <Layout />,
      children: [
        ...clientPaths,
        /* Client paths that we want excluded from nav bar */
        { path: "ophold/:id", element: <StaysSinglePage /> },
        {
          path: "login",
          element: (
            <Info borderRadius="2.5rem 0 0 0">
              <AuthForm />
            </Info>
          ),
        },
      ],
    },
    { path: "*", element: <Page404 /> },
  ]);

  return { routes, clientPaths, backOfficePaths };
};
