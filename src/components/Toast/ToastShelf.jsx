import { Toast } from "./Toast";
import "./styles.scss";

export const ToastShelf = () => {
  return (
    <div className="toastShelf">
      <Toast type="warning" />
    </div>
  );
};
