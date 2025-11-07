import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./login.css";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { getLogin, fetchUser } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      await getLogin(values);
      await fetchUser();

      navigate("/dashboard");
    } catch (error) {
      return error;
    }
  };

  return (
    <main>
      <div className="form">
        <div className="form_wrapper">
          <h1 className="title">Authentication</h1>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="form_content_wrapper">
              <div className="wrapper">
                <div className="input_wrapper">
                  {/* E-MAIL */}
                  <Field
                    name="email"
                    type="text"
                    placeholder="E-mail"
                    className="input"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                {/* PASSWORD */}
                <div className="input_wrapper">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <button type="submit" className="button">
                Log In
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
}
