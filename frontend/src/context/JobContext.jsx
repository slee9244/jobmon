import { createContext, useReducer, useContext } from "react";
import * as actions from "./actions";
import axiosConfig from "./axiosConfig";
import useAlert from "./AlertContext";

const JobContext = createContext();

const initialState = {
  jobs: [],
  jobDetails: null,
  jobStats: null,
  isLoading: false,
};

const jobReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.JOB_START:
      return { ...state, isLoading: true };
    case actions.JOB_FAIL:
      return { ...state, isLoading: false };
    case actions.GET_JOBS_SUCCESS:
      return {
        ...state,
        jobs: payload,
        isLoading: false,
      };
    case actions.GET_DETAIL_SUCCESS:
      return {
        ...state,
        jobDetails: payload,
        isLoading: false,
      };
    case actions.GET_STATS_SUCCESS:
      return {
        ...state,
        jobStats: payload,
        isLoading: false,
      };
    case actions.CREATE_JOB_SUCCESS:
    case actions.UPDATE_JOB_SUCCESS:
    case actions.DELETE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);
  const { handleSuccess, handleError } = useAlert();

  // Get all jobs
  const getJobs = async (filters = {}) => {
    dispatch({ type: actions.JOB_START });
    try {
      // Convert filters object to query string
      const queryParams = new URLSearchParams(filters).toString();
      const res = await axiosConfig.get(`/jobs?${queryParams}`);
      dispatch({ type: actions.GET_JOBS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: actions.JOB_FAIL });
      handleError(error);
    }
  };

  // Get job details
  const getJobDetails = async (id) => {
    dispatch({ type: actions.JOB_START });
    try {
      const res = await axiosConfig.get(`/jobs`, {
        params: { id },
      });
      dispatch({ type: actions.GET_DETAIL_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: actions.JOB_FAIL });
      handleError(error);
    }
  };

  // Get job stats
  const getJobStats = async () => {
    dispatch({ type: actions.JOB_START });
    try {
      const res = await axiosConfig.get("/jobs/stats");
      dispatch({ type: actions.GET_STATS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: actions.JOB_FAIL });
      handleError(error);
    }
  };

  // Create job
  const createJob = async (jobData) => {
    dispatch({ type: actions.JOB_START });
    try {
      const res = await axiosConfig.post("/jobs", jobData);
      dispatch({ type: actions.CREATE_JOB_SUCCESS });
      handleSuccess("New Job Created!");
      getJobs(); // Optionally, fetch jobs again after creating
    } catch (error) {
      dispatch({ type: actions.JOB_FAIL });
      handleError(error);
    }
  };

  // Update an existing job
  const updateJob = async (jobData) => {
    dispatch({ type: actions.JOB_START });
    try {
      const res = await axiosConfig.patch("/jobs", jobData);
      dispatch({ type: actions.UPDATE_JOB_SUCCESS });
      handleSuccess("Job Updated!");
      getJobs(); // Optionally, fetch jobs again after updating
    } catch (error) {
      dispatch({ type: actions.JOB_FAIL });
      handleError(error);
    }
  };

  // Delete a job
  const deleteJob = async (jobId) => {
    dispatch({ type: actions.JOB_START });
    try {
      const res = await axiosConfig.delete("/jobs", { data: { id: jobId } });
      dispatch({ type: actions.DELETE_JOB_SUCCESS });
      handleSuccess("Job Deleted!");
      getJobs(); // Optionally, fetch jobs again after deleting
    } catch (error) {
      dispatch({ type: actions.JOB_FAIL });
      handleError(error);
    }
  };

  const value = {
    state,
    getJobs,
    getJobDetails,
    getJobStats,
    createJob,
    updateJob,
    deleteJob,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

const useJob = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJob must be used within JobContext");
  }
  return context;
};

export default useJob;
