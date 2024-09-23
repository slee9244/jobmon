import { createContext, useReducer, useContext } from "react";
import * as actions from "./actions";
import axiosConfig from "./axiosConfig";
import useAlert from "./AlertContext";

const UserContext = createContext();

const initialState = {
  users: [],
  isLoading: false,
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.USER_START:
      return { ...state, isLoading: true };
    case actions.USER_FAIL:
      return { ...state, isLoading: false };
    case actions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        isLoading: false,
      };
    case actions.CREATE_USER_SUCCESS:
    case actions.UPDATE_USER_SUCCESS:
    case actions.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { handleSuccess, handleError } = useAlert();

  // Get all users
  const getUsers = async () => {
    dispatch({ type: actions.USER_START });
    try {
      const res = await axiosConfig.get("/users");
      dispatch({ type: actions.GET_USERS_SUCCESS, payload: res.data });
      // handleSuccess("Users loaded.");
    } catch (error) {
      dispatch({ type: actions.USER_FAIL });
      handleError(error);
    }
  };

  // Create user
  const createUser = async (userData) => {
    dispatch({ type: actions.USER_START });
    try {
      const res = await axiosConfig.post("/users", userData);
      dispatch({ type: actions.CREATE_USER_SUCCESS });
      handleSuccess("User Created. Welcome!");
      // Optionally, fetch users again after creating
      // It creates unauthorized error
      // getUsers();
    } catch (error) {
      dispatch({ type: actions.USER_FAIL });
      handleError(error);
    }
  };

  // Update an existing user
  const updateUser = async (userData) => {
    try {
      dispatch({ type: actions.USER_START });
      const res = await axiosConfig.patch("/users", userData);
      dispatch({ type: actions.UPDATE_USER_SUCCESS });
      handleSuccess("User Profile Updated!");
      // Optionally, fetch users again after updating
      getUsers();
    } catch (error) {
      dispatch({ type: actions.USER_FAIL });
      handleError(error);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      dispatch({ type: actions.USER_START });
      const res = await axiosConfig.delete("/users", {
        data: { id: userId },
      });
      dispatch({ type: actions.DELETE_USER_SUCCESS });
      handleSuccess("User Deleted!");
      // Optionally, fetch users again after deleting
      getUsers();
    } catch (error) {
      dispatch({ type: actions.USER_FAIL });
      handleError(error);
    }
  };

  const value = {
    state,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within UserContext");
  }
  return context;
};

export default useUser;
