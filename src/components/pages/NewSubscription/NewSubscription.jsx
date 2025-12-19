import { useMemo, useState } from "react";

// MEDIA

import style from "../../../styles/Form.module.css";
import { IoMdRefresh } from "react-icons/io";

/* FORMIK */

import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/* MUI DATA */

import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

// API

import { CREATE_SUBSCRIPTER } from "../../../services/subscribeService";
import { calculateAge } from "../../../utils/calculateAge";

export default function NewSubscription() {
  // STATE

  const [price, setPrice] = useState(0);

  // CONSTANT

  let age = 0;

  const today = dayjs();

  const maxDate = today.subtract(0, "year"); // наймолодший допустимий вік
  const minDate = today.subtract(70, "year"); // найстарший допустимий вік

  const maxDateStart = today.subtract(0, "year"); // наймолодший допустимий вік
  const minDateEnd = today.subtract(-5, "year"); // найстарший допустимий вік

  // DATA UTILS

  const FormikDatePickerBirthday = () => {
    const { values, setFieldValue } = useFormikContext();

    age = useMemo(() => {
      if (!values.birthday) return null;
      return calculateAge(values.birthday);
    }, [values.birthday]);

    const handleChange = (newValue) => {
      if (newValue && newValue.isValid()) {
        const iso = newValue.toISOString();
        setFieldValue("birthday", iso);
      }
    };

    return (
      <DesktopDatePicker
        label="Enter value"
        minDate={minDate}
        maxDate={maxDate}
        onChange={handleChange}
        slotProps={{
          textField: {
            sx: {
              ".MuiPickersSectionList-root": {
                padding: "8px 10px",
              },

              ".MuiPickersOutlinedInput-root": {
                color: "#6c757d",
              },

              ".MuiPickersOutlinedInput-notchedOutline": {
                borderRadius: "var(--bs-border-radius)",
                borderColor: "#50596a",
              },

              "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "#91c4d7 !important",
                boxShadow: "0 0 0 0.25rem rgba(35, 137, 174, 0.25)",
                outline: "0",
              },

              "&:hover .MuiPickersOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "#6c757d !important",
              },
            },
          },
        }}
      />
    );
  };

  const FormikDatePickerStart = () => {
    const { setFieldValue } = useFormikContext();

    return (
      <DesktopDatePicker
        label="Enter value"
        minDate={maxDateStart}
        maxDate={minDateEnd}
        onChange={(newValue) =>
          setFieldValue("startDate", newValue.toISOString())
        }
        slotProps={{
          textField: {
            sx: {
              ".MuiPickersSectionList-root": {
                padding: "8px 10px",
              },

              ".MuiPickersOutlinedInput-root": {
                color: "#6c757d",
              },

              ".MuiPickersOutlinedInput-notchedOutline": {
                borderRadius: "var(--bs-border-radius)",
                borderColor: "#50596a",
              },

              "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "#91c4d7 !important",
                boxShadow: "0 0 0 0.25rem rgba(35, 137, 174, 0.25)",
                outline: "0",
              },

              "&:hover .MuiPickersOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "#6c757d !important",
              },
            },
          },
        }}
      />
    );
  };

  // UTILS

  function generateCustomId() {
    const prefix = "CL";
    const chars = "0123456789";
    let randomPart = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomPart += chars[randomIndex];
    }

    return prefix + randomPart;
  }

  function getSubscriptionDetails(type) {
    switch (type) {
      case "Basic":
        return 59;
      case "Standart":
        return 99;
      case "Premium":
        return 156;
      case "Vip":
        return 399;
      default:
        return 59;
    }
  }

  // VALIDATION

  const initialValues = {
    clientId: generateCustomId(),
    name: "",
    birthday: "",
    phone: "",
    email: "",
    type: "",
    status: "",
    startDate: "",
    endDate: "",
    price: 0,
    currency: "$",
    method: "",
  };

  const validationSchema = Yup.object({
    clientId: Yup.string()
      .matches(/^.{8}$/, "Має бути рівно 8 символів")
      .matches(/^CL\d{6}$/, 'Має починатися з "CL" і містити 6 цифр')
      .required("Обов'язково"),

    name: Yup.string()
      .matches(
        /^[А-Яа-яЁёІіЇїЄєҐґA-Za-z]+ [А-Яа-яЁёІіЇїЄєҐґA-Za-z]+$/,
        "Ім’я має містити прізвище та ім’я через пробіл"
      )
      .required("Ім’я обов’язкове"),
    birthday: Yup.date().required("Дата народження обов’язкова"),
    phone: Yup.string()
      .matches(/^\+380\d{9}$/, "Телефон має бути у форматі +380XXXXXXXXX")
      .required("Телефон обов’язковий"),

    email: Yup.string()
      .email("Невірний email")
      .matches(/@gmail\.com$/, "Email має бути @gmail.com")
      .required("Обов’язково"),

    type: Yup.string().required("Тип обов’язковий"),
    status: Yup.string().required("Статус обов’язковий"),

    startDate: Yup.date().required("Дата початку обов’язкова"),

    endDate: Yup.date()
      .min(
        Yup.ref("startDate"),
        "Дата завершення має бути пізніше за дату початку"
      )
      .required("Дата завершення обов’язкова"),

    price: Yup.number()
      .typeError("Ціна має бути числом")
      .min(0, "Ціна не може бути відʼємною")
      .required("Ціна обов’язкова"),

    method: Yup.string().required("Метод оплати обов’язковий"),
    currency: Yup.string().required("Валюта обов’язкова"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await CREATE_SUBSCRIPTER(values);
          resetForm();
          alert("Успішно додано абонемент");
        } catch (error) {
          const message = error?.message;
          alert(message);
        }
      }}
    >
      {({ values, touched, errors, handleChange, setFieldValue }) => (
        <Form>
          <div className={style.form_block}>
            {/* Дані клієнта */}

            <section className={style.form_section}>
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <label htmlFor="name" className={style.label}>
                    <h4>Full name</h4>
                  </label>
                  <Field
                    name="name"
                    placeholder="Enter value"
                    className={`${style.input} ${
                      errors.name && touched.name ? style.error_input : ""
                    }`}
                  />
                </div>
              </div>
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <label htmlFor="phone" className={style.label}>
                    <h4>Phone number</h4>
                  </label>
                  <Field
                    name="phone"
                    placeholder="Enter value"
                    className={`${style.input} ${
                      errors.phone && touched.phone ? style.error_input : ""
                    }`}
                  />
                </div>
              </div>
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <label htmlFor="email" className={style.label}>
                    <h4>Email</h4>
                  </label>
                  <Field
                    name="email"
                    placeholder="Enter value"
                    className={`${style.input} ${
                      errors.email && touched.email ? style.error_input : ""
                    }`}
                  />
                </div>
              </div>
              <div className={style.input_tile}>
                <label htmlFor="birthday" className={style.label}>
                  <h4>Birthday date</h4>
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormikDatePickerBirthday />
                </LocalizationProvider>
              </div>
            </section>

            {/* Тип підписки */}

            <section className={style.form_section}>
              {/* Айді */}

              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <label htmlFor="clientId" className={style.label}>
                    <h4>Subscriber ID</h4>
                  </label>
                  <div className={style.relative_box}>
                    <Field
                      name="clientId"
                      placeholder="ID клієнта"
                      className={style.input}
                      disabled
                    />
                    <IoMdRefresh
                      className={style.svg}
                      onClick={() => {
                        const newId = generateCustomId();
                        setFieldValue("clientId", newId);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Тип */}

              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <div className={style.input_wrapper}>
                    <label htmlFor="type" className={style.label}>
                      <h4>Subscriber type</h4>
                    </label>
                    <FormControl sx={{ width: "100%", margin: "0px" }}>
                      <Select
                        name="type"
                        value={values.type}
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue(
                            "price",
                            setPrice(getSubscriptionDetails(e.target.value)),
                            getSubscriptionDetails(e.target.value)
                          );
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                      >
                        <MenuItem value="">
                          <em>Type</em>
                        </MenuItem>
                        <MenuItem value={"Basic"}>Basic</MenuItem>
                        <MenuItem value={"Standart"}>Standart</MenuItem>
                        <MenuItem value={"Premium"}>Premium</MenuItem>
                        <MenuItem value={"Vip"}>Vip</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              {/* Статус */}

              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <div className={style.input_wrapper}>
                    <label htmlFor="status" className={style.label}>
                      <h4>Subscriber Status</h4>
                    </label>
                    <FormControl sx={{ width: "100%", margin: "0px" }}>
                      <Select
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                      >
                        <MenuItem value="">
                          <em>Status</em>
                        </MenuItem>
                        <MenuItem value={"Active"}>Active</MenuItem>
                        <MenuItem value={"Finished"}>Finished</MenuItem>
                        <MenuItem value={"Frozen"}>Frozen</MenuItem>
                        <MenuItem value={"Wait for paid"}>
                          Wait for paid
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </section>

            {/* Початкова дата */}

            <section className={style.form_section}>
              {/* Початкова дата */}
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <div className={style.input_wrapper}>
                    <label htmlFor="startDate" className={style.label}>
                      <h4>Start subscription date</h4>
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <FormikDatePickerStart />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              {/* Метод оплати  */}
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <div className={style.input_wrapper}>
                    <label htmlFor="method" className={style.label}>
                      <h4>Payment</h4>
                    </label>
                    <FormControl sx={{ m: 1, width: 226, margin: "0px" }}>
                      <Select
                        name="method"
                        value={values.method}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                          <em>Method</em>
                        </MenuItem>
                        <MenuItem value={"Cash"}>Cash</MenuItem>
                        <MenuItem value={"Card"}>Card</MenuItem>
                        <MenuItem value={"Transfer"}>Transfer</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </section>

            {/* Відправити */}

            <section className={style.form_section}>
              <div className={style.finally_block}>
                <button type="submit" className={style.button}>
                  Add subscription
                </button>
                {price > 0 && (
                  <div className={style.price_value}>
                    <span>Price: {price}</span>
                    <span>{values.currency}</span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </Form>
      )}
    </Formik>
  );
}
