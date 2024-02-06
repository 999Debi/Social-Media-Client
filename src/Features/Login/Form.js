import URL from '../../url'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

import axios from "axios";

import { Formik } from "formik";
import * as yup from "yup";

import { useMediaQuery } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { setLogin, setAlert, clearAlert } from "../../States/index";
import Alert from "../../Components/Alert";

const addUserToLocalStorage = ({ user, token }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const registerSchema = yup.object().shape({
  firstname: yup.string().min(3).required("required"),
  lastname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  Graduationyear: yup.string().required("required"),
  Stream: yup.string().required("required"),
  password: yup
    .string()
    .required("required")
    .matches(
      /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 6 characters, one uppercase, one number and one special case character"
    ),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  Graduationyear: "",
  Stream: "",
};
const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const user = useSelector((state) => state.user);

  const showAlert = useSelector((state) => state.showAlert);

  const [pageType, setPageType] = useState("login");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    // const formData = new FormData();

    try {
      const inputobj = {};
      for (let value in values) {
        // formData.append(value, values[value]);
        inputobj[value] = values[value];
      }

      const savedUserResponse = await axios.post(
        `${URL}/auth/register`,
        // "http://localhost:3001/auth/register",
        inputobj
      );

      const { data } = savedUserResponse;

      onSubmitProps.resetForm();

      if (data) {
        dispatch(
          setAlert({
            alertText: "Registation Successful!",
            alertType: "success",
          })
        );

        setTimeout(() => {
          dispatch(clearAlert());
          setPageType("login");
        }, 3000);
      }
    } catch (error) {
   

      dispatch(
        setAlert({
          alertText: { msg: error.response.data.msg },
          alertType: "danger",
        })
      );
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await axios.post(
        `${URL}/auth/login`,
        // "http://localhost:3001/auth/login",
        values
      );

      const { data } = loggedInResponse;

      onSubmitProps.resetForm();

      if (data) {
        dispatch(
          setLogin({
            user: data.loggedinuser,
            token: data.token,
          })
        );

      
        addUserToLocalStorage({
          user: data.loggedinuser,
          token: data.token,
        });

        dispatch(
          setAlert({
            alertText: "Login Successful! Redirecting...",
            alertType: "success",
          }),

          setTimeout(() => {
            navigate("/home");
          }, 2000)
        );
    
      }
    } catch (error) {
     console.log(error)

      dispatch(
        setAlert({
          alertText: error.response.data.msg ,
          alertType: "danger",
        })
      );
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      await login(values, onSubmitProps);
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    }
    if (isRegister) await register(values, onSubmitProps);
  };


  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isRegister ? registerSchema : loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <div style={{ width: `${isNonMobile ? "50%" : "80%"}` }}>
          <form className="form" onSubmit={handleSubmit}>
            <h1 style={{ color: "#645cff" }}>NRbuzz</h1>
            {isRegister && (
              <>
                {showAlert && <Alert />}
                <div className="form-row">
                  <label htmlFor="firstname" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="first name"
                    id="firstname"
                    name="firstname"
                    value={values.firstname}
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.firstname && errors.firstname ? (
                    <div style={{ color: "#ee5a5a" }}>{errors.firstname}</div>
                  ) : null}
                </div>

                <div className="form-row">
                  <label htmlFor="lastname" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={values.lastname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="last name"
                    id="lastname"
                    name="lastname"
                    className="form-input"
                  />
                  {touched.lastname && errors.lastname ? (
                    <div style={{ color: "#ee5a5a" }}>{errors.lastname}</div>
                  ) : null}
                </div>

                <div className="form-row">
                  <label htmlFor="Graduationyear" className="form-label">
                    Expected Graduation Year
                  </label>
                  <input
                    type="month"
                    id="Graduationyear"
                    value={values.Graduationyear}
                    name="Graduationyear"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.Graduationyear && errors.Graduationyear ? (
                    <div style={{ color: "#ee5a5a" }}>
                      {errors.Graduationyear}
                    </div>
                  ) : null}
                </div>

                <div className="form-row">
                  <label htmlFor="Stream" className="form-label">
                    Stream/Branch
                  </label>
                  <input
                    type="text"
                    placeholder="e.g: ECE,CSE "
                    value={values.Stream}
                    id="Stream"
                    name="Stream"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.Stream && errors.Stream ? (
                    <div style={{ color: "#ee5a5a" }}>{errors.Stream}</div>
                  ) : null}
                </div>
              </>
            )}

            {showAlert && !isRegister && <Alert />}
            <div className="form-row">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                placeholder="abc@gmail.com"
                id="email"
                name="email"
                value={values.email}
                autoComplete={isRegister ? "off" : ""}
                className="form-input"
                onBlur={handleBlur}
                onChange={handleChange}
              />

              {touched.email && errors.email ? (
                <div style={{ color: "#ee5a5a" }}>{errors.email}</div>
              ) : null}
            </div>

            <div className="form-row">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={values.password}
                name="password"
                autoComplete={isRegister ? "off" : ""}
                className="form-input"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.password && errors.password ? (
                <div style={{ color: "#ee5a5a" }}>{errors.password}</div>
              ) : null}
            </div>

            <div className="form-row">
              <button type="submit" className="form-btn">
                {isLogin ? "LOG IN" : "REGISTER"}
              </button>
            </div>

            <div className="form-row">
              <p style={{ textAlign: "center" }}>
                {isLogin ? `Don't have an account` : "Already have an account"}
              </p>
              <p
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  textAlign: "center",
                }}
              >
                {isLogin ? " Sign Up here." : "Login here."}
              </p>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};
export default Form;
