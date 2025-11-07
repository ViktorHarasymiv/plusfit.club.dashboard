import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMessageStore } from "../../../store/messageStore";

import clsx from "clsx";
import { ClipLoader } from "react-spinners";

import AllMessage from "./AllMessage";
import NewMessage from "./NewMessage";
import ReadMessage from "./ReadMessage";

function Message() {
  const queryClient = useQueryClient();
  const { messages, isLoading, fetchMessages, patchMessage, deleteMessage } =
    useMessageStore();

  const [tab, setTab] = useState("1");

  const tabsArray = [
    { id: "1", label: "Усі" },
    {
      id: "2",
      label: "Нові",
    },
    {
      id: "3",
      label: "Прочитані",
    },
  ];

  const unreadMessages = messages.filter((msg) => !msg.isRead);
  const readMessages = messages.filter((msg) => msg.isRead);

  useQuery({
    queryKey: ["messages"],
    queryFn: () => fetchMessages(),
    select: (data) => data.result.data,
  });

  // PATCH

  const mutation = useMutation({
    mutationFn: ({ _id, isRead }) => patchMessage(_id, { isRead }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      console.error("Помилка при оновленні задачі:", error);
    },
  });

  // DELETE

  const delete_mutation = useMutation({
    mutationFn: ({ _id, isRead }) => deleteMessage(_id, { isRead }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      console.error("Помилка при оновленні задачі:", error);
    },
  });

  // HANDLER

  const handleToggleRead = (_id, currentState) => {
    mutation.mutate({ _id, isRead: !currentState });
  };

  const handleDeleteMessage = (_id) => {
    delete_mutation.mutate({ _id });
  };

  return (
    <section className="section">
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
      <div className="section_content">
        {isLoading ? (
          <ClipLoader color="#ffffff" />
        ) : tab === "1" ? (
          <AllMessage
            data={messages}
            handleToggleRead={handleToggleRead}
            handleDeleteMessage={handleDeleteMessage}
          />
        ) : tab === "2" ? (
          <NewMessage
            data={unreadMessages}
            handleToggleRead={handleToggleRead}
            handleDeleteMessage={handleDeleteMessage}
          />
        ) : tab === "3" ? (
          <ReadMessage
            data={readMessages}
            handleToggleRead={handleToggleRead}
            handleDeleteMessage={handleDeleteMessage}
          />
        ) : null}
      </div>
    </section>
  );
}

export default Message;
