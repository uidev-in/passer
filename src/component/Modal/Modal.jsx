import React from "react";
import { useDispatch } from "react-redux";
import { deleteContactDetails } from "../../store/slice/contactSlice";

export default function Modal({
  open,
  onClose,
  userId,
  children,
  confirmAction,
}) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    // Dispatch the action to delete the contact with the provided userId.
    dispatch(deleteContactDetails(userId));
    // Call the provided confirmAction function (if available).
    if (confirmAction) {
      confirmAction(); // Execute the confirmAction callback
    }
    // Close the modal.
    onClose();
  };

  return (
    <>
      {/* backdrop (Grey screen) */}
      <div
        onClick={onClose}
        className={`fixed inset-0  flex justify-center items-center transition-colors z-10 ${
          open ? "visible bg-black/20" : "invisible"
        }`}
      >
        {/* modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-lg shadow-md p-6 transition-all
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
        >
          <div
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/10728/10728089.png"
              className="rounded-sm hover:cursor-pointer"
              width={20}
            />
          </div>
          {/* {children} */}
          <div className="text-center w-80 mb-5]">
            <h3 className="text-2xl font-semibold text-gray-700 pb-5">
              Confirm Delete
            </h3>
            <p className="text-md text-gray-700 pb-5">
              Are you sure you want to delete this User?
            </p>
          </div>
          <div className="flex gap-4 pt-3">
            <button
              className="w-full text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 "
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
