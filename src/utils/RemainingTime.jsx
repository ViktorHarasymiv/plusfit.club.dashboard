import React from "react";

const FormattedDate = ({ isoDate }) => {
  const date = new Date(isoDate);

  const formattedDate = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Warsaw",
  }).format(date);

  const formattedTime = new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Warsaw",
    hour12: false,
  }).format(date);

  return (
    <span style={{ fontSize: "14px" }}>
      {formattedDate} {formattedTime}
    </span>
  );
};

// Використання

export default FormattedDate;
