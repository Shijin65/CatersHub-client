import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/dashboard";
import Login from "./pages/auth/login";
import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";
import HomePage from "./pages/homePage";
import ErrorSection from "./components/error/404";
import RegisterUser from "./components/auth/register-user";
import ProtectedRoute from "./layouts/protected-route";
import { useUserStore } from "./lib/store";
import Staff from "./pages/staff";
import Supervisor from "./pages/supervisor";
import WorkItemPage from "./pages/work-item";
import WorkItemCreateAndEditPage from "./pages/work-item/create-and-edit";
import ProfileEditPage from "./pages/profile-edit";
import WorkItemView from "./components/work-item/work-item-view";
import AssignedWorks from "./pages/assigned-works";
import StaffViewPage from "./pages/staff/view";
import StaffEditPage from "./pages/staff/edit";
import SupervisorViewPage from "./pages/supervisor/view";
import SupervisorEditPage from "./pages/supervisor/edit";
import UpcomingWorkPage from "./pages/upcoming-works";
import UserAssignedWorks from "./pages/user-assigned-workes";

function App() {
  const user = useUserStore((state) => state.user);
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<AuthLayout />}>
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<Login />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/dash-board" element={<DashBoard />} />

            <Route path="/staff">
              <Route index element={<Staff />} />
              <Route path=":id/view" element={<StaffViewPage />} />
              <Route path=":id/edit" element={<StaffEditPage />} />
            </Route>

            <Route path="/supervisors">
              <Route index element={<Supervisor />} />
              <Route path=":id/view" element={<SupervisorViewPage />} />
              <Route path=":id/edit" element={<SupervisorEditPage />} />
            </Route>
            
            <Route path="/user-assigned-works" element={<UserAssignedWorks />} />
            <Route path="/assigned-works" element={<AssignedWorks />} />
            <Route path="/upcoming-works" element={<UpcomingWorkPage />} />

            <Route path="/work-item">
              <Route index element={<WorkItemPage />} />
              <Route path="create" element={<WorkItemCreateAndEditPage />} />
              <Route path=":id/view" element={<WorkItemView />} />
              <Route
                path=":id/edit"
                element={<WorkItemCreateAndEditPage isEdit={true} />}
              />
            </Route>

            <Route path="/profile-edit" element={<ProfileEditPage />} />
          </Route>

          <Route path="/error" element={<ErrorSection />} />
          <Route path="*" element={<ErrorSection />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
