import React from "react";

import AvatarPicker from "../../../AvatarPicker/AvatarPicker.jsx";

/* FORMIK */

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ADD_PHOTO } from "../../../../services/portfolio.js";

function NewPhoto() {
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

          console.log(res);
        } catch (error) {
          console.log("error", error);
        }
        resetForm();
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <div className="form_block">
            <h2>Нове зоображення</h2>

            <div className="input_wrapper">
              {/* Про зоображення */}
              <div className="input_wrapper">
                <Field name="alt" placeholder="Введи опис" className="input" />
                <ErrorMessage name="alt" component="div" className="error" />
              </div>

              {/* Метод оплати */}
              <div className="input_wrapper">
                <FormControl sx={{ width: 240, margin: "0px" }}>
                  <Select
                    name="section"
                    value={values.section}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    sx={{
                      backgroundColor: "transparent",
                      color: "rgba(255, 255, 255, 0.8)",

                      padding: "12px 10px",
                      width: "218px",
                      height: "49.5px",

                      fontSize: "16px",

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
                      <em>Обери секцію</em>
                    </MenuItem>
                    <MenuItem value={"Тренажерний зал"}>
                      Тренажерний зал
                    </MenuItem>
                    <MenuItem value={"Масаж"}>Масаж</MenuItem>
                    <MenuItem value={"Реабілітація"}>Реабілітація</MenuItem>
                    <MenuItem value={"Йога"}>Йога</MenuItem>
                    <MenuItem value={"Дитячі танці"}>Дитячі танці</MenuItem>
                    <MenuItem value={"Ендосфера"}>Ендосфера</MenuItem>
                  </Select>
                </FormControl>
                <ErrorMessage
                  name="section"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            {/* Фото */}

            <div className="input_wrapper">
              <AvatarPicker name={"photo"} />
              <ErrorMessage name="photo" component="div" className="error" />
            </div>
            <button className="button" type="submit">
              Відправити
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NewPhoto;
