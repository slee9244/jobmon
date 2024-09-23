import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useJob from "../context/JobContext";
import Alert from "./Alert";
import { JOB_STATUS, JOB_TYPE } from "./constants"; // Import constants

const JobForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, getJobDetails, createJob, updateJob } = useJob();
  const { jobDetails, isLoading } = state;
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    location: "",
    salary: "",
    status: JOB_STATUS.APPLIED, // default value
    jobType: JOB_TYPE.FULLTIME, // default value
    listingURL: "",
    notes: "",
  });

  useEffect(() => {
    if (id && isEdit) {
      getJobDetails(id);
    } else {
      setFormData({
        position: "",
        company: "",
        location: "",
        salary: "",
        status: JOB_STATUS.APPLIED, // default value
        jobType: JOB_TYPE.FULLTIME, // default value
        listingURL: "",
        notes: "",
      });
    }
  }, [id, isEdit]);

  useEffect(() => {
    if (isEdit && jobDetails) {
      setFormData({
        position: jobDetails.position || "",
        company: jobDetails.company || "",
        location: jobDetails.location || "",
        salary: jobDetails.salary || "",
        status: jobDetails.status || "",
        jobType: jobDetails.jobType || "",
        listingURL: jobDetails.listingURL || "",
        notes: jobDetails.notes || "",
      });
    }
  }, [jobDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateJob({ id, ...formData });
    } else {
      createJob(formData);
    }
    setTimeout(() => {
      navigate("/jobs");
    }, 3000);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formFields = [
    { label: "Position", name: "position", type: "text" },
    { label: "Company", name: "company", type: "text" },
    { label: "Location", name: "location", type: "text" },
    { label: "Salary", name: "salary", type: "number" },
    { label: "Listing URL", name: "listingURL", type: "url" },
  ];

  const selectFields = [
    {
      label: "Status",
      name: "status",
      options: Object.keys(JOB_STATUS).map((key) => ({
        value: JOB_STATUS[key],
        label: JOB_STATUS[key],
      })),
    },
    {
      label: "Job Type",
      name: "jobType",
      options: Object.keys(JOB_TYPE).map((key) => ({
        value: JOB_TYPE[key],
        label: JOB_TYPE[key],
      })),
    },
  ];

  return (
    <div className="container mb-32">
      <h1 className="lined text-2xl font-semibold text-gray-700 my-8">
        {isEdit ? "Edit Job" : "Create Job"}
      </h1>
      <Alert />
      <form onSubmit={handleSubmit}>
        {formFields.map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label className="label-primary">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="input-primary"
            />
          </div>
        ))}
        {selectFields.map(({ label, name, options }) => (
          <div className="mb-4" key={name}>
            <label className="label-primary">{label}</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="input-primary"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="mb-4">
          <label className="label-primary">
            Notes{" "}
            <span className="text-xs text-gray-500">(Markdown Format)</span>
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="input-primary h-48"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="button-primary px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => navigate("/jobs")}
          >
            Cancel
          </button>
          <button type="submit" className="button-primary px-4 py-2">
            {isEdit ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
