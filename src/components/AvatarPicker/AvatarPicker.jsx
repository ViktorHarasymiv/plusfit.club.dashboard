import { useRef, useState } from "react";

import { useFormikContext } from "formik";

import { FaCloudUploadAlt } from "react-icons/fa";

import css from "./AvatarPicker.module.css";

const AvatarPicker = ({ name }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const { setFieldValue } = useFormikContext();

  const handleFileChange = (e) => {
    const file = e.currentTarget.files?.[0];
    setError("");

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Only images");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Max file size 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFieldValue(name, file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={css.avatar_picker_wrapper}>
      <div className={css.preview_avatar}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview avatar"
            width={300}
            height={300}
            className={css.photo}
          />
        ) : (
          <h2 className={css.change_images}>
            <FaCloudUploadAlt />
            Обери зоображення
          </h2>
        )}
      </div>
      <input
        ref={inputRef}
        id="avatar"
        type="file"
        accept="image/*"
        name={name}
        onChange={handleFileChange}
        className={css.custom_avatar_input}
      />
      {error ?? <span>{error}</span>}
    </div>
  );
};

export default AvatarPicker;
