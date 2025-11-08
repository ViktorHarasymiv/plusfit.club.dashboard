import { Formik, Form } from "formik";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  TextField,
  Box,
} from "@mui/material";

import style from "../../styles/Form.module.css";

// Конфігурація фільтрів

const filterFields = [
  {
    name: "isVerify",
    label: "Актуальність",
    type: "select",
    options: [
      { value: "false", label: "Нові" },
      { value: "true", label: "Старі" },
    ],
  },
  {
    name: "status",
    label: "Статус",
    type: "select",
    options: [
      { value: "Активний", label: "Активний" },
      { value: "Завершений", label: "Завершений" },
      { value: "Заморожений", label: "Заморожений" },
      { value: "Очікує оплати", label: "Очікує оплати" },
    ],
  },
];

const initialValues = filterFields.reduce(
  (acc, field) => ({ ...acc, [field.name]: "" }),
  {}
);

const FilterForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        // Перетворення значень у правильні типи
        const parsed = Object.entries(values).reduce((acc, [key, value]) => {
          if (value === "") return acc;
          if (value === "true") acc[key] = true;
          else if (value === "false") acc[key] = false;
          else acc[key] = value;
          return acc;
        }, {});
        onSubmit(parsed);
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <Box display="flex" gap={2} flexWrap="nowrap">
            {filterFields.map((field) => (
              <FormControl key={field.name} sx={{ minWidth: 200 }}>
                <InputLabel>{field.label}</InputLabel>
                {field.type === "select" ? (
                  <Select
                    name={field.name}
                    value={values[field.name]}
                    onChange={handleChange}
                    label={field.label}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    {field.options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <TextField
                    name={field.name}
                    label={field.label}
                    value={values[field.name]}
                    onChange={handleChange}
                    fullWidth
                  />
                )}
              </FormControl>
            ))}
            <button type="submit" className={style.button}>
              Search
            </button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;
