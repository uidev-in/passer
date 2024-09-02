import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../utills/validation";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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

  return (
    <section className="bg-gray-50 h-screen">
      {/* Include Toaster component to render the toast notifications */}
      <Toaster />
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
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
              placeholder="Your username"
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
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Your password"
            />
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
