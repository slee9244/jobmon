import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useJob from "../context/JobContext";
import Markdown from "react-markdown";
import grayRobot from "../assets/grayRobot.svg";
import purpleRobot from "../assets/purpleRobot.svg";
import pinkRobot from "../assets/pinkRobot.svg";
import yellowRobot from "../assets/yellowRobot.svg";
import greenRobot from "../assets/greenRobot.svg";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaClipboardList,
  FaBriefcase,
  FaLink,
  FaStickyNote,
  FaEdit,
  FaArrowLeft,
} from "react-icons/fa";
import { JOB_STATUS } from "../components/constants";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, getJobDetails } = useJob();
  const { jobDetails, isLoading } = state;
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (id) {
      getJobDetails(id);
    }
  }, [id]);

  useEffect(() => {
    if (jobDetails) {
      setJob(jobDetails);
    }
  }, [jobDetails]);

  if (isLoading) return <div>Loading...</div>;
  if (!job) return <div>No job details found</div>;

  const getLogo = () => {
    const logos = {
      [JOB_STATUS.BOOKMARKED]: yellowRobot,
      [JOB_STATUS.APPLIED]: pinkRobot,
      [JOB_STATUS.INTERVIEWING]: greenRobot,
      [JOB_STATUS.REJECTED]: grayRobot,
      [JOB_STATUS.OFFERED]: purpleRobot,
    };
    return logos[job.status] || grayRobot;
  };

  const sections = [
    {
      title: "Location:",
      content: job?.location || "N/A",
      icon: <FaMapMarkerAlt className="text-gray-400" />,
    },
    {
      title: "Salary:",
      content: `$${job?.salary?.toLocaleString() || "N/A"}`,
      icon: <FaDollarSign className="text-gray-400" />,
    },
    {
      title: "Status:",
      content: job?.status || "N/A",
      icon: <FaClipboardList className="text-gray-400" />,
    },
    {
      title: "Job Type:",
      content: job?.jobType || "N/A",
      icon: <FaBriefcase className="text-gray-400" />,
    },
    {
      title: "Listing URL:",
      content: job?.listingURL ? (
        <span
          onClick={() =>
            window.open(job.listingURL, "_blank", "noopener noreferrer")
          }
          className="cursor-pointer break-words"
        >
          {job.listingURL || "N/A"}
        </span>
      ) : (
        "N/A"
      ),
      icon: <FaLink className="text-gray-400" />,
      isURL: true,
    },
    {
      title: "Notes:",
      content: (
        <Markdown className="markdown">
          {job?.notes || "No additional notes"}
        </Markdown>
      ),
      icon: <FaStickyNote className="text-gray-400" />,
      isNote: true,
    },
  ];

  return (
    <div>
      <header className="bg-white border-t-8 border-purple-300">
        <div className="container pt-20 pb-8 text-center">
          <img
            src={getLogo()}
            className="block mx-auto w-12 mb-4"
            alt="Job Status"
          />
          <h1 className="my-6 text-2xl font-bold text-gray-700">
            {job?.position}
          </h1>
          <button className="inline-block px-5 py-2.5 text-sm font-normal text-white bg-gray-700 rounded-full">
            •⋅{job?.company}⋅•
          </button>
          <div className="py-2.5 px-16 mt-5 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded">
            <p>
              You applied for this job on{" "}
              {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </header>

      <div className="container mt-4 -mb-4 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 text-md font-medium text-gray-700"
        >
          <FaArrowLeft className="mr-2" />
          <span className="lined">Go Back</span>
        </button>

        <button
          onClick={() => navigate(`/jobs/edit/${id}`)}
          className="flex items-center px-4 py-2 text-md font-medium text-gray-700"
        >
          <FaEdit className="mr-2" />
          <span className="lined">Edit Job</span>
        </button>
      </div>

      <section className="container mb-32">
        <div className="bg-white rounded-md shadow-md p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`py-4 px-6 ${section.isNote ? "col-span-full" : ""}`}
            >
              <div className="flex items-start">
                <div className="w-6">{section.icon}</div>
                <div className="flex-1">
                  <h3 className={"text-lg font-medium text-gray-700"}>
                    {section.title}
                  </h3>
                  <div
                    className={`text-md text-gray-500 ${
                      section.isURL
                        ? "overflow-hidden text-ellipsis whitespace-nowrap max-w-xs"
                        : ""
                    }`}
                  >
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobDetails;
