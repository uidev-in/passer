import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createContact } from "../../store/slice/contactSlice";

export default function CreateEmployee() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function getUserDetails(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    // it will stop the default behavior on button
    event.preventDefault();
    // console.log("Create user Details", user);
    // use dispatch here...
    dispatch(createContact(user));
    navigate("/");
  }

  return (
    <>
      <section className="bg-yellow-50 h-screen ">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <form action="#" className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-secondary-black"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="ex : Saanvi"
                name="name"
                onChange={getUserDetails}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-secondary-black"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                className="block p-3 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="ex: saanvi"
                name="username"
                onChange={getUserDetails}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-secondary-black"
              >
                Email Id.
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="saanvi@gmail.com"
                name="email"
                onChange={getUserDetails}
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-secondary-black"
              >
                User Role
              </label>
              <select
                id="role"
                name="role"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                onChange={getUserDetails}
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-grey sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
            >
              Create User
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
