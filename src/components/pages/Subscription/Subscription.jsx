import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import clsx from "clsx";
import css from "./Subscription.module.css";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

import { ClipLoader } from "react-spinners";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  DELETE_SUBSCRIPTIONS,
  EDIT_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_PARAMS,
} from "../../../services/subscribeService";

import NewSubscription from "../NewSubscription/NewSubscription";
import AllSubscription from "../AllSubscription/AllSubscription";

export default function Subscription() {
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState({});

  const perPage = 9;

  const queryClient = useQueryClient();

  const fetchSubscriptions = async ({ queryKey }) => {
    const [_key, filter, page, perPage] = queryKey;
    return await GET_SUBSCRIPTIONS_PARAMS(filter, page, perPage);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["subscriptions", filter, page, perPage],
    queryFn: fetchSubscriptions,
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await DELETE_SUBSCRIPTIONS(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["subscriptions"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await EDIT_SUBSCRIPTIONS(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["subscriptions"]);
    },
    onError: (error) => {
      console.error("Помилка при оновленні:", error);
    },
  });

  // const useCreateSubscriber = () =>
  //   useMutation({
  //     mutationFn: async (data) => {
  //       await CREATE_SUBSCRIPTER(data);
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["subscriptions"]); // якщо хочеш оновити список
  //     },
  //     onError: (error) => {
  //       console.error("❌ Помилка при створенні:", error.message);
  //     },
  //   });

  // const createMutation = useCreateSubscriber();

  const tabsArray = [
    { id: 0, label: "Усі" },
    {
      id: 1,
      label: "Створити абонемент",
    },
  ];

  // PAGINATION

  const pageCount = data?.pagination?.totalPages || 0;

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  return (
    <section className="section">
      <div className={css.action_wrapper}>
        <div className="buttons_wrapp">
          {tabsArray.map((item, i) => {
            return (
              <button
                key={i}
                onClick={() => setTab(item.id)}
                className={clsx("tabs_button", tab === item.id && "activeTab")}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className={css.secoundary_wrapper}>
          {/* Search */}

          <FormControl>
            <Select
              onChange={(e) => setFilter({ isVerify: e.target.value })}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              MenuProps={{
                disableScrollLock: true,
              }}
            >
              <MenuItem value="">Пошук</MenuItem>
              <MenuItem value={true}>Верифікований</MenuItem>
              <MenuItem value={false}>Неверифікований</MenuItem>
            </Select>
          </FormControl>

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
        </div>
      </div>
      {isLoading ? (
        <ClipLoader color="#ffffff" className={css.spiner_wrapp} />
      ) : tab === 0 ? (
        <AllSubscription
          data={data}
          deleteFn={deleteMutation}
          updateMutation={updateMutation}
          page={page}
          setPage={setPage}
        />
      ) : tab === 1 ? (
        <NewSubscription />
      ) : null}
    </section>
  );
}
