import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/login/AdminLogin";
import EmployeeLogin from "./pages/login/EmployeeLogin";
import Home from "./pages/home/Home";
import { DataContext, DataProvider } from "./context/FormDataContext";
import CreateEmployees from "./pages/employees/CreateEmployees";
import EditEmployee from "./pages/employees/EditEmployee";
import EmployeeList from "./pages/employees/ViewEmployees";
import Dashboard from "./pages/home/Dashboard";
import SideBar from "./components/SideBar";
import Settings from "./pages/Profile/Settings";
import CreateDepartment from "./pages/departments/CreateDepartment";
import { LoginContext, LoginProvider, useAuth } from "./context/LoginContext";
import Protected from "./pages/home/Protected";
import ViewDepartment from "./pages/departments/ViewDepartment";
import EditDepartment from "./pages/departments/EditDepartment";
import AdminLogout from "./pages/login/logout/AdminLogout";
import EmployeeLogout from "./pages/login/logout/EmployeeLogout";

function App() {
  const { auth, setAuth, userRole, setUserRole } = useAuth();
  console.log("APp component says", auth);
  console.log("APp component says", userRole);

  return (
    <>
      <main>
        <DataProvider>
          <Routes>
            {/* Always render these routes */}
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/employee" element={<EmployeeLogin />} />

            {/* Protected route */}
            <Route element={<Protected />}>
              <Route
                path="/dashboard"
                element={
                  <Home>
                    <Dashboard />
                  </Home>
                }
              />
              <Route
                path="view-all-employees"
                element={
                  <Home>
                    <EmployeeList />
                  </Home>
                }
              />
              <Route
                path="create-employee"
                element={
                  <Home>
                    <CreateEmployees />
                  </Home>
                }
              />
              <Route
                path="employees/:id/edit"
                element={
                  <Home>
                    <EditEmployee />
                  </Home>
                }
              />
              <Route
                path="view-all-departments"
                element={
                  <Home>
                    <ViewDepartment />
                  </Home>
                }
              />
              <Route
                path="create-department"
                element={
                  <Home>
                    <CreateDepartment />
                  </Home>
                }
              />
              <Route
                path="departments/:id/edit"
                element={
                  <Home>
                    <EditDepartment />
                  </Home>
                }
              />
              <Route
                path="settings"
                element={
                  <Home>
                    <Settings />
                  </Home>
                }
              />
              <Route
                path="logout"
                element={
                  <Home>
                    {userRole == "admin" ? <AdminLogout /> : <EmployeeLogout />}
                  </Home>
                }
              />
            </Route>

            {/* Redirect to dashboard if authenticated */}
            <Route
              path="/"
              element={
                auth ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login/admin" />
                )
              }
            />
          </Routes>
        </DataProvider>
      </main>
    </>
  );
}

export default App;

// <AdminLogin />
// {/* <CreateDepartment /> */}
// {/* <Home> */}
// <Routes>
//   <Route path="/login/employee" element={<EmployeeLogin />} />
//   <Route element={<Protected />}>
//     <Route path="/" element={<AdminLogin />} />
//     {/* <Route path="/login/employee" element={<EmployeeLogin />} /> */}
//     <Route path="/dashboard" element={<Dashboard />} />
//     <Route path="/view-all-employees" element={<EmployeeList />} />
//     <Route path="/create-employee" element={<CreateEmployees />} />
//     <Route path="/employees/:id/edit" element={<EditEmployee />} />
//     <Route path="/settings" element={<Settings />} />
//   </Route>
//   <Route path="/" element={<Dashboard />} />
// </Routes>
// {/* </Home> */}

// <Routes>
// {/* Always render these routes */}
// <Route path="/login/admin" element={<AdminLogin />} />
// <Route path="/login/employee" element={<EmployeeLogin />} />

// {/* Protected route */}
// <Routes>
//   <Route element={<Protected />}>
//     <Route
//       path="/dashboard"
//       element={
//         auth ? (
//           <Home>
//             <Route path="/" element={<Dashboard />} />
//             <Route
//               path="/view-all-employees"
//               element={<EmployeeList />}
//             />
//             <Route
//               path="/create-employee"
//               element={<CreateEmployees />}
//             />
//             <Route
//               path="/employees/:id/edit"
//               element={<EditEmployee />}
//             />
//             <Route path="/settings" element={<Settings />} />
//           </Home>
//         ) : (
//           // Redirect to login if not authenticated
//           <Navigate to="/login/admin" />
//         )
//       }
//     />
//   </Route>
// </Routes>
// {/* Redirect to dashboard if authenticated */}
// <Route
//   path="/"
//   element={
//     auth ? (
//       <Navigate to="/dashboard" />
//     ) : (
//       <Navigate to="/login/admin" />
//     )
//   }
// />
// </Routes>
