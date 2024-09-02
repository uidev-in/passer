import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactList,
  deleteContactDetails,
} from "../../store/slice/contactSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  BiLogoGmail,
  BiCreditCardFront,
  BiSolidUserPin,
  BiEditAlt,
  BiSolidTrash,
} from "react-icons/bi";
import Modal from "../Modal/Modal";
import { getInitialLetter } from "../../utills/global";
import { toast } from "react-hot-toast";

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
    if (contactIdToDelete) {
      try {
        // Perform the delete action
        await dispatch(deleteContactDetails(contactIdToDelete)).unwrap();

        // Show success toast
        toast.success("Employee deleted successfully!");

        // Close the modal and navigate to the home page
        closeDeleteModal();
        navigate("/employee"); // Redirect to home after deletion
      } catch (error) {
        console.error("Failed to delete Employee: ", error);

        // Show error toast
        toast.error("Failed to delete Employee. Please try again.");
      }
    }
  };

  return (
    <>
      {currentUser ? (
        <div className="my-10 flex justify-center items-center min-h-fit">
          <div className="bg-yellow-50 rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex flex-col items-center py-4">
              <div className="w-20 h-20 rounded-full bg-secondary-orange font-semibold text-primary-black text-center flex items-center justify-center text-3xl">
                {getInitialLetter(currentUser.name)}
              </div>
              <h3 className="my-2 text-2xl font-semibold text-gray-800">
                {currentUser.name}
              </h3>

              <div className="p-2 grid grid-cols-1 gap-4 mt-1 text-gray-600 text-sm">
                <div className="flex items-center text-lg">
                  <BiLogoGmail className="text-gray-500 mr-2" />
                  <span>{currentUser.email}</span>
                </div>

                <div className="flex items-center text-lg">
                  <BiSolidUserPin className="text-gray-500 mr-2" />
                  <span>{currentUser.username}</span>
                </div>
                <div className="flex items-center text-lg">
                  <BiCreditCardFront className="text-gray-500 mr-2" />
                  <span>{currentUser.id}</span>
                </div>
              </div>

              <div className="flex mt-4 space-x-3">
                <Link
                  to={`/edit/${currentUser.id}`}
                  className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  <BiEditAlt className="inline-block mr-1" />
                  Edit
                </Link>
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
