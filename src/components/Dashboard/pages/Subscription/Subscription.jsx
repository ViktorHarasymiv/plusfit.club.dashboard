import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import clsx from "clsx";
import css from "./Subscription.module.css";

import { ClipLoader } from "react-spinners";

import {
  DELETE_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS,
  EDIT_SUBSCRIPTIONS,
} from "../../../../services/subscribeService";

import NewSubscription from "../NewSubscription/NewSubscription";
import AllSubscription from "../AllSubscription/AllSubscription";

export default function Subscription() {
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("1");

  const perPage = 9;

  const queryClient = useQueryClient();

  const fetchSubscriptions = async ({ queryKey }) => {
    const [_key, page, perPage] = queryKey;
    return await GET_SUBSCRIPTIONS(page, perPage);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["subscriptions", page, perPage],
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
    { id: "1", label: "Усі" },
    {
      id: "2",
      label: "Створити абонемент",
    },
  ];

  return (
    <div className={css.subb_route_wrapp}>
      <h1>База абонементів</h1>

      <div className={css.buttons_wrapp}>
        {tabsArray.map((item, i) => {
          return (
            <button
              key={i}
              onClick={() => setTab(item.id)}
              className={clsx(
                css.tabs_button,
                tab === item.id && css.activeTab
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className={css.content_wrapp}>
        {isLoading ? (
          <ClipLoader color="#ffffff" className={css.spiner_wrapp} />
        ) : tab === "1" ? (
          <AllSubscription
            data={data}
            deleteFn={deleteMutation}
            updateMutation={updateMutation}
            page={page}
            setPage={setPage}
          />
        ) : (
          <NewSubscription />
        )}
      </div>
    </div>
  );
}
