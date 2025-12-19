import { useMemo, useState } from "react";

// MEDIA

import style from "../../../styles/Form.module.css";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/* FORMIK */

import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { CREATE_POST } from "../../../services/post";

function AddPost() {
  const initialValues = {
    title: "",
    content: [""], // масив абзаців
    quote: {
      text: "",
      author: "",
    },
    author: "IRONMASS TEAM", // ім’я автора поста
    images: [], // масив URL
    tags: [], // масив тегів
    filterBy: "",
    // isNews: true,
    // isPrivate: false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Заголовок обов'язковий"),
    content: Yup.array()
      .of(Yup.string().trim().min(1, "Абзац не може бути порожнім"))
      .min(1, "Має бути хоча б один абзац"),

    quote: Yup.object({
      text: Yup.string(),
      author: Yup.string(),
    }),
    // author: Yup.string().required("Ім’я автора обов'язкове"),
    images: Yup.array().of(Yup.string().url("Має бути URL")),
    tags: Yup.array().of(Yup.string()),
    filterBy: Yup.string(),
    // isNews: Yup.boolean(),
    // isPrivate: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await CREATE_POST(values);
      }}
    >
      {({ values, touched, errors, setFieldValue, handleChange }) => (
        <Form>
          <div className={style.form_block}>
            {/* Заголовок */}
            <section className={style.form_section}>
              <div className={style.input_tile}>
                {/* Title */}
                <div className={style.input_wrapper}>
                  <label htmlFor="title" className={style.label}>
                    <h4>Title</h4>
                  </label>
                  <Field
                    name="title"
                    placeholder="Enter value"
                    className={`${style.input} ${
                      errors.title && touched.title ? style.error_input : ""
                    }`}
                  />
                </div>
              </div>
            </section>

            <section className={style.form_section}>
              {/* Контент (масив абзаців) */}
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <label htmlFor="content" className={style.label}>
                    <h4>Paragraph</h4>
                  </label>
                  <div className={style.paragraph_wrapper}>
                    {values.content.map((paragraph, index) => (
                      <aside
                        key={index}
                        className={style.paragraph_input_wrapper}
                      >
                        <Field
                          name={`content[${index}]`}
                          placeholder={`Enter text`}
                          className={`${style.input} ${
                            errors.content?.[index] && touched.content?.[index]
                              ? style.error_input
                              : ""
                          }`}
                        />
                        <button
                          type="button"
                          className={style.button}
                          onClick={() => {
                            const updated = [...values.content];
                            updated.splice(index, 1);
                            setFieldValue("content", updated);
                          }}
                        >
                          Remove
                        </button>
                      </aside>
                    ))}
                    <div className={style.paragraph_input_wrapper}>
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue("content", [...values.content, ""])
                        }
                        className={style.button}
                      >
                        Add paragraph
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quote */}

            <section className={style.form_section}>
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <label htmlFor="quote.text" className={style.label}>
                    <h4>Quote text</h4>
                  </label>
                  <Field
                    name="quote.text"
                    placeholder="Quote text"
                    className={`${style.input} ${
                      errors.quote?.text && touched.quote?.text
                        ? style.error_input
                        : ""
                    }`}
                  />
                </div>
              </div>
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <label htmlFor="quote.author" className={style.label}>
                    <h4>Quote author</h4>
                  </label>
                  <Field
                    name="quote.author"
                    placeholder="Quote author"
                    className={`${style.input} ${
                      errors.quote?.author && touched.quote?.author
                        ? style.error_input
                        : ""
                    }`}
                  />
                </div>
              </div>
            </section>

            <section className={style.form_section}>
              {/* Tags */}
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <FieldArray
                    name="tags"
                    render={(arrayHelpers) => (
                      <div>
                        {values.tags.map((tag, i) => (
                          <div key={i}>
                            <Field
                              name={`tags.${i}`}
                              placeholder="Tag"
                              className={`${style.input} ${
                                errors.tags?.[i] && touched.tags?.[i]
                                  ? style.error_input
                                  : ""
                              }`}
                            />
                            <button
                              type="button"
                              className={style.button}
                              onClick={() => arrayHelpers.remove(i)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className={style.button}
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add tag
                        </button>
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Filter */}

              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <div className={style.input_wrapper}>
                    <label htmlFor="filterBy" className={style.label}>
                      <h4>Choose filter</h4>
                    </label>
                    <FormControl sx={{ width: "100%", margin: "0px" }}>
                      <Select
                        name="filterBy"
                        value={values.filterBy}
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue("filterBy", e.target.value);
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em>Choose filter</em>
                        </MenuItem>
                        <MenuItem value={"news"}>News</MenuItem>
                        <MenuItem value={"classes"}>Classes</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </section>

            {/* Images */}
            <FieldArray
              name="images"
              render={(arrayHelpers) => (
                <div>
                  {values.images.map((img, i) => (
                    <div key={i}>
                      <Field name={`images.${i}`} placeholder="Image URL" />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(i)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className={style.button}
                    onClick={() => arrayHelpers.push("")}
                  >
                    Add image
                  </button>
                </div>
              )}
            />

            <button type="submit" className={style.button}>
              Create Post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddPost;
