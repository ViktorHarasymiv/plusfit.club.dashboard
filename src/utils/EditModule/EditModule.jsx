import css from "./EditModule.module.css";

import { HiOutlineSaveAs } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";

export const EditModule = ({
  value,
  onChange,
  onSave,
  placeholder,
  close,
  bottom,
}) => {
  return (
    <div className={`${css.put_module}  ${bottom ? css.module_bottom : null}`}>
      <input
        type="text"
        className={css.module_input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className={css.action_wrapper}>
        <button
          type="button"
          onClick={() => close(false)}
          className={css.close_button}
        >
          <IoIosClose />
        </button>
        <button type="submit" className={css.module_button} onClick={onSave}>
          <HiOutlineSaveAs />
        </button>
      </div>
    </div>
  );
};
