import React, { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ totalPages, sizePage, onSelectedPage, currentPage, portionSize = 10 }) => {
  let countPage = Math.ceil(totalPages / sizePage);

  let pages = [];
  for (let i = 1; i <= countPage; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(countPage / portionSize);
  let { portionNumber, setPortionNumber } = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          Prev
        </button>
      )}
      {pages
        .filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
        .map((page) => {
          return (
            <div className={styles.listOfPages}>
              <span
                key={page}
                onClick={(e) => {
                  onSelectedPage(page);
                }}
                className={currentPage === page ? styles.selectedPage : ""}
              >
                {page}
              </span>
            </div>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
