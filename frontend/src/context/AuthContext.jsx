import React, { createContext, useReducer, useContext, useEffect } from "react";
import * as actions from "./actions";
import apiService from "./axiosConfig";
import useAlert from "./AlertContext";

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
};

const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.AUTH_START:
      return { ...state, isLoading: true };
    case actions.AUTH_FAIL:
      return { ...state, isLoading: false };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
      };
    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    case actions.GET_CUR_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { handleSuccess, handleError } = useAlert();

  const login = async (email, password) => {
    dispatch({ type: actions.AUTH_START });
    try {
      const res = await apiService.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: res.data.user,
      });
      handleSuccess("Login Successful!");
    } catch (error) {
      dispatch({ type: actions.AUTH_FAIL });
      handleError(error);
    }
  };

  const logout = async () => {
    dispatch({ type: actions.AUTH_START });
    try {
      await apiService.post("/auth/logout", null, { withCredentials: true });
      dispatch({ type: actions.LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: actions.AUTH_FAIL });
      handleError(error);
    }
  };

  const getCurrentUser = async () => {
    dispatch({ type: actions.AUTH_START });
    try {
      const res = await apiService.get("/auth/getCurrentUser", {
        withCredentials: true,
      });
      dispatch({
        type: actions.GET_CUR_USER_SUCCESS,
        payload: res.data.user,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch({ type: actions.AUTH_FAIL });
        logout();
        return;
      }
      handleError(error);
    }
  };

  // Catch unauthorized error 401
  useEffect(() => {
    apiService.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { response } = error;
        const { status } = response || {};

        if (status === 401) {
          // Redirect to login page
          logout();
        }

        return Promise.reject(error);
      }
    );
  }, []);

  const value = {
    state,
    login,
    logout,
    getCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthContext");
  }
  return context;
};

export default useAuth;
