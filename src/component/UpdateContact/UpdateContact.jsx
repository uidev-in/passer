import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateContactDetails,
  getContactList,
} from "../../store/slice/contactSlice";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

// Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full Name is required")
    .min(2, "Name must be at least 2 characters"),
  username: Yup.string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  role: Yup.string().required("Role is required"),
});

export default function UpdateContact() {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Get id from URL
  const { id } = useParams();
  const { contact_list } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      dispatch(getContactList()); // Fetch contact list
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (contact_list.length > 0 && id) {
      const user = contact_list.find((person) => person.id === id);
      setCurrentUser(user || {});
    }
  }, [contact_list, id]);

  // Form submission handler
  function handleSubmit(values, { setSubmitting }) {
    dispatch(updateContactDetails(values));
    setSubmitting(false);
    navigate("/");
  }

  if (!currentUser) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <>
      <section className="bg-yellow-50 h-screen ">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <Formik
            initialValues={currentUser}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
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
                    className="block p-3 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
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
                  Update
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}
