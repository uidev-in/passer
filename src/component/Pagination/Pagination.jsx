import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) {
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

  const nextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 text-sm font-medium ${
            i === currentPage
              ? "text-white bg-gray-800"
              : "text-gray-700 bg-white hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-semibold text-gray-900">{indexOfFirstItem}</span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900">{indexOfLastItem}</span>{" "}
        of <span className="font-semibold text-gray-900">{totalItems}</span>{" "}
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
        {renderPageNumbers()}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-r hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
