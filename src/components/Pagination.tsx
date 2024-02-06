import React from "react";

const Pagination = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
}: {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: any;
}) => {
  const pageNumbers = Array.from(Array(numberOfPages + 1).keys()).slice(1);

  const goToNextPage = () => {
    if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav className="mt-3 mb-5 mx-5">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a className="page-link" onClick={goToPreviousPage} href="#">
            &laquo;
          </a>
        </li>
        {pageNumbers.map((pageNb) => (
          <li
            key={pageNb}
            className={`page-item ${currentPage === pageNb ? "active" : ""} `}
          >
            <a
              onClick={() => setCurrentPage(pageNb)}
              className="page-link"
              href="#"
            >
              {pageNb}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""}`}>
          <a className="page-link" onClick={goToNextPage} href="#">
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
