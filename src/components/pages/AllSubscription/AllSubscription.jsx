import React from "react";

import css from "./Style.module.css";

import Card from "./Card";

export default function AllSubscription({ data, deleteFn, updateMutation }) {
  const items = data?.data || [];

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
              {items.length == 0 ? (
                <h3 className={css.error_text}>Not found</h3>
              ) : (
                items.map((item, i) => (
                  <Card
                    key={i}
                    user={item}
                    deleteFn={deleteFn}
                    updateMutation={updateMutation}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
