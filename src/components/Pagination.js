import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    const isActive = number === currentPage;
    const classNames = isActive
      ? 'bg-blue-500 text-white'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-700';
    return (
      <li
        key={number}
        className={`inline-block mx-1 px-3 py-2 rounded-lg cursor-pointer ${classNames}`}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </li>
    );
  });

  return (
    <ul className="flex justify-center mt-4">
      <li
        className={`inline-block mx-1 px-3 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700`}
        onClick={() => handlePageChange(1)}
      >
        &laquo;
      </li>
      {renderPageNumbers}
      <li
        className={`inline-block mx-1 px-3 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700`}
        onClick={() => handlePageChange(totalPages)}
      >
        &raquo;
      </li>
    </ul>
  );
};

export default Pagination;