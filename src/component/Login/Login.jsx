import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../utills/validation";
import { Toaster, toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the icons

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Initialize Formik with default values
  const formik = useFormik({
    initialValues: {
      username: "admin",
      password: "admin",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      if (values.username === "admin" && values.password === "admin") {
        // Successful login for admin
        localStorage.setItem("isAuthenticated", "true");
        navigate("/employee");
      } else {
        // Invalid credentials
        toast.error("Invalid credentials", {
          position: "top-center",
        });
      }
    },
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className="bg-gray-50 h-[80vh] flex items-center justify-center">
      <Toaster />
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-medium pb-5 text-center">
          Hi, Welcome Back!
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="username"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-xs">
                {formik.errors.username}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-gray-700" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-700" />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-grey sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
