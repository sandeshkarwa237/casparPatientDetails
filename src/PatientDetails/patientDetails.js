import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import InputField from "../common-components/InputField/inputfield";
import ConfirmationModal from "../common-components/Modal/modal";

import { patientTableKeys } from "../static-content/patientTableKeys";
import { data } from "../static-content/patientDetails";

import "./patientDetails.css";

const PatientDetails = () => {
  const params = useParams();
  const [showModal, updateModal] = useState(false);
  const [selectedPatientDetails, updateSelectedPatientDetails] = useState({});

  useEffect(() => {
    for (let index = 0; index < data.length; index++) {
      if (data[index].patient_id === parseInt(params.patient_id)) {
        updateSelectedPatientDetails(data[index]);
        break;
      }
    }
  }, [params.patient_id]);

  return (
    <div className="formContainer">
      <div className="backLink" onClick={() => window.history.back()}>
        Back
      </div>
      <div className="profileWrapper">
        <img
          src={selectedPatientDetails.avatar}
          alt="profilePicture"
          className="profileIcon"
        />
      </div>
      <div className="formWrapper">
        {patientTableKeys.map((patientTableKey) => {
          return (
            <p className="flexWrapper" key={patientTableKey.label}>
              <label className="formLabel">{patientTableKey.label}</label>
              <InputField
                editable={true}
                type="text"
                value={selectedPatientDetails[patientTableKey.key]}
              />
            </p>
          );
        })}
        <p className="flexWrapper">
          <label className="formLabel">Gender</label>
          <InputField
            editable={true}
            type="text"
            value={selectedPatientDetails.gender}
          />
        </p>
        <p className="flexWrapper">
          <label className="formLabel">Age</label>
          <InputField
            editable={true}
            type="number"
            value={selectedPatientDetails.age}
          />
        </p>
        <button className="footerBtn" onClick={() => updateModal(!showModal)}>
          Delete
        </button>
      </div>
      <ConfirmationModal
        modalIsOpen={showModal}
        toggleModal={() => updateModal(!showModal)}
        headerText={`Are you sure you want to delete ?`}
        confirmDetails={() => window.history.back()}
        closeModal={() => updateModal(!showModal)}
      />
    </div>
  );
};

export default PatientDetails;
