import React from "react";
import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useJob from "../context/JobContext";
import { JOB_STATUS } from "./constants";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { deleteJob } = useJob();
  const { _id, position, company, location, jobType, status, createdAt } = job; // Destructure job object
  let date = moment(createdAt).format("MMM Do, YYYY"); // Assuming current date for demo

  const statusColors = {
    [JOB_STATUS.BOOKMARKED]: "bg-[#FFF7E5] text-[#FF9103]",
    [JOB_STATUS.APPLIED]: "bg-[#FFEBF7] text-[#FF52B7]",
    [JOB_STATUS.INTERVIEWING]: "bg-[#EBFFEA] text-[#00BE2F]",
    [JOB_STATUS.REJECTED]: "bg-[#EDEDF0] text-[#888893]",
    [JOB_STATUS.OFFERED]: "bg-[#F8ECFF] text-[#B363FD]",
  };

  // Handle edit job
  const handleEdit = () => {
    navigate(`/jobs/edit/${_id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob(_id);
    }
  };

  return (
    <div className=" bg-white text-link border rounded-md shadow-md overflow-hidden">
      <Link to={`/jobs/${_id}`} className="block">
        <header className="px-4 py-6 border-t-8 border-purple-300 flex items-center ">
          <div className="w-16 h-16 bg-purple-300 text-white flex items-center justify-center text-2xl rounded-full mr-4 flex-shrink-0">
            {company.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg">{position}</h2>
            <p className="text-md">{company}</p>
          </div>
        </header>
      </Link>
      <div className="p-4 border-t bg-gray-100 text-sm">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex items-center">
            <FaLocationArrow className="text-gray-400 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <FaBriefcase className="text-gray-400 mr-2" />
            <span>{jobType}</span>
          </div>
          <div
            className={`py-1 px-3 rounded-md text-center w-32 ${statusColors[status]}`}
          >
            {status}
          </div>
        </div>
      </div>
      <footer className="p-4 bg-gray-100 border-gray-200 flex justify-end space-x-2">
        <button
          type="button"
          className="bg-gray-200 text-gray-600 px-3 py-1 rounded text-xs"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          type="button"
          className="bg-gray-200 text-gray-600 px-3 py-1 rounded text-xs"
          onClick={handleDelete}
        >
          Delete
        </button>
      </footer>
    </div>
  );
};

export default JobCard;
