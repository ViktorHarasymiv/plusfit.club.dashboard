import css from "./EditModule.module.css";

import { HiOutlineSaveAs } from "react-icons/hi";

export const EditModule = ({ value, onChange, onSave, placeholder, style }) => {
  return (
    <div className={css.put_module} style={{ ...style }}>
      <input
        type="text"
        className={css.module_input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit" className={css.module_button} onClick={onSave}>
        <HiOutlineSaveAs />
      </button>
    </div>
  );
};
