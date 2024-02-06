import { IconButton, useMediaQuery } from "@mui/material";

import "../../styles.css";
import MenuIcon from "@mui/icons-material/Menu";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { setmenuopen } from "../../States/index";

const Navbar = () => {
  const ismedium = useMediaQuery("(max-width:1000px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cont flexbox">
      <h1 className="brand" onClick={() => navigate("/home")}>
        NRbuzz
      </h1>

      <div
        style={{
          paddingLeft: "1em",
        }}
      >
        <IconButton
          sx={{
            display: `${ismedium ? "" : "none"}`,
            color: "black",
            "&:hover": { backgroundColor: "#f0f2f5" },
          }}
          onClick={() => {
            dispatch(setmenuopen());
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default Navbar;
