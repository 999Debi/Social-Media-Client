import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import "../../styles.css";
import UserImage from "../../Components/UserImage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "./../../States/index";

const UserWidget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  if (!user) {
    return null;
  }
  const { _id, firstname, avatar } = user;

  return (
    <div
      style={{
        marginTop: "64px",
        backgroundColor: "#FFFFFF",
        borderRadius: "0.75rem",
        padding: "1.5rem 0.5rem 0.75rem 1.5rem",
        position: "fixed",
        left: "0px",
        height: "83.5vh",
      }}
    >
      <div className="menu flexbox" onClick={() => navigate(`/profile/${_id}`)}>
        <div className="img flexbox" style={{ cursor: "pointer" }}>
          <UserImage image={avatar} />
          <div style={{ marginLeft: "10px" }}>
            <h4 style={{ margin: "0" }}>{firstname}</h4>
          </div>
        </div>
      </div>

      <div
        className=" menu flexleft"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate(`/friends`);
        }}
      >
        <PeopleAltIcon
          sx={{
            color: "#645cff",
            fontSize: "2.4em",

            backgroundColor: "#e6e8ee",
            borderRadius: "50%",
          }}
        />
        <h4 style={{ margin: "0", marginLeft: "2em" }}>
          Friends
        </h4>
        {/* <span style={{ margin: "0", marginLeft: "2em" }}>
          Friends
        </span> */}
      </div>

      <div
        className="menu flexleft"
        style={{ cursor: "pointer", position: "relative", bottom: "-65%" }}
        onClick={() => dispatch(setLogout())}
      >
        <LogoutIcon
          sx={{
            fontSize: "2.4em",

            borderRadius: "50%",
            backgroundColor: "#e6e8ee",
          }}
        />
        <h4 style={{ margin: "0", marginLeft: "2em"}}>
          Log Out
        </h4>
      </div>
    </div>
  );
};
export default UserWidget;
