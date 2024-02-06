import Form from "./Form";
import "../../styles.css";

const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Form />
    </div>
  );
};
export default LoginPage;
