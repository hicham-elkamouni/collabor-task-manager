import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PrincipalPage from "@pages/principal-page";
import DetailsPage from "@pages/details-page";
import NotFound from "@pages/not-found";

const routes = [
  { path: "/tasks", element: <PrincipalPage /> },
  { path: "/tasks/new", element: <DetailsPage /> },
  { path: "/tasks/:id", element: <DetailsPage /> },
];

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
