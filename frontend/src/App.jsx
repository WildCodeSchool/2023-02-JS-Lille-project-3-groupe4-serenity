import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/admin/adminLayout/AdminLayout";
import PatientLayout from "./components/patient/patientLayout/PatientLayout";
import PractitionerLayout from "./components/practitionner/practitionerLayout/PractitionerLayout";
import AddIntervention from "./components/secretariat/addIntervention/AddIntervention";
import AddPatient from "./components/secretariat/addPatient/AddPatient";
import AddPractitioner from "./components/secretariat/addPractitioner/AddPractitioner";
import InfosPatient from "./components/secretariat/infosPatient/InfosPatient";
import SecretariatLayout from "./components/secretariat/secretariatLayout/SecretariatLayout";
import Home from "./pages/Home";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminInterventionPage from "./pages/admin/AdminInterventionPage";
import AdminPatientPage from "./pages/admin/AdminPatientPage";
import AdminPractitionerPage from "./pages/admin/AdminPractitionerPage";
import AdminStaffPage from "./pages/admin/AdminStaffPage";
import AdminUnitPage from "./pages/admin/AdminUnitPage";
import InfosPatientPage from "./pages/patient/InfosPatientPage";
import PatientBreathePage from "./pages/patient/PatientBreathePage";
import PatientChecklistPage from "./pages/patient/PatientChecklistPage";
import PatientInterventionPage from "./pages/patient/PatientInterventionPage";
import PatientLoginPage from "./pages/patient/PatientLoginPage";
import PatientMusicPage from "./pages/patient/PatientMusicPage";
import PatientOutboardingPage from "./pages/patient/PatientOutboardingPage";
import PatientPaperworkPage from "./pages/patient/PatientPaperworkPage";
import PatientSerenityPage from "./pages/patient/PatientSerenityPage";
import PatientUnderstandingPage from "./pages/patient/PatientUnderstandingPage";
import PractitionerDashboardPage from "./pages/practitioner/PractitionerDashboardPage";
import PractitionerInterventionPage from "./pages/practitioner/PractitionerInterventionPage";
import PractitionerPatientPage from "./pages/practitioner/PractitionerPatientPage";
import SecretariatDashboardPage from "./pages/secretariat/SecretariatDashboardPage";
import SecretariatInterventionPage from "./pages/secretariat/SecretariatInterventionPage";
import SecretariatPatientPage from "./pages/secretariat/SecretariatPatientPage";
import SecretariatPractitionerPage from "./pages/secretariat/SecretariatPractitionerPage";
import SecretariatUnitPage from "./pages/secretariat/SecretariatUnitPage";
import SecretariatLoginPage from "./pages/secretariat/SecretariatLoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/patient/login",
    element: <PatientLoginPage />,
  },
  {
    path: "/patient/intervention",
    element: <PatientInterventionPage />,
  },

  {
    path: "/patient/:idPatient/:idInter",
    element: <PatientLayout />,
    children: [
      {
        path: "understanding",
        element: <PatientUnderstandingPage />,
      },
      {
        path: "understanding/paperwork",
        element: <PatientPaperworkPage />,
      },
      {
        path: "understanding/paperwork/infospatient",
        element: <InfosPatientPage />,
      },
      {
        path: "understanding/serenity",
        element: <PatientSerenityPage />,
      },
      {
        path: "understanding/outboarding",
        element: <PatientOutboardingPage />,
      },
      {
        path: "understanding/checklist",
        element: <PatientChecklistPage />,
      },
      {
        path: "music",
        element: <PatientMusicPage />,
      },
      {
        path: "breathe",
        element: <PatientBreathePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminDashboardPage />,
      },
      {
        path: "unit",
        element: <AdminUnitPage />,
      },
      {
        path: "practitioner",
        element: <AdminPractitionerPage />,
      },
      {
        path: "patient",
        element: <AdminPatientPage />,
      },
      {
        path: "intervention",
        element: <AdminInterventionPage />,
      },
      {
        path: "staff",
        element: <AdminStaffPage />,
      },
    ],
  },
  {
    path: "/secretariat",
    children: [
      {
        path: "login",
        element: <SecretariatLoginPage />,
      },
      {
        path: "",
        element: <SecretariatLayout />,
        children: [
          {
            path: "",
            element: <SecretariatDashboardPage />,
          },
          {
            path: "unit",
            element: <SecretariatUnitPage />,
          },
          {
            path: "practitioner",
            element: <SecretariatPractitionerPage />,
          },
          {
            path: "practitioner/add",
            element: <AddPractitioner />,
          },
          {
            path: "patient",
            element: <SecretariatPatientPage />,
          },
          {
            path: "patient/add",
            element: <AddPatient />,
          },
          {
            path: "patient/infos/:social_secu_number",
            element: <InfosPatient />,
          },
          {
            path: "intervention",
            element: <SecretariatInterventionPage />,
          },
          {
            path: "intervention/add",
            element: <AddIntervention />,
          },
        ],
      },
    ],
  },
  {
    path: "/practitioner",
    element: <PractitionerLayout />,
    children: [
      {
        path: "",
        element: <PractitionerDashboardPage />,
      },
      {
        path: "patient",
        element: <PractitionerPatientPage />,
      },
      {
        path: "intervention",
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
