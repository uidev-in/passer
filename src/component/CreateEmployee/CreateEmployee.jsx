import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createContact } from "../../store/slice/contactSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import { userCreateValidationSchema } from "../../utills/validation";

export default function CreateEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(createContact(values))
      .unwrap()
      .then(() => {
        toast.success("Employee created successfully!");
        navigate("/employee");
      })
      .catch((error) => {
        console.error("Failed to create contact: ", error);
        toast.error("Failed to create employee. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <section className="bg-yellow-50 h-screen">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <Formik
          initialValues={{ name: "", username: "", email: "", role: "" }}
          validationSchema={userCreateValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-secondary-black"
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="ex : Saanvi"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-secondary-black"
                >
                  User Name
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="ex: saanvi"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-secondary-black"
                >
                  Email Id.
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="saanvi@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-secondary-black"
                >
                  User Role
                </label>
                <Field
                  as="select"
                  id="role"
                  name="role"
                  className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-grey sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
              >
                Create User
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
