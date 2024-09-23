import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import DashLayout from "./pages/DashLayout";
import JobStats from "./pages/JobStats";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import AddEditJob from "./pages/AddEditJob";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Error from "./pages/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<JobStats />} />
          <Route path="jobs">
            <Route index element={<JobList />} />
            <Route path=":id" element={<JobDetails />} />
            <Route path="edit/:id" element={<AddEditJob isEdit={true} />} />
            <Route path="add" element={<AddEditJob isEdit={false} />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
