import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import css from "./Style.module.css";
import style from "../../styles/Form.module.css";

import { useAuth } from "../../context/AuthContext";
import { useAuthModalStore } from "../../store/useAuthModalStore";

export default function Login() {
  const navigate = useNavigate();
  const { getLogin, fetchUser } = useAuth();
  const { changeSign } = useAuthModalStore();

  const initialValues = {
    email: "",
    password: "",
  };

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
    /* LOGIN */
  }
  return (
    <div className={css.form_wrapper}>
      <h4 className={css.title}>Welcome back,</h4>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form_content_wrapper}>
          <div className="">
            {/* E-MAIL */}
            <div className="input_wrapper">
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
            <div className="input_wrapper">
              <label htmlFor="password" className={style.label}>
                Password <span>*</span>
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Enter password"
                className={style.input}
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {/* Forgot password */}
            <div>
              <button type="button" className={style.helper_button}>
                Forgot password?
              </button>
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
              Not registered? Signup
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
