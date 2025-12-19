import React, { useState } from "react";

import AvatarPicker from "../../AvatarPicker/AvatarPicker.jsx";

import style from "../../../styles/Form.module.css";

/* FORMIK */

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ADD_PHOTO } from "../../../services/portfolio.js";

function NewPhoto() {
  // STATE
  const [previewUrl, setPreviewUrl] = useState("");

  // VALIDATION

  const initialValues = {
    alt: "",
    section: "",
    photo: null,
  };

  const validationSchema = Yup.object({
    alt: Yup.string()
      .required("Опис зображення обов'язковий")
      .min(2, "Мінімум 2 символи"),
    section: Yup.string().required("Секція обов'язкова"),
    photo: Yup.string().required("Фото обов'язкове"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const formData = new FormData();

          formData.append("alt", values.alt);
          formData.append("section", values.section);
          if (values.photo) {
            formData.append("photo", values.photo);
          }

          for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }

          const res = await ADD_PHOTO(formData);
        } catch (error) {
          console.log("error", error);
        }
        setPreviewUrl("");
        resetForm();
      }}
    >
      {({ values, touched, errors, handleChange }) => (
        <Form>
          <div className={style.form_block}>
            <section className={style.form_section}>
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <Field
                    name="alt"
                    placeholder="Enter text"
                    className={`${style.input} ${
                      errors.name && touched.name ? style.error_input : ""
                    }`}
                  />
                </div>
              </div>
              {/* Метод оплати */}
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <div className={style.input_wrapper}>
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        name="section"
                        value={values.section}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em>Chose section</em>
                        </MenuItem>
                        <MenuItem value={"Gym"}>Gym</MenuItem>
                        <MenuItem value={"Fitness"}>Fitness</MenuItem>
                        <MenuItem value={"Massage"}>Massage</MenuItem>
                        <MenuItem value={"Rehabilitation"}>
                          Rehabilitation
                        </MenuItem>
                        <MenuItem value={"Yoga"}>Yoga</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </section>
            {/* Фото */}
            <section className={style.form_section}>
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <AvatarPicker
                    name={"photo"}
                    previewUrl={previewUrl}
                    setPreviewUrl={setPreviewUrl}
                  />
                </div>
              </div>
            </section>
            <button className={style.button} type="submit">
              Add image
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NewPhoto;
