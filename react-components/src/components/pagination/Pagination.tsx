import React from 'react';
import './Pagination.css';

type TPageParams = {
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  onPageClick: (num: number) => void;
  onChangeItemsPerPage: (amount: number) => void;
};

export function Pagination({
  itemsPerPage = 20,
  totalPages,
  onPageClick,
  currentPage,
  onChangeItemsPerPage,
}: TPageParams) {
  //API can't return more than 500 page
  // const totalPages = Math.floor((500 - 1) / (itemsPerPage / 20));
  // const totalPages = Math.floor((500 - 1) / (itemsPerPage / 20)) + 1;
  // const totalPages =
  //   Math.ceil(totalResults / itemsPerPage) >= 500 ? 500 : Math.ceil(totalResults / itemsPerPage);

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

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginationPages = totalPages > 3 ? pages : pageNumbers;

  return (
    <nav className="nav-pagination">
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
        {paginationPages.map((num: number, i) => (
          <React.Fragment key={num}>
            {num - paginationPages[i - 1] > 1 && <span className="pages-separator">...</span>}
            <button
              className={`${num === currentPage ? 'page-item_current' : 'page-item'}`}
              onClick={() => {
                onPageClick(num);
              }}
            >
              {num}
            </button>
          </React.Fragment>
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
      {/*  =========== numPerPage =========== */}
      <div className="pagination__per-page">
        <select
          className="items-select"
          onChange={(e) => {
            onChangeItemsPerPage(Number(e.target.value));
          }}
          value={itemsPerPage}
        >
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
          <option value="80">80</option>
          <option value="100">100</option>
        </select>
        <p className="items-label">Show per page</p>
      </div>
    </nav>
  );
}
