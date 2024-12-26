import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ContentLayout from "@components/content/content-layout";
import Dashboard from "@pages/dashbaord";
import Automations from "@pages/dashbaord/automations";
import Facilities from "@pages/dashbaord/facilities";
import Integrations from "@pages/dashbaord/integrations";
import Locks from "@pages/dashbaord/locks";
import Reports from "@pages/dashbaord/reports";
import Settings from "@pages/dashbaord/settings";
import Team from "@pages/dashbaord/team";
import DashboardLayout from "@pages/dashboard-layout";
import CustomRole from "@pages/dashbaord/custom-role";
import NotFound from "@pages/not-found";

const dashboardRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "automations", element: <Automations /> },
  { path: "locks", element: <Locks /> },
  { path: "settings", element: <Settings /> },
  { path: "integrations", element: <Integrations /> },
  { path: "reports", element: <Reports /> },
  { path: "facilities", element: <Facilities /> },
  { path: "team", element: <Team /> },
  { path: "team/create-custom-role", element: <CustomRole /> },
  { path: "team/edit-custom-role/:id", element: <CustomRole /> },
];

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route element={<ContentLayout />}>
            {dashboardRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
