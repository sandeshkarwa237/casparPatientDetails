import { BrowserRouter, useRoutes } from "react-router-dom";

import Dashboard from "./Dashboard/dashboard";
import PatientDetails from "./PatientDetails/patientDetails";

import "./App.css";

const Routes = () =>
  useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      index: true,
    },
    {
      path: "/?search=:inputText&age=:age&gender=:gender",
      element: <Dashboard />,
    },
    { path: "/patientDetails/:patient_id", element: <PatientDetails /> },
  ]);

const AppWrapper = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default AppWrapper;
