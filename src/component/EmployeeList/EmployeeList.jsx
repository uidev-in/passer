import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactList } from "../../store/slice/contactSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { HiDotsVertical } from "react-icons/hi";
import { getInitialLetter } from "../../utills/global";
import OverlayLoader from "../OverlayLoader/OverlayLoader";

export default function EmployeeList() {
  const dispatch = useDispatch();
  const [contactIdToDelete, setContactIdToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const { contact_list, isLoading, searchData } = useSelector(
    (state) => state.app
  );
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getContactList());
  }, [dispatch]);

  const toggleDropdown = (id) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };

  const handleConfirmDelete = () => {
    console.log("Contact with ID deleted successfully.", contactIdToDelete);
  };

  const openDeleteModal = (contactId) => {
    setContactIdToDelete(contactId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setContactIdToDelete(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contact_list
    .filter((user) => {
      if (searchData.length === 0) {
        return user;
      } else {
        return user.name.toLowerCase().includes(searchData);
      }
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(contact_list.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      {isLoading && <OverlayLoader />} {/* Show loader when loading */}
      <div className="container mx-auto py-10">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  USER NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary-orange text-primary-grey text-center flex items-center justify-center text-lg">
                      {getInitialLetter(item.name)}
                    </div>
                    <div>{item.name}</div>
                  </th>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        type="button"
                        className="border-2 border-gray-50 text-primary-black rounded-full p-2"
                        onClick={() => toggleDropdown(item.id)}
                      >
                        <HiDotsVertical />
                      </button>

                      {dropdownOpenId === item.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <button
                            type="button"
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => navigate(`/edit/${item.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                            onClick={() => openDeleteModal(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {indexOfFirstItem + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900">
                {Math.min(indexOfLastItem, contact_list.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {contact_list.length}
              </span>{" "}
              Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-r hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

          <Modal
            open={isModalOpen}
            onClose={closeDeleteModal}
            userId={contactIdToDelete}
            confirmAction={handleConfirmDelete}
          />
        </div>
      </div>
    </>
  );
}
