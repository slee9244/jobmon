import React, { useState, useEffect } from "react";
import useUser from "../context/UserContext";
import useAuth from "../context/AuthContext";
import useAlert from "../context/AlertContext";
import Alert from "../components/Alert";

const ProfilePage = () => {
  const { updateUser } = useUser();
  const { state } = useAuth();
  const { handleWarning } = useAlert();
  const { user, isLoading } = state;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the new password and confirmation password match
    if (formData.password && formData.password !== formData.confirmPassword) {
      handleWarning("Passwords do not match");
      return;
    }

    const userData = {
      id: user._id,
      name: formData.name,
      email: formData.email,
      password: formData.password ? formData.password : undefined,
    };

    updateUser(userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Define input fields configuration
  const inputFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
    },
    {
      label: "New Password",
      name: "password",
      type: "password",
      placeholder: "Leave blank to keep current password",
    },
    {
      label: "Confirm New Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Re-enter your new password",
    },
  ];

  return (
    <div className="container">
      <h1 className="lined text-2xl font-semibold text-gray-700 my-8">
        Profile
      </h1>
      <Alert />
      <form onSubmit={handleSubmit} className="space-y-6 mb-24">
        {inputFields.map(({ label, name, type, required, placeholder }) => (
          <div key={name}>
            <label className="label-primary">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="input-primary"
              required={required}
              placeholder={placeholder}
            />
          </div>
        ))}
        <div className="flex justify-end mt-6 mb-24">
          <button
            type="submit"
            disabled={isLoading}
            className="button-primary px-4 py-2"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
