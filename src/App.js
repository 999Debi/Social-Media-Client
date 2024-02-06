
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";


import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";



import HomePage from "./Features/Home";
import LoginPage from "./Features/Login/index";
import ProfilePage from "./Features/Profile/index";
import Friend from "./Features/Friend/Friend";
import Error from "./Features/Error";


function App() {

     const theme = useMemo(() => createTheme(themeSettings()));
  const isAuth = Boolean(useSelector((state) => state.token));


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/home"
            element={isAuth ? <HomePage/> : <Navigate to="/" />}
          />

          <Route path="/" element={<LoginPage />} />

          <Route
            path="/profile/:userid"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />

          <Route
            path="/friends"
            element={isAuth ? <Friend /> : <Navigate to="/" />}
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}


export default App;
