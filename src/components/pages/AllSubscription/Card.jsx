import React, { useState } from "react";

import css from "./Style.module.css";
import Modal from "../../Modal/Modal";

import { FaCopy } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import { MdDeleteOutline } from "react-icons/md";

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
    return new Date(data).toLocaleDateString("uk-UA", options);
  };

  const handleCopy = async (value) => {
    navigator.clipboard.writeText(value);
  };

  const [moduleId, setModuleId] = useState(false);
  const [moduleName, setModuleName] = useState(false);
  const [moduleEmail, setModuleEmail] = useState(false);
  const [modulePhone, setModulePhone] = useState(false);
  const [moduleStatus, setModuleStatus] = useState(false);
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
        <td>{formatted(user.createdAt)}</td>
      </tr>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={css.modal_item}>
          {/* TOP */}
          <div className={css.c1}>
            {/* TOP LEFT */}
            <div className={css.c1_c1}>
              {/* SUBSCRIBE INFO */}
              <div className={`${css.value_tile} ${css.reverse}`}>
                <h4
                  onClick={() => handleCopy(user.clientId)}
                  className={css.copy_title}
                >
                  #{user.clientId}
                </h4>
                {/* EDIT */}
                <button
                  onClick={() => setModuleId((prev) => !prev)}
                  className={css.button}
                >
                  <FaEdit />
                </button>
                {/* MODULE */}
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
                    placeholder="Нове значення"
                    close={setModuleId}
                  />
                )}
              </div>
              {/* VERIFY */}
              <div className={`${css.value_tile} ${css.reverse}`}>
                {user.isVerify == false ? (
                  <h4 style={{ color: "var(--bs-danger)" }}>
                    Не верифікований
                  </h4>
                ) : (
                  <h4 style={{ color: "var(--bs-green)" }}>Верифікований</h4>
                )}

                {/* EDIT MODULE */}
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
                    close={setModuleVerify}
                    placeholder="Введіть значення"
                  />
                )}

                {/* EDIT */}
                <button
                  onClick={() => setModuleVerify((prev) => !prev)}
                  className={css.button}
                >
                  <FaEdit />
                </button>
              </div>
              {/* STATUS */}
              <div className={`${css.value_tile} ${css.reverse}`}>
                {/* VALUE */}
                <h4>{user.status}</h4>

                {/* EDIT */}
                <button
                  onClick={() => setModuleStatus((prev) => !prev)}
                  className={css.button}
                >
                  <FaEdit />
                </button>

                {/* EDIT MODULE */}
                {moduleStatus && (
                  <EditModule
                    value={"Активний"}
                    onChange={setEditedValue}
                    onSave={() => {
                      updateMutation.mutate({
                        id: user._id,
                        data: { status: "Активний" },
                      });
                      cleanField();
                    }}
                    close={setModuleStatus}
                    placeholder="Введіть значення"
                  />
                )}
              </div>
            </div>

            {/* TOP RIGHT */}
            <div className={css.c1_c1}>
              <div className={`${css.value_tile} ${css.reverse}`}>
                {/* TYPE & DATE */}
                <h4>{user.type}</h4>
                <h4 className={css.date_wrapper}>
                  {formatted(user.startDate)} - {formatted(user.endDate)}
                </h4>
              </div>
              {/* PRICE & PAYMENT */}
              <div className={css.tile_wrapper}>
                <p>{user.method}</p>
                <p>{user.price} UAH</p>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div className={css.c1}>
            {/* BOTTOM LEFT */}
            <div className={css.c1_c2}>
              {/* NAME */}
              <div className={css.value_tile}>
                {/* VALUE */}
                <h4
                  onClick={() => handleCopy(user.name)}
                  className={css.copy_title}
                >
                  {user.name}
                </h4>
                {/* EDIT */}
                <button
                  onClick={() => setModuleName((prev) => !prev)}
                  className={css.button}
                >
                  <FaEdit />
                </button>
                {/* MODULE */}
                {moduleName && (
                  <EditModule
                    value={editedValue}
                    onChange={setEditedValue}
                    onSave={() => {
                      updateMutation.mutate({
                        id: user._id,
                        data: { name: editedValue },
                      });
                      cleanField();
                    }}
                    placeholder="Введіть значення"
                    close={setModuleName}
                    bottom={true}
                  />
                )}
              </div>
              {/* MAIL */}
              <div className={css.value_tile}>
                <h4
                  onClick={() => handleCopy(user.email)}
                  className={css.copy_title}
                >
                  {user.email}
                </h4>
                {/* EDIT MODULE */}
                {moduleEmail && (
                  <EditModule
                    value={editedValue}
                    onChange={setEditedValue}
                    onSave={() => {
                      updateMutation.mutate({
                        id: user._id,
                        data: { email: email },
                      });
                      cleanField();
                    }}
                    placeholder="Нове значення"
                    bottom={true}
                    close={setModuleEmail}
                  />
                )}
                {/* EDIT */}
                <button
                  onClick={() => setModuleEmail((prev) => !prev)}
                  className={css.button}
                >
                  <FaEdit />
                </button>
              </div>
              {/* PHONE */}
              <div className={css.value_tile}>
                <h4
                  onClick={() => handleCopy(user.phone)}
                  className={css.copy_title}
                >
                  {user.phone}
                </h4>
                {/* EDIT MODULE */}
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
                    placeholder="Нове значення"
                    close={setModulePhone}
                    bottom={true}
                  />
                )}
                {/* EDIT */}
                <button
                  onClick={() => setModulePhone((prev) => !prev)}
                  className={css.button}
                >
                  <FaEdit />
                </button>
              </div>
            </div>

            {/* BOTTOM RIGHT */}
            <div className={css.c1_c2}>
              {/* UPLOAD */}
              {user.updatedAt && (
                <div className={`${css.value_tile} ${css.tile_wrapper}`}>
                  <span>Оновлення</span>
                  <FormattedDate isoDate={user?.updatedAt}></FormattedDate>
                </div>
              )}
              {/* DELETE */}
              <button
                onClick={() => {
                  deleteFn.mutate(user._id);
                  setIsOpen(false);
                }}
                className={css.delete_button}
              >
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
