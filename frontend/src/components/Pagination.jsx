// import React from "react";
// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaAngleDoubleLeft,
//   FaAngleDoubleRight,
// } from "react-icons/fa";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="flex justify-center mt-8">
//       {/* First Page */}
//       <button
//         onClick={() => onPageChange(1)}
//         disabled={currentPage === 1}
//         className="px-3 py-2 text-gray-400 rounded-md mr-2"
//       >
//         <FaAngleDoubleLeft />
//       </button>
//       {/* Previous Page */}
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-3 py-2 text-gray-400 rounded-md mr-2"
//       >
//         <FaArrowLeft />
//       </button>
//       {/* Page Numbers */}
//       {pageNumbers.map((number) => (
//         <button
//           key={number}
//           onClick={() => onPageChange(number)}
//           className={`px-3 mx-1 rounded-lg text-xs ${
//             number === currentPage
//               ? "bg-purple-500 text-white"
//               : "bg-gray-100 text-gray-700"
//           }`}
//         >
//           {number}
//         </button>
//       ))}
//       {/* Next Page */}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-3 py-2 text-gray-400 rounded-md ml-2"
//       >
//         <FaArrowRight />
//       </button>
//       {/* Last Page */}
//       <button
//         onClick={() => onPageChange(totalPages)}
//         disabled={currentPage === totalPages}
//         className="px-3 py-2 text-gray-400 rounded-md ml-2"
//       >
//         <FaAngleDoubleRight />
//       </button>
//     </div>
//   );
// };

// export default Pagination;

import React from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Determine which page numbers to show
  const getPageNumbersToShow = () => {
    const numbers = [];

    if (totalPages <= 3) {
      // Show all pages if total is 3 or fewer
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      // Show pages around the current page
      if (currentPage > 1) numbers.push(currentPage - 1);
      numbers.push(currentPage);
      if (currentPage < totalPages) numbers.push(currentPage + 1);

      // Add ... if there are more pages before or after the range
      if (currentPage > 2) numbers.unshift("...");
      if (currentPage < totalPages - 1) numbers.push("...");
    }

    return numbers;
  };

  const pagesToShow = getPageNumbersToShow();

  return (
    <div className="flex justify-center mt-8">
      {/* First Page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-gray-400 rounded-md mr-2"
      >
        <FaAngleDoubleLeft />
      </button>

      {/* Page Numbers */}
      {pagesToShow.map((number, index) => (
        <React.Fragment key={index}>
          {number === "..." ? (
            <span className="px-3 py-2 text-gray-400">...</span>
          ) : (
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 mx-1 rounded-lg text-xs ${
                number === currentPage
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {number}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Last Page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-gray-400 rounded-md ml-2"
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
