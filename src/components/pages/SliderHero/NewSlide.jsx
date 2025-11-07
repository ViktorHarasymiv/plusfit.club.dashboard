import React from "react";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./Style.module.css";
import { IoMdClose } from "react-icons/io";

import WrapperPicker from "./WrapperPicker/WrapperPicker";
import { CREATE_SLIDE } from "../../../services/heroSlider";

function NewSlide() {
  const initialValues = {
    greeting: "",
    title: {
      base: "",
      accent: "",
      baseFinish: "",
    },
    about: "",
    action: [],
    backgroundImage: null,
  };

  const validationSchema = Yup.object({
    greeting: Yup.string().required("Привітання обов’язкове"),
    title: Yup.object({
      base: Yup.string().required("Base заголовок обов’язковий"),
      accent: Yup.string().required("Accent заголовок обов’язковий"),
      baseFinish: Yup.string().required("BaseFinish заголовок обов’язковий"),
    }),
    about: Yup.string().required("Опис обов’язковий"),
    action: Yup.array().of(Yup.string().required("Посилання обов’язкове")),
    backgroundImage: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("greeting", values.greeting);
      formData.append("title.base", values.title.base);
      formData.append("title.accent", values.title.accent);
      formData.append("title.baseFinish", values.title.baseFinish);
      formData.append("about", values.about);

      values.action.forEach((link, index) => {
        formData.append(`action[${index}]`, link);
      });

      if (values.backgroundImage) {
        formData.append("backgroundImage", values.backgroundImage);
      }

      const res = await CREATE_SLIDE(formData);
      resetForm();
      console.log(res);
    } catch (error) {
      throw ErrorMessage("Помилка");
    }
  };

  return (
    <div className={css.wrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className={css.form}>
            <div className={css.column}>
              <div className={css.col_1}>
                {/* Greeting */}
                <label>Привітання (1)</label>

                <div className="input_wrapper">
                  <Field name="greeting" type="text" className="input" />
                  <ErrorMessage
                    name="greeting"
                    component="div"
                    className="error"
                  />
                </div>

                {/* 1 */}
                <label>Заголовок (рядок 1)</label>

                <div className="input_wrapper">
                  <Field name="title.base" type="text" className="input" />
                  <ErrorMessage
                    name="title.base"
                    component="div"
                    className="error"
                  />
                </div>

                {/* 2 */}
                <label>Заголовок (рядок 2 )</label>

                <div className="input_wrapper">
                  <Field name="title.accent" type="text" className="input" />
                  <ErrorMessage
                    name="title.accent"
                    component="div"
                    className="error"
                  />
                </div>

                {/* 3 */}
                <label>Заголовок (рядок 3)</label>

                <div className="input_wrapper">
                  <Field
                    name="title.baseFinish"
                    type="text"
                    className="input"
                  />
                  <ErrorMessage
                    name="title.baseFinish"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className={css.col_2}>
                {/* Action */}
                <label>Посилання на сторінку</label>

                <div className="input_wrapper">
                  <FieldArray name="action">
                    {({ push, remove }) => (
                      <div className={css.action_array}>
                        {values.action.map((_, index) => (
                          <div key={index}>
                            <Field
                              name={`action[${index}]`}
                              className="input"
                            />
                            <IoMdClose
                              onClick={() => remove(index)}
                              style={{ marginLeft: "15px", color: "red" }}
                            ></IoMdClose>
                          </div>
                        ))}
                        {values.action.length < 2 && (
                          <button
                            type="button"
                            onClick={() => push("")}
                            className="button"
                          >
                            Додати посилання
                          </button>
                        )}
                      </div>
                    )}
                  </FieldArray>
                  <ErrorMessage
                    name="action"
                    component="div"
                    className="error"
                  />
                </div>

                {/* About */}

                <label>Опис (3)</label>

                <div className="input_wrapper">
                  <Field
                    name="about"
                    as="textarea"
                    className="input textarea"
                  />
                  <ErrorMessage
                    name="about"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Зоображення */}
                <label>Фонове зоображення</label>

                <div className="input_wrapper">
                  <WrapperPicker name={"backgroundImage"} />
                  <ErrorMessage
                    name="backgroundImage"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
            </div>
            <div className={css.col_3}>
              <button type="submit" className="button">
                Зберегти
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewSlide;
