import { useNavigate } from "react-router-dom";

import UserImage from "../Components/UserImage";

const Friend = ({ name, useravatar, postUserid }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between",gap:"1em" }}
        onClick={() => {
          navigate(`/profile/${postUserid}`);
        }}
      >
        <UserImage image={useravatar} />
        <div style={{ display: "flex", justifyContent: "center" ,    alignItems: "center"}}>
          <span>{name}</span>
        </div>
      </div>
    </div>
  );
};
export default Friend;
