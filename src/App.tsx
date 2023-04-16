import { Route, Routes } from "react-router-dom";
import RootLayout from "./pages/Layout/Root";
import LoginPage from "./pages/Login";
import AuthLayout from "./pages/Layout/Auth";
import DashboardPage from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LoginPage />} />

        <Route element={<AuthLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
