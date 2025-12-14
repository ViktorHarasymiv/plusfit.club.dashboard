import "./style.css";

import { useToastStore } from "../../store/toastStore";

const Toast = () => {
  const { message, type, visible } = useToastStore();

  if (!visible) return null;

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast_content_wrapper">
        {type === "success" ? <img src="" className="icon_toast" /> : null}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
