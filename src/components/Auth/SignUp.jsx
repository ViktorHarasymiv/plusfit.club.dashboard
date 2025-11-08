import React from "react";

import { useNavigate } from "react-router-dom";

/* FORMIK */

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// STYLE

import css from "./Style.module.css";
import style from "../../styles/Form.module.css";

// STORE

import { useAuth } from "../../context/AuthContext";
import { useAuthModalStore } from "../../store/useAuthModalStore";

// BODY

export default function SignUp() {
  const navigate = useNavigate();

  const { getLogin, fetchUser } = useAuth();
  const { changeSign } = useAuthModalStore();

  const initialValues = {
    name: "",
    sex: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    clientId: Yup.string()
      .matches(/^.{8}$/, "Має бути рівно 8 символів")
      .matches(/^CL\d{6}$/, 'Має починатися з "CL" і містити 6 цифр')
      .required("Обов'язково"),

    fullName: Yup.string()
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

  const handleSubmit = async (values) => {
    try {
      await getLogin(values);
      await fetchUser();

      navigate("/dashboard/info");
    } catch (error) {
      return error;
    }
  };

  {
    /* Sign Up */
  }
  return (
    <div className={css.form_wrapper}>
      <h4 className={css.title}>Signup</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className={css.form_content_wrapper}>
            <div className={css.input_wrapper}>
              {/* NAME */}

              <div className="">
                <label htmlFor="name" className={style.label}>
                  Name <span>*</span>
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className={style.input}
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              {/* SEX */}

              <div className="">
                <label htmlFor="sex" className={style.label}>
                  Sex <span>*</span>
                </label>
                <FormControl sx={{ width: "100%", margin: "0px" }}>
                  <Select
                    name="sex"
                    value={values.sex}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em>Enter your sex</em>
                    </MenuItem>
                    <MenuItem value={"Чоловік"}>Чоловік</MenuItem>
                    <MenuItem value={"Жінка"}>Жінка</MenuItem>
                  </Select>
                </FormControl>
                <ErrorMessage name="sex" component="div" className="error" />
              </div>

              {/* E-MAIL */}

              <div className="">
                <label htmlFor="email" className={style.label}>
                  Email <span>*</span>
                </label>
                <Field
                  name="email"
                  type="text"
                  placeholder="E-mail"
                  className={style.input}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              {/* PASSWORD */}
              <div className="">
                <label htmlFor="password" className={style.label}>
                  Password <span>*</span>
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className={style.input}
                />
                <span className={style.helper_text}>
                  Your password must be 8-20 characters long.
                </span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className={css.action_wrapper}>
              <button type="submit" className={style.button}>
                Login
              </button>
              <button
                onClick={changeSign}
                type="button"
                className={`${style.button} ${style.secondary}`}
              >
                Already have an account? Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
