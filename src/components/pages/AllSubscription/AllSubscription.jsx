import React from "react";
import ReactPaginate from "react-paginate";

import css from "./Style.module.css";

import Card from "./Card";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

export default function AllSubscription({
  data,
  page,
  setPage,
  deleteFn,
  updateMutation,
}) {
  const items = data?.result?.data || [];
  const pageCount = data?.result?.totalPages || 0;

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.table_outer}>
          <table className={css.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Verify</th>
                <th>Pay</th>
                <th>Method</th>
                <th>Last Change</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <Card
                  key={i}
                  user={item}
                  deleteFn={deleteFn}
                  updateMutation={updateMutation}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {pageCount > 0 && (
        <ReactPaginate
          className={css.pagination}
          breakLabel="..."
          activeClassName={css.active}
          nextLabel={<FaArrowRightLong />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          forcePage={page - 1}
          previousLabel={<FaArrowLeftLong />}
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
}
