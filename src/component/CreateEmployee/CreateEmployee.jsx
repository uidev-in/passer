import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactList } from "../../store/slice/contactSlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  BiLogoGmail,
  BiCreditCardFront,
  BiSolidUserPin,
  BiEditAlt,
  BiSolidTrash,
} from "react-icons/bi";
import Modal from "../Modal/Modal";

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contactIdToDelete, setContactIdToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the user ID from the URL
  const { id } = useParams();
  const { contact_list } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      // Fetch the contact list if not already loaded
      if (contact_list.length === 0) {
        dispatch(getContactList());
      } else {
        // Ensure ID is compared as a string
        const user = contact_list.find((person) => person.id === id);
        setCurrentUser(user);
      }
    }
  }, [id, contact_list, dispatch]);

  const openDeleteModal = (contactId) => {
    setContactIdToDelete(contactId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setContactIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    // Replace with actual delete logic, e.g., dispatch a delete action
    console.log("Contact with ID deleted successfully.", contactIdToDelete);

    closeDeleteModal();
    navigate("/"); // Redirect to home after deletion
  };

  const handleEditClick = () => {
    navigate(`/edit/${id}`); // Navigate to edit page with the current user ID
  };

  return (
    <>
      {currentUser ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex flex-col items-center py-4">
              <img
                className="mb-3 w-24 h-24 rounded-full border-4 border-gray-200 shadow-md"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt={currentUser.name}
              />
              <h3 className="mb-1 text-xl font-semibold text-gray-800">
                {currentUser.name}
              </h3>

              <div className="p-4 grid grid-cols-1 gap-4 mt-3 text-gray-600 text-sm">
                <div className="flex items-center">
                  <BiLogoGmail className="text-gray-500 mr-2" />
                  <span>{currentUser.email}</span>
                </div>
                <div className="flex items-center">
                  <BiCreditCardFront className="text-gray-500 mr-2" />
                  <span>emp_{currentUser.id}</span>
                </div>
                <div className="flex items-center">
                  <BiSolidUserPin className="text-gray-500 mr-2" />
                  <span>{currentUser.username}</span>
                </div>
              </div>

              <div className="flex mt-4 space-x-3">
                <button
                  onClick={handleEditClick}
                  className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  <BiEditAlt className="inline-block mr-1" />
                  Edit
                </button>
                <button
                  type="button"
                  className="py-2 px-4 text-sm font-medium text-center text-white bg-red-600 rounded-lg shadow hover:bg-red-700 transition duration-300 ease-in-out"
                  onClick={() => openDeleteModal(currentUser.id)}
                >
                  <BiSolidTrash className="inline-block mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading user details...</p>
      )}

      <Modal
        open={isModalOpen}
        onClose={closeDeleteModal}
        userId={contactIdToDelete}
        confirmAction={handleConfirmDelete}
      />
    </>
  );
}
