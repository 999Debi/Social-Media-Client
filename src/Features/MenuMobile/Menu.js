import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";
import UserImage from "../../Components/UserImage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { setLogout } from "./../../States/index";
import { setmenuopen } from "../../States/index";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    firstname,
    lastname,
    picturepath,
    _id: id,
  } = useSelector((state) => state.user);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1em",
          }}
        >
          <IconButton
            sx={{ "&:hover": { backgroundColor: "#e2e8f0" }, color: "black" }}
            onClick={() => {
              dispatch(setmenuopen());
            }}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div className="menu-box">
          <div
            style={{ display: "flex", justifyContent: "center", gap: "1em" }}
            className="menu-items"
            onClick={() => {
              dispatch(setmenuopen());
              navigate(`/profile/${id}`);
            }}
          >
            <UserImage image={picturepath} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h4 style={{ margin: "0" }}>{firstname + " " + lastname}</h4>
              <span>View your profile</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "",
              flexDirection: "column",
              width: "65%",
              gap: "1em",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="menu-items"
              onClick={() => {
                dispatch(setmenuopen());
                navigate(`/home`);
              }}
            >
              <HomeIcon
                sx={{
                  fontSize: "2em",
                  borderRadius: "50%",
                  backgroundColor: "#e6e8ee",
                }}
              />
              <h4 style={{ margin: "0", marginTop: "0.4em" }}>Home</h4>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="menu-items"
              onClick={() => {
                dispatch(setmenuopen());
                navigate(`/friends`);
              }}
            >
              <PeopleAltIcon
                sx={{
                  color: "#645cff",
                  fontSize: "2em",
                  backgroundColor: "#e6e8ee",
                  borderRadius: "50%",
                }}
              />
              <h4 style={{ margin: "0", marginTop: "0.4em" }}>Friends</h4>
            </div>
          </div>

          <div
            className="menu-items"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.4em",
            }}
            onClick={() => dispatch(setLogout())}
          >
            <LogoutIcon
              sx={{
                fontSize: "1.7em",
                borderRadius: "50%",
                backgroundColor: "#e6e8ee",
              }}
            />
            <h4 style={{ margin: "0", marginTop: "0.2em" }}>Log Out</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Menu;
