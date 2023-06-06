import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import HeaderMobile from "./components/headerMobile/HeaderMobile";
import NavbarMobile from "./components/navbarMobile/NavbarMobile";
import PatientMobileDashboard from "./pages/PatientMobileDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import AdminNavbar from "./components/AdminNavbar/AdminNavbar";
import "./App.css";

function PatientMobileLayout() {
  return (
    <>
      <HeaderMobile />
      <Outlet />
      <NavbarMobile />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <AdminNavbar />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/patient",
    element: <PatientMobileLayout />,
    children: [
      {
        path: "/patient",
        element: <PatientMobileDashboard />,
      } /* ,
      {
        path: "/patient/understanding",
        element: <PatientUnderstandingPage />,
      },
      {
        path: "/patient/paperwork",
        element: <PatientPaperworkPage />,
      }, */,
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
    ],
  },
  /* {
    path: "/practitioner",
    element: <Practitioner />,
  }, */
]);

function App() {
  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
