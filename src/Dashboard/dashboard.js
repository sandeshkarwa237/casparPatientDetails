import React, { useState, Fragment, useCallback } from "react";

import queryString from "query-string";

import { useNavigate } from "react-router-dom";

import Dropdown from "../common-components/Dropdown/dropdown";
import InputField from "../common-components/InputField/inputfield";
import CustomTable from "../common-components/Table/table";
import ConfirmationModal from "../common-components/Modal/modal";

import { data } from "../static-content/patientDetails";
import {
  ageFilterData,
  genderData,
} from "../static-content/patientFilterDetails";
import { patientTableKeys } from "../static-content/patientTableKeys";

import { debounce } from "../utils/debounce";
import {
  searchTableContent,
  deleteRow,
  filterTableContent,
} from "../utils/customTableHook";

import "./dashboard.css";

const Dashboard = () => {
  const {
    age = "",
    gender = "",
    search = "",
  } = queryString.parse(window.location.search);
  const navigate = useNavigate();
  const [showModal, updateModal] = useState(false);
  const [inputText, updateInputText] = useState(search);
  const [selectedPatientId, updatePatientId] = useState("");

  const debounceChange = useCallback(
    debounce((value) => {
      updateInputText(value);
    }, 500),
    []
  );

  const deleteTableRow = () => {
    updateModal(!showModal);
  };

  const updateDropdownValues = (event, key) => {
    if (key === "age") {
      navigate(
        `/?search=${inputText}&age=${event.target.value}&gender=${gender}`
      );
    } else {
      navigate(`/?search=${inputText}&age=${age}&gender=${event.target.value}`);
    }
  };

  const confirmDeletePatient = (event, patientId) => {
    event.stopPropagation();
    updateModal(!showModal);
    updatePatientId(patientId);
  };

  const onRowClick = (patientId) => {
    patientId && navigate(`/patientDetails/${patientId}`);
  };

  const getPatientData = useCallback(() => {
    if (age || gender || showModal || inputText) {
      let filteredTableContent = filterTableContent(data, age, "age");
      filteredTableContent = filterTableContent(
        filteredTableContent,
        gender,
        "gender"
      );
      filteredTableContent = searchTableContent(
        filteredTableContent,
        inputText
      );
      filteredTableContent =
        !showModal && selectedPatientId
          ? deleteRow(filteredTableContent, "patient_id", selectedPatientId)
          : filteredTableContent;
      return filteredTableContent;
    } else {
      return data;
    }
  }, [age, gender, showModal, inputText, selectedPatientId]);

  return (
    <Fragment>
      <h2>Patients List</h2>
      <div className="filterContainer">
        <div className="dropdownWrapper">
          <label>Filter table content: </label>
          <Dropdown
            selectedValue={age}
            options={ageFilterData}
            onchange={(event) => updateDropdownValues(event, "age")}
          />
          <Dropdown
            selectedValue={gender}
            options={genderData}
            onchange={(event) => updateDropdownValues(event, "gender")}
          />
        </div>
        <div className="inputWrapper">
          <InputField
            placeholderText="Search"
            type="text"
            value={inputText}
            onChange={debounceChange}
            onBlur={() =>
              navigate(`/?search=${inputText}&age=${age}&gender=${gender}`)
            }
          />
        </div>
      </div>
      <CustomTable
        tableData={getPatientData()}
        deleteRow={confirmDeletePatient}
        className="patientTableContainer"
        isRowDeletable={true}
        onRowClick={onRowClick}
        tableContentKeys={patientTableKeys}
        noResultsText="No results found"
      />
      <ConfirmationModal
        modalIsOpen={showModal}
        toggleModal={() => updateModal(!showModal)}
        headerText={`Are you sure you want to delete Patient Id: ${selectedPatientId} ?`}
        confirmDetails={deleteTableRow}
        closeModal={() => updateModal(!showModal)}
      />
    </Fragment>
  );
};

export default Dashboard;
