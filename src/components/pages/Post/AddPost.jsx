import { forwardRef, useEffect } from "react";

// MEDIA

import style from "../../../styles/Form.module.css";

/* MUI SELECT */

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Autocomplete, TextField, Checkbox } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

/* FORMIK */

import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

import { CREATE_POST } from "../../../services/post";
import { useConfigStore } from "../../../store/configStore";

function AddPost() {
  const { fetchCategory, categories, fetchInterests, interests } =
    useConfigStore();

  const initialValues = {
    title: "",
    description: "",
    author: "",
    content: [""], // масив абзаців
    quote: {
      text: "",
      author: "",
    },
    author: "", // ім’я автора поста
    images: [], // масив URL
    tags: [], // масив тегів
    filterBy: "",
    category: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Заголовок обов'язковий"),
    description: Yup.string().required("Короткий опис обов'язковий"),
    content: Yup.array()
      .of(Yup.string().trim().min(1, "Абзац не може бути порожнім"))
      .min(1, "Має бути хоча б один абзац")
      .max(4, "Не більше 4 абзаців"),

    quote: Yup.object({
      text: Yup.string(),
      author: Yup.string(),
    }),
    author: Yup.string().required("Ім’я автора обов'язкове"),
    images: Yup.array().of(Yup.string().url("Має бути URL")),
    tags: Yup.array()
      .of(Yup.string())
      .min(1, "At least one emotion must be selected")
      .max(3, "You cannot select more than 3 interests")
      .optional("Interests are required"),
    filterBy: Yup.string(),
    category: Yup.string(),
  });

  const CustomPaper = forwardRef(function CustomPaper(props, ref) {
    return (
      <div
        ref={ref}
        {...props}
        style={{
          borderRadius: 6,

          backgroundColor: "rgba(0,0,0,0.8)",
          border: "1px solid silver",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",

          color: "inherit",
        }}
      >
        {props.children}
      </div>
    );
  });

  useEffect(() => {
    fetchCategory();
    fetchInterests();
  }, []);

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
              {/* Description */}
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <label htmlFor="description" className={style.label}>
                    <h4>Description</h4>
                  </label>
                  <Field
                    name="description"
                    placeholder="Enter value"
                    className={`${style.input} ${
                      errors.title && touched.title ? style.error_input : ""
                    }`}
                  />
                </div>
              </div>
              {/* Author */}
              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <label htmlFor="author" className={style.label}>
                    <h4>Author</h4>
                  </label>
                  <Field
                    name="author"
                    placeholder="Enter value"
                    className={`${style.input} ${
                      errors.title && touched.title ? style.error_input : ""
                    }`}
                  />
                </div>
              </div>
            </section>

            {/* Контент (масив абзаців) */}

            <section className={style.form_section}>
              <div className={`${style.input_tile}  ${style.full_width}`}>
                <div className={style.input_wrapper}>
                  <label htmlFor="content" className={style.label}>
                    <h4>Paragraph</h4>
                  </label>
                  <div className={style.paragraph_wrapper}>
                    {values.content.map((_, index) => (
                      <aside
                        key={index}
                        className={style.paragraph_input_wrapper}
                      >
                        <Field
                          name={`content[${index}]`}
                          placeholder={`Enter text`}
                          className={`${style.textarea} ${
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
                  </div>
                  {values.content.length < 4 && (
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
                  )}
                </div>
              </div>
            </section>

            {/* Quote */}

            <section className={style.form_section}>
              {/* Quote author */}

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

              {/* Quote text */}

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
            </section>

            <section className={style.form_section}>
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
                        <MenuItem value={"News"}>News</MenuItem>
                        <MenuItem value={"Classes"}>Classes</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              {/* Category */}

              <div className={style.input_tile}>
                <div className={style.input_wrapper}>
                  <div className={style.input_wrapper}>
                    <label htmlFor="category" className={style.label}>
                      <h4>Choose filter</h4>
                    </label>
                    <FormControl sx={{ width: "100%", margin: "0px" }}>
                      <Select
                        name="category"
                        value={values.category}
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue("category", e.target.value);
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em>Choose category</em>
                        </MenuItem>
                        {categories.map(({ _id, title }) => (
                          <MenuItem key={_id} value={title}>
                            {title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              {/* Tags */}

              <div className={style.input_tile}>
                <label htmlFor="tags" className={style.label}>
                  Choose tag
                </label>
                <Autocomplete
                  multiple
                  disablePortal
                  disableCloseOnSelect
                  options={interests}
                  getOptionLabel={(option) => option.tag}
                  isOptionEqualToValue={(option, value) => option === value}
                  value={interests.filter(
                    (e) => e._id && (values?.tags ?? []).includes(e.tag),
                  )}
                  onChange={(_, newValue) => {
                    if (newValue.length > 3) return;
                    setFieldValue(
                      "tags",
                      newValue?.map((e) => e.tag),
                    );
                  }}
                  PaperComponent={CustomPaper}
                  renderOption={(props, option, { selected }) => {
                    const { key, ...rest } = props;
                    return (
                      <li key={key} {...rest}>
                        <Checkbox
                          checked={selected}
                          sx={{
                            padding: 0,
                            marginRight: 1,
                          }}
                          icon={
                            <div
                              style={{
                                width: 20,
                                height: 20,
                                border: "1px solid silver",
                              }}
                            />
                          }
                          checkedIcon={
                            <div
                              style={{
                                width: 20,
                                height: 20,
                                border: "1px solid silver",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <CheckIcon
                                style={{
                                  color: "silder",
                                  fontSize: 12,
                                }}
                              />
                            </div>
                          }
                        />
                        {option.tag}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose emotion"
                      variant="outlined"
                      fullWidth
                      style={{ height: "auto" }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          width: "100%",
                          color: "inherit",
                          opacity: 1,
                        },
                        "& .MuiInputBase-input::placeholder": {
                          fontSize: "12px",
                          opacity: 0.8, // важливо, бо MUI ставить 0.5
                        },
                        "& .MuiChip-root": {
                          backgroundColor: "var(--accent-color)",
                          fontSize: "12px",
                          color: "var(--white)",
                        },

                        "& .MuiSvgIcon-root": {
                          color: "var(--dark)",
                        },

                        "& .MuiChip-deleteIcon": {
                          color: "var(--white) !important",
                        },

                        "& .MuiAutocomplete-root": {
                          width: "100%",
                        },

                        "& .MuiAutocomplete-clearIndicator": {
                          color: "white !important",
                        },
                      }}
                    />
                  )}
                />
              </div>
            </section>

            {/* Images */}
            <div className={`${style.input_tile}  ${style.full_width}`}>
              <label htmlFor="images" className={style.label}>
                <h4>Media content</h4>
              </label>
              <div className={style.input_wrapper}>
                <div className={style.paragraph_wrapper}>
                  <FieldArray
                    name="images"
                    render={(arrayHelpers) => (
                      <div className={style.input_wrapper}>
                        {values.images.map((_, i) => (
                          <div key={i} className={style.input_tile}>
                            <Field
                              name={`images.${i}`}
                              placeholder="Image URL"
                              className={style.input}
                            />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(i)}
                              className={style.button}
                              style={{ marginTop: "20px" }}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        {values.images.length < 3 && (
                          <button
                            type="button"
                            className={style.button}
                            onClick={() => arrayHelpers.push("")}
                          >
                            Add image
                          </button>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
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
