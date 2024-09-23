import React, { createContext, useReducer, useContext } from "react";
import * as actions from "./actions";

const AlertContext = createContext();

const initialState = {
  message: "",
  type: "", // "success" or "error"
};

const alertReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.SHOW_ALERT:
      return {
        ...state,
        message: payload.message,
        type: payload.type,
      };
    case actions.HIDE_ALERT:
      return { ...state, message: "", type: "" };
    default:
      return state;
  }
};

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const showAlert = (message, type = "info") => {
    dispatch({
      type: actions.SHOW_ALERT,
      payload: { message, type },
    });
    setTimeout(() => dispatch({ type: actions.HIDE_ALERT }), 3000); // Clear alert after 3 seconds
  };

  const handleError = (error) => {
    // Default message
    let message = "An unexpected error occurred";

    // Customize message based on error status
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        message = "Bad Request. Please check your input.";
      } else if (status === 401) {
        message = "Unauthorized. Please log in again.";
      } else if (status === 403) {
        message = "Forbidden. You don't have permission to access this.";
      } else if (status === 404) {
        message = "Resource not found.";
      } else if (status === 409) {
        message = "Duplicate Email.";
      } else if (status === 500) {
        message = "Server error. Please try again later.";
      } else {
        message = "An unexpected error occurred";
      }
    }

    showAlert(message, "error");
  };

  const handleSuccess = (message) => {
    showAlert(message, "success");
  };

  const handleWarning = (message) => {
    showAlert(message, "warning");
  };

  const value = {
    state,
    showAlert,
    handleError,
    handleSuccess,
    handleWarning,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
};

export default useAlert;
