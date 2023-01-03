import React from 'react';
import './Pagination.css';

type TPageParams = {
  itemsPerPage: number;
  currentPage: number;
  totalResults: number;
  onPageClick: (num: number) => void;
};

export function Pagination({
  itemsPerPage = 20,
  totalResults = 1000,
  onPageClick,
  currentPage,
}: TPageParams) {
  const totalPages =
    Math.ceil(totalResults / itemsPerPage) >= 500 ? 500 : Math.ceil(totalResults / itemsPerPage);

  const pageNumbers = [];

  const pages = [
    ...new Set([
      1,
      2,
      3,
      Math.max(currentPage - 1, 1),
      currentPage,
      Math.min(currentPage + 1, totalPages),
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]),
  ].sort((a, b) => a - b);

  console.log('currentPage', currentPage);
  console.log('totalPages', totalPages);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        {/*  =========== back =========== */}
        <button
          className="page-item__controls"
          disabled={currentPage === 1}
          onClick={() => {
            onPageClick(currentPage - 1);
          }}
        >
          {`❮ `}{' '}
        </button>

        {/*  =========== pages =========== */}
        {pages.map((num: number, i) => (
          <>
            {num - pages[i - 1] > 1 && <span className="pages-separator">...</span>}
            <button
              key={num}
              className={`${num === currentPage ? 'page-item_current' : 'page-item'}`}
              onClick={() => {
                onPageClick(num);
              }}
            >
              {num}
            </button>
          </>
        ))}
        {/*  =========== forward =========== */}
        <button
          disabled={currentPage === totalPages}
          className="page-item__controls"
          onClick={() => {
            onPageClick(currentPage + 1);
          }}
        >
          {`❯`}{' '}
        </button>
      </div>
    </nav>
  );
}
