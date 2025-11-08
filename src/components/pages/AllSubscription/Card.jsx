import React, { useState } from "react";

import css from "./Style.module.css";
import Modal from "../../Modal/Modal";

import { FaCopy } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import FormattedDate from "../../../utils/RemainingTime";
import { EditModule } from "../../../utils/EditModule/EditModule";

export default function Card({ user, deleteFn, updateMutation }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatted = (data) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    };
    return new Date(data).toLocaleDateString("en-US", options);
  };

  const handleCopy = async (value) => {
    navigator.clipboard.writeText(value);
  };

  const [moduleId, setModuleId] = useState(false);
  const [moduleName, setModuleName] = useState(false);
  const [modulePhone, setModulePhone] = useState(false);
  const [moduleVerify, setModuleVerify] = useState(false);

  const [editedValue, setEditedValue] = useState("");

  const cleanField = () => {
    if (editedValue == "") return;
    else if (moduleId || moduleName || modulePhone == true) {
      setModuleId(false);
      setModuleName(false);
      setModulePhone(false);
      setEditedValue("");
    }
  };

  return (
    <>
      <tr onClick={() => setIsOpen((prev) => !prev)}>
        <td>{user.clientId}</td>
        <td>{user.name}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td>{user.type}</td>
        <td>
          {formatted(user.startDate)} - {formatted(user.endDate)}
        </td>
        <td>{user.status}</td>
        <td>
          {user.isVerify === true ? (
            <span style={{ color: "var(--bs-green)" }}>Yes</span>
          ) : (
            <span style={{ color: "var(--bs-danger)" }}>No</span>
          )}
        </td>
        <td>{user.price}</td>
        <td>{user.method}</td>
        <td>{formatted(user.updatedAt)}</td>
      </tr>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={css.modal_item}>
          <div className={css.c1}>
            <div className={css.values_wrapper}>
              {user.clientId}
              <button
                onClick={() => handleCopy(user.clientId)}
                className={css.button}
              >
                <FaCopy />
              </button>
              <FaEdit
                onClick={() => setModuleId((prev) => !prev)}
                className={css.button}
              />
              {moduleId && (
                <EditModule
                  value={editedValue}
                  onChange={setEditedValue}
                  onSave={() => {
                    updateMutation.mutate({
                      id: user._id,
                      data: { clientId: editedValue },
                    });
                    cleanField();
                  }}
                  placeholder="Введіть значення"
                />
              )}
            </div>
            <div className={css.c1_c1}>
              <span>{user.type}</span>
              <span>{user.status}</span>
              {/* Усунути */}
              <button
                onClick={() => {
                  deleteFn.mutate(user._id);
                  setIsOpen(false);
                }}
                className="button"
              >
                <span>Усунути</span>
              </button>
            </div>
          </div>
          <div className={css.c2_modal}>
            <div className={css.ident_wrapper}>
              <h3>{user.fullName}</h3>
              {moduleName && (
                <EditModule
                  value={editedValue}
                  onChange={setEditedValue}
                  onSave={() => {
                    updateMutation.mutate({
                      id: user._id,
                      data: { fullName: editedValue },
                    });
                    cleanField();
                  }}
                  placeholder="Введіть значення"
                  style={toTopStyle}
                />
              )}
              {/* EDIT */}
              <button
                onClick={() => handleCopy(user.fullName)}
                className={css.button}
              >
                <FaCopy />
              </button>
              <FaEdit
                onClick={() => setModuleName((prev) => !prev)}
                className={css.button}
              />
              <div>
                <h4>{user.phone}</h4>
                {/* EDIT */}
                {modulePhone && (
                  <EditModule
                    value={editedValue}
                    onChange={setEditedValue}
                    onSave={() => {
                      updateMutation.mutate({
                        id: user._id,
                        data: { phone: editedValue },
                      });
                      cleanField();
                    }}
                    placeholder="Введіть значення"
                    style={toTopStyle}
                  />
                )}
                <button
                  onClick={() => handleCopy(user.phone)}
                  className={css.button}
                >
                  <FaCopy />
                </button>
                <FaEdit
                  onClick={() => setModulePhone((prev) => !prev)}
                  className={css.button}
                />
              </div>
            </div>
            <div className={css.price_wrapper}>
              <span>
                {user.price} {user.currency}
              </span>
              <span>{user.method}</span>
            </div>
            <div className={css.date_wrapper}>
              <h5>
                {formatted(user.startDate)} - {formatted(user.endDate)}
              </h5>
              <span>
                {/* EDIT */}
                {moduleVerify && (
                  <EditModule
                    value={"Верифікувати"}
                    onChange={setEditedValue}
                    onSave={() => {
                      updateMutation.mutate({
                        id: user._id,
                        data: { isVerify: true },
                      });
                      cleanField();
                    }}
                    placeholder="Введіть значення"
                    style={toTopStyle}
                  />
                )}
                {user.isVerify == false ? (
                  <span style={{ color: "red" }}>Не верифікований</span>
                ) : (
                  <span style={{ color: "green" }}>Верифікований</span>
                )}
                <FaEdit
                  onClick={() => setModuleVerify((prev) => !prev)}
                  className={css.button}
                />
              </span>
            </div>
            {user.updatedAt && (
              <div className={css.change_time_wrapper}>
                <span>Останні зміни: </span>
                <FormattedDate isoDate={user?.updatedAt}></FormattedDate>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
