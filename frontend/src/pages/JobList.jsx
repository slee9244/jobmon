import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import JobCard from "../components/JobCard";
import useJob from "../context/JobContext";
import Pagination from "../components/Pagination";
import bookIcon from "../assets/book.svg";

const JOBS_PER_PAGE = 21;

const JobList = () => {
  const { state, getJobs } = useJob();
  const { jobs } = state;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getJobs();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const indexOfLastJob = currentPage * JOBS_PER_PAGE;
  const indexOfFirstJob = indexOfLastJob - JOBS_PER_PAGE;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);

  return (
    <div className="mb-32">
      <div className="flex items-center justify-center py-16 bg-gray-300">
        <img className="h-11 mr-8" src={bookIcon} alt="Icon" />
        <div>
          <h1 className="text-2xl font-bold text-gray-600">All Jobs</h1>
          <p className="text-sm font-medium text-gray-600">
            Track your job applications
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <div className="flex flex-col">
          <div className="w-full mb-4 -mt-8">
            <SearchForm />
          </div>
          {/* Job List */}
          <div className="flex-1">
            <p className="text-gray-500 mb-4">Total {jobs.length} jobs</p>

            {jobs.length === 0 ? (
              <div className="text-center my-10">
                <h2 className="text-gray-500 text-lg">No jobs found</h2>
                <p className="text-gray-500 mt-2">
                  Please check your search criteria or try again later.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {currentJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
