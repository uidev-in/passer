import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateContactDetails,
  getContactList,
} from "../../store/slice/contactSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateContact() {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // get id from url
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

  function updateUserDetails(event) {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(updateContactDetails(currentUser));
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
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="ex : Saanvi"
                name="name"
                onChange={updateUserDetails}
                value={currentUser?.name || ""}
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
                onChange={updateUserDetails}
                value={currentUser?.username || ""}
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
                onChange={updateUserDetails}
                value={currentUser?.email || ""}
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
                onChange={updateUserDetails}
                value={currentUser?.role || ""}
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
              Update
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
