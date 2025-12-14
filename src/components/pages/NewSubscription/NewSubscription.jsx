import { useMemo } from "react";

// MEDIA

import style from "../../../styles/Form.module.css";
import { IoMdRefresh } from "react-icons/io";

/* FORMIK */

import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
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
        label="Дата народження"
        minDate={minDate}
        maxDate={maxDate}
        onChange={handleChange}
      />
    );
  };

  const FormikDatePickerStart = () => {
    const { setFieldValue } = useFormikContext();

    return (
      <DesktopDatePicker
        label="Дата початку"
        minDate={maxDateStart}
        maxDate={minDateEnd}
        onChange={(newValue) =>
          setFieldValue("startDate", newValue.toISOString())
        }
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
      case "1 тренування":
        return "200";

      case "10 тренувань":
        return "1800";

      case "Місяць безліміт":
        return "1200";

      case "Три місяці безліміт":
        return "3200";

      case "Тариф сімейний 1 + 1":
        return "2000";

      case "Підлітковий 13–17 р.":
        return "900";

      case "Респект +55 р.":
        return "800";

      default:
        return "0";
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
    price: "",
    currency: "UAH",
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
                    <h4>Прізвище Ім'я</h4>
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
                    <h4>Номер телефону</h4>
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
                    <h4>Пошта</h4>
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormikDatePickerBirthday />
                </LocalizationProvider>

                <ErrorMessage
                  name="birthday"
                  component="div"
                  className="error"
                />
              </div>
            </section>

            {/* Тип підписки */}
            <section className={style.form_section}>
              {/* Айді */}
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <label htmlFor="clientId" className={style.label}>
                    <h4>ID підписки</h4>
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
                      <h4>Тип підписки</h4>
                    </label>
                    <FormControl sx={{ width: "100%", margin: "0px" }}>
                      <Select
                        name="type"
                        value={values.type}
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue(
                            "price",
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
                          <em>Check type</em>
                        </MenuItem>
                        <MenuItem value={"1 тренування"}>1 тренування</MenuItem>
                        <MenuItem value={"10 тренувань"}>10 тренувань</MenuItem>
                        <MenuItem value={"Місяць безліміт"}>
                          Місяць безліміт
                        </MenuItem>
                        <MenuItem value={"Три місяці безліміт"}>
                          Три місяці безліміт
                        </MenuItem>
                        <MenuItem value={"Тариф сімейний 1 + 1"}>
                          Тариф сімейний 1 + 1
                        </MenuItem>

                        <MenuItem
                          value={"Підлітковий 13–17 р."}
                          disabled={age > 17 || 13 > age}
                        >
                          Підлітковий 13-17 р.
                        </MenuItem>
                        <MenuItem value={"Респект +55 р."} disabled={age < 55}>
                          "Респект" +55 р.
                        </MenuItem>
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
                      <h4>Статус підписки</h4>
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
                          <em>Статус</em>
                        </MenuItem>
                        <MenuItem value={"Активний"}>Активний</MenuItem>
                        <MenuItem value={"Завершений"}>Завершений</MenuItem>
                        <MenuItem value={"Заморожений"}>Заморожений</MenuItem>
                        <MenuItem value={"Очікує оплати"}>
                          Очікує оплати
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Початкова дата */}

            <section className={style.form_section}>
              {/* Початкова дата */}
              <div className="date_wrapper">
                <div className="input_wrapper">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormikDatePickerStart />
                  </LocalizationProvider>

                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              {/* Метод оплати  */}
              <div className="input_wrapper">
                <div className="input_wrapper">
                  <FormControl sx={{ m: 1, width: 226, margin: "0px" }}>
                    <Select
                      name="method"
                      value={values.method}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      sx={{
                        backgroundColor: "transparent",
                        color: "rgba(255, 255, 255, 0.8)",

                        padding: "12px 0",
                        width: "226px",
                        height: "49.5px",

                        fontSize: "14px",

                        borderRadius: "0",
                        "& .MuiSelect-icon": {
                          color: " rgba(255, 255, 255, 0.8)",
                        },
                        "&.Mui-focused .MuiSelect-icon": {
                          color: " rgba(255, 255, 255, 0.8)",
                        },

                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255, 255, 255, 1)", // яскравіше при ховері
                        },
                        ".MuiOutlinedInput-notchedOutline": {
                          borderRadius: "6px",
                          borderColor: " rgba(255, 255, 255, 0.8)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderWidth: "1px",
                          borderColor: "rgba(255, 255, 255, 0.8);",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Метод оплати</em>
                      </MenuItem>
                      <MenuItem value={"Готівка"}>Готівка</MenuItem>
                      <MenuItem value={"Картка"}>Картка</MenuItem>
                    </Select>
                  </FormControl>
                  <ErrorMessage
                    name="method"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
            </section>

            {/* Відправити */}
            <section className={style.form_section}>
              <div className="finally_block">
                <div className="price_value">
                  <span>Сумма: {values.price}</span>
                  <span>{values.currency}</span>
                </div>
                <button type="submit" className={style.button}>
                  Додати абонемент
                </button>
              </div>
            </section>
          </div>
        </Form>
      )}
    </Formik>
  );
}
