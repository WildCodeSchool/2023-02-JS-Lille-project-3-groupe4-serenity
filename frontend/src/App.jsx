import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/admin/adminLayout/AdminLayout";
import PatientLayout from "./components/patient/patientLayout/PatientLayout";
import PractitionerLayout from "./components/practitionner/practitionerLayout/PractitionerLayout";
import Home from "./pages/Home";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminInterventionPage from "./pages/admin/AdminInterventionPage";
import AdminPatientPage from "./pages/admin/AdminPatientPage";
import AdminPractitionerPage from "./pages/admin/AdminPractitionerPage";
import AdminUnitPage from "./pages/admin/AdminUnitPage";
import PatientBreathePage from "./pages/patient/PatientBreathePage";
import PatientChecklistPage from "./pages/patient/PatientChecklistPage";
import PatientDashboardPage from "./pages/patient/PatientDashboardPage";
import PatientMusicPage from "./pages/patient/PatientMusicPage";
import PatientPaperworkPage from "./pages/patient/PatientPaperworkPage";
import PatientSerenityPage from "./pages/patient/PatientSerenityPage";
import PatientUnderstandingPage from "./pages/patient/PatientUnderstandingPage";
import PractitionerDashboardPage from "./pages/practitioner/PractitionerDashboardPage";
import PractitionerInterventionPage from "./pages/practitioner/PractitionerInterventionPage";
import PractitionerPatientPage from "./pages/practitioner/PractitionerPatientPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/patient",
    element: <PatientLayout />,
    children: [
      {
        path: "/patient/dashboard",
        element: <PatientDashboardPage />,
      },
      {
        path: "/patient/understanding",
        element: <PatientUnderstandingPage />,
      },
      {
        path: "/patient/paperwork",
        element: <PatientPaperworkPage />,
      },
      {
        path: "/patient/serenity",
        element: <PatientSerenityPage />,
      },
      {
        path: "/patient/checklist",
        element: <PatientChecklistPage />,
      },
      {
        path: "/patient/music",
        element: <PatientMusicPage />,
      },
      {
        path: "/patient/breathe",
        element: <PatientBreathePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboardPage />,
      },
      {
        path: "/admin/unit",
        element: <AdminUnitPage />,
      },
      {
        path: "/admin/practitioner",
        element: <AdminPractitionerPage />,
      },
      {
        path: "/admin/patient",
        element: <AdminPatientPage />,
      },
      {
        path: "/admin/intervention",
        element: <AdminInterventionPage />,
      },
    ],
  },
  {
    path: "/practitioner",
    element: <PractitionerLayout />,
    children: [
      {
        path: "/practitioner",
        element: <PractitionerDashboardPage />,
      },
      {
        path: "/practitioner/patient",
        element: <PractitionerPatientPage />,
      },
      {
        path: "/practitioner/intervention",
        element: <PractitionerInterventionPage />,
      },
    ],
  },
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
