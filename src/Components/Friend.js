import { useNavigate } from "react-router-dom";

import UserImage from "../Components/UserImage";

const Friend = ({ name, userpicturepath, postUserid }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        onClick={() => {
          navigate(`/profile/${postUserid}`);
        }}
      >
        <UserImage image={userpicturepath} />
        <div>
          <p style={{ marginTop: "20px", marginLeft: "6px" }}>{name}</p>
          {/* <p>{subtitle}</p> */}
        </div>
      </div>
    </div>
  );
};
export default Friend;
