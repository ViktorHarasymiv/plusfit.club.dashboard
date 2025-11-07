import React from "react";
import ReactPaginate from "react-paginate";

import Card from "../AllSubscription/Card";

import css from "../AllSubscription/AllSubscription.module.css";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

function NewRequestSubscription({
  data,
  deleteFn,
  updateMutation,
  page,
  setPage,
}) {
  const items = data?.result?.data || [];
  const pageCount = data?.result?.totalPages || 0;

  const filteredArrat = items.filter((verify) => verify.isVerify === false);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  return (
    <>
      <ul className={css.data_list}>
        {filteredArrat.map((item, i) => (
          <Card
            key={i}
            user={item}
            deleteFn={deleteFn}
            updateMutation={updateMutation}
          />
        ))}
      </ul>
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

export default NewRequestSubscription;
