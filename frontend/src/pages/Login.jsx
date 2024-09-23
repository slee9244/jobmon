import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jobmonLogo from "../assets/jobmonLogo.svg";
import spinnerImg from "../assets/spinner.svg";
import useAuth from "../context/AuthContext";
import useUser from "../context/UserContext";
import Alert from "../components/Alert";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const { state, login } = useAuth();
  const { createUser } = useUser();
  const { isLoading, user } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      createUser(formData);
    } else {
      login(formData.email, formData.password);
    }
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Define form fields
  const formFields = [
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Name",
      required: isRegister,
      show: isRegister,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email",
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      required: true,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <img
          src={jobmonLogo}
          alt="Jobmon"
          className="block mx-auto w-48 mb-4"
        />
        <p className="text-gray-600 text-center mb-4">
          {isRegister ? (
            <>
              Already a member?{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-purple-600"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Not a member?{" "}
              <button
                onClick={() => setIsRegister(true)}
                className="text-purple-600"
              >
                Register
              </button>
            </>
          )}
        </p>

        <Alert />

        <form onSubmit={handleSubmit}>
          {formFields.map(
            (field) =>
              field.show !== false && (
                <div key={field.id} className="mb-4">
                  <label
                    htmlFor={field.id}
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="border rounded-lg w-full p-4 text-gray-700 leading-tight 
                    focus:outline-none focus:ring-2 focus:ring-purple-600/80 focus:bg-purple-100/90"
                  />
                </div>
              )
          )}
          <button
            type="submit"
            className="button-primary w-full h-14 text-lg items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <img
                className="animate-spin w-4"
                src={spinnerImg}
                alt="Loading..."
              />
            ) : isRegister ? (
              "Register"
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
