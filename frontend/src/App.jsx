import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PatientLoginPage from "./pages/patient/PatientLoginPage";
import PatientInterventionPage from "./pages/patient/PatientInterventionPage";
import PatientLayout from "./components/patient/patientLayout/PatientLayout";
import PatientUnderstandingPage from "./pages/patient/PatientUnderstandingPage";
import PatientPaperworkPage from "./pages/patient/PatientPaperworkPage";
import InfosPatientPage from "./pages/patient/InfosPatientPage";
import PatientSerenityPage from "./pages/patient/PatientSerenityPage";
import PatientOutboardingPage from "./pages/patient/PatientOutboardingPage";
import PatientChecklistPage from "./pages/patient/PatientChecklistPage";
import PatientMusicPage from "./pages/patient/PatientMusicPage";
import PatientBreathePage from "./pages/patient/PatientBreathePage";
import AdminLayout from "./components/admin/adminLayout/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUnitPage from "./pages/admin/AdminUnitPage";
import AdminPractitionerPage from "./pages/admin/AdminPractitionerPage";
import AdminPatientPage from "./pages/admin/AdminPatientPage";
import AdminInterventionPage from "./pages/admin/AdminInterventionPage";
import AdminStaffPage from "./pages/admin/AdminStaffPage";
import AddStaff from "./components/admin/addStaff/AddStaff";
import SecretariatLayout from "./components/secretariat/secretariatLayout/SecretariatLayout";
import SecretariatDashboardPage from "./pages/secretariat/SecretariatDashboardPage";
import SecretariatUnitPage from "./pages/secretariat/SecretariatUnitPage";
import SecretariatPractitionerPage from "./pages/secretariat/SecretariatPractitionerPage";
import AddPractitioner from "./components/secretariat/addPractitioner/AddPractitioner";
import InfosPractitioner from "./components/secretariat/infosPractitioner/InfosPractitioner";
import SecretariatPatientPage from "./pages/secretariat/SecretariatPatientPage";
import AddPatient from "./components/secretariat/addPatient/AddPatient";
import InfosPatient from "./components/secretariat/infosPatient/InfosPatient";
import SecretariatInterventionPage from "./pages/secretariat/SecretariatInterventionPage";
import AddIntervention from "./components/secretariat/addIntervention/AddIntervention";
import InfoIntervention from "./components/secretariat/infosIntervention/InfosIntervention";
import PractitionerPatientInfoPage from "./pages/practitioner/PractitionerPatientInfoPage";
import PractitionerLayout from "./components/practitionner/practitionerLayout/PractitionerLayout";
import PractitionerDashboardPage from "./pages/practitioner/PractitionerDashboardPage";
import PractitionerPatientPage from "./pages/practitioner/PractitionerPatientPage";
import PractitionerInterventionPage from "./pages/practitioner/PractitionerInterventionPage";
import PractitionerInterventionInfoPage from "./pages/practitioner/PractitionerInterventionInfoPage";
import RequireAuth from "./components/auth/RequireAuth";
import Unauthorized from "./components/unauthorized/Unauthorized";
import InfosStaff from "./components/admin/infosStaff/InfosStaff";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PatientLoginPage />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* Patient Routes */}
      <Route element={<RequireAuth allowedRoles="Patient" />}>
        <Route
          path="/patient/:idPatient/intervention"
          element={<PatientInterventionPage />}
        />
        <Route path="/patient/:idPatient/:idInter" element={<PatientLayout />}>
          <Route path="understanding" element={<PatientUnderstandingPage />} />
          <Route
            path="understanding/paperwork"
            element={<PatientPaperworkPage />}
          />
          <Route
            path="understanding/paperwork/infospatient"
            element={<InfosPatientPage />}
          />
          <Route
            path="understanding/serenity"
            element={<PatientSerenityPage />}
          />
          <Route
            path="understanding/outboarding"
            element={<PatientOutboardingPage />}
          />
          <Route
            path="understanding/checklist"
            element={<PatientChecklistPage />}
          />
          <Route path="music" element={<PatientMusicPage />} />
          <Route path="breathe" element={<PatientBreathePage />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<AdminDashboardPage />} />
        <Route path="unit" element={<AdminUnitPage />} />
        <Route path="practitioner" element={<AdminPractitionerPage />} />
        <Route
          path="practitioner/add"
          element={
            <AddPractitioner currentColor="var(--red)" routeRole="/admin" />
          }
        />
        <Route
          path="practitioner/infos/:identifier_rpps"
          element={
            <InfosPractitioner currentColor="var(--red)" routeRole="/admin" />
          }
        />
        <Route path="patient" element={<AdminPatientPage />} />
        <Route
          path="patient/add"
          element={<AddPatient currentColor="var(--red)" routeRole="/admin" />}
        />
        <Route
          path="patient/infos/:social_secu_number"
          element={
            <InfosPatient currentColor="var(--red)" routeRole="/admin" />
          }
        />
        <Route path="intervention" element={<AdminInterventionPage />} />
        <Route
          path="intervention/add"
          element={
            <AddIntervention currentColor="var(--red)" routeRole="/admin" />
          }
        />
        <Route
          path="intervention/infos/:id"
          element={
            <InfoIntervention currentColor="var(--red)" routeRole="/admin" />
          }
        />
        <Route path="staff" element={<AdminStaffPage />} />
        <Route path="staff/add" element={<AddStaff />} />
        <Route path="staff/infos/:id" element={<InfosStaff />} />
      </Route>

      {/* Secretariat Routes */}
      <Route element={<RequireAuth allowedRoles="Secrétaire" />}>
        <Route path="/secretariat" element={<SecretariatLayout />}>
          <Route path="" element={<SecretariatDashboardPage />} />
          <Route path="unit" element={<SecretariatUnitPage />} />
          <Route
            path="practitioner"
            element={<SecretariatPractitionerPage />}
          />
          <Route
            path="practitioner/add"
            element={
              <AddPractitioner
                currentColor="var(--main-purple)"
                routeRole="/secretariat"
              />
            }
          />
          <Route
            path="practitioner/infos/:identifier_rpps"
            element={
              <InfosPractitioner
                currentColor="var(--main-purple)"
                routeRole="/secretariat"
              />
            }
          />
          <Route path="patient" element={<SecretariatPatientPage />} />
          <Route
            path="patient/add"
            element={
              <AddPatient
                currentColor="var(--main-purple)"
                routeRole="/secretariat"
              />
            }
          />
          <Route
            path="patient/infos/:social_secu_number"
            element={
              <InfosPatient
                currentColor="var(--main-purple)"
                routeRole="/secretariat"
              />
            }
          />
          <Route
            path="intervention"
            element={<SecretariatInterventionPage />}
          />
          <Route
            path="intervention/add"
            element={
              <AddIntervention
                currentColor="var(--main-purple)"
                routeRole="/secretariat"
              />
            }
          />
          <Route
            path="intervention/infos/:id"
            element={
              <InfoIntervention
                currentColor="var(--main-purple)"
                routeRole="/secretariat"
              />
            }
          />
        </Route>
      </Route>

      {/* Practitioner Routes */}
      <Route element={<RequireAuth allowedRoles="Praticien" />}>
        <Route path="/practitioner" element={<PractitionerLayout />}>
          <Route
            path=":identifierRpps"
            element={<PractitionerDashboardPage />}
          />
          <Route
            path="patient/:identifierRpps"
            element={<PractitionerPatientPage />}
          />
          <Route
            path="patient/infos/:social_secu_number"
            element={<PractitionerPatientInfoPage />}
          />
          <Route
            path="interventions/:identifierRpps"
            element={<PractitionerInterventionPage />}
          />
          <Route
            path="interventions/:identifierRpps/infos/:idIntervention"
            element={<PractitionerInterventionInfoPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
