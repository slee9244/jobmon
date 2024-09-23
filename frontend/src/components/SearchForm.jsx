import React, { useState } from "react";
import useJob from "../context/JobContext";
import { FaSearch, FaFilter } from "react-icons/fa";
import { JOB_STATUS, JOB_TYPE } from "./constants"; // Importing from constants

const SearchForm = () => {
  const { getJobs } = useJob();

  const SORT_OPTIONS = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
  ];

  const [filters, setFilters] = useState({
    status: [],
    jobType: [],
    search: "",
    sort: "latest",
  });

  const [isAdvancedVisible, setIsAdvancedVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getJobs(filters);
  };

  const toggleAdvancedFilters = () => {
    if (isAdvancedVisible) {
      setFilters({
        status: [],
        jobType: [],
        search: filters.search,
        sort: "latest",
      });
    }
    setIsAdvancedVisible((prev) => !prev);
  };

  return (
    <div>
      <form className="flex h-10 shadow-m" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleInputChange}
          placeholder="Search for jobs :D"
          className="font-gmarket-sans flex-1 px-6 py-4 text-md font-medium border-none rounded-l-md outline-none"
        />
        <button
          type="submit"
          className="flex-none px-3 py-4 text-white bg-gray-600 border-none outline-none flex items-center justify-center"
        >
          <FaSearch className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={toggleAdvancedFilters}
          className="flex-none px-3 py-4 text-white bg-gray-600 rounded-r-md border-none outline-none flex items-center justify-center"
        >
          <FaFilter className="w-4 h-4" />
        </button>
      </form>

      {isAdvancedVisible && (
        <div className="mt-4 space-y-4">
          {/* Sort */}
          <div>
            <label className="label-primary">Sort</label>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleInputChange}
              className="input-primary"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="label-primary">Status</label>
            <div className="space-y-2">
              {Object.values(JOB_STATUS).map((status) => (
                <div key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    name="status"
                    value={status}
                    checked={filters.status.includes(status)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 accent-purple-600"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="label-primary">Job Type</label>
            <div className="space-y-2">
              {Object.values(JOB_TYPE).map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    name="jobType"
                    value={type}
                    checked={filters.jobType.includes(type)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 accent-purple-600"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
