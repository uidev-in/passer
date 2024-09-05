import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactList,
  deleteContactDetails,
} from "../../store/slice/contactSlice";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination"; // Import Pagination component
import { HiDotsVertical } from "react-icons/hi";
import { getInitialLetter } from "../../utills/global";
import OverlayLoader from "../OverlayLoader/OverlayLoader";
import { toast } from "react-hot-toast";

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
    dispatch(deleteContactDetails(contactIdToDelete))
      .unwrap()
      .then(() => {
        toast.success("Employee deleted successfully!"); // Show success toast
        dispatch(getContactList()); // Refresh the contact list after deletion
      })
      .catch(() => {
        toast.error("Failed to delete employee. Please try again."); // Show error toast
      });
    setIsModalOpen(false);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {isLoading && <OverlayLoader />} {/* Show loader when loading */}
      <div className="max-w-screen-xl mx-auto py-10 relative">
        {" "}
        <div className="flex justify-between items-center">
          <h1 className="p-5 font-semibold text-xl">All Employees </h1>
          <Link
            to="/create"
            className="block md:hidden text-primary-black bg-primary-orange hover:bg-secondary-black hover:text-secondary-orange focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            Add User
          </Link>
        </div>
        {/* Added relative positioning */}
        <div className="relative overflow-x-auto p-2 md:p-5">
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
                <th scope="col" className="px-6 py-3" width="110px">
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
                    <div>
                      <Link
                        to={`/user/${item.id}`}
                        className="text-primary-grey hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </th>
                  <td className="px-6 py-4">{item.username}</td>
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
        </div>
        {/* Use Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={contact_list.length}
        />
        <Modal
          open={isModalOpen}
          onClose={closeDeleteModal}
          userId={contactIdToDelete}
          confirmAction={handleConfirmDelete}
        />
      </div>
    </>
  );
}
