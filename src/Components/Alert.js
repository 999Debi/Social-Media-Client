import { useSelector } from "react-redux";

const Alert = () => {
  const { alertText, alertType } = useSelector((state) => state);
  return <div className={`alert  alert-${alertType}`}>{alertText}</div>;
};
export default Alert;
