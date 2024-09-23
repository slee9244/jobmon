import React from "react";
import JobForm from "../components/JobForm";

const AddEditJob = ({ isEdit }) => {
  return <JobForm isEdit={isEdit} />;
};

export default AddEditJob;
