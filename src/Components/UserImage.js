import URL from '../url'
import React from "react";
import { useMediaQuery } from "@mui/material";

const UserImage = ({ image, size = "50px", iscard = false, src }) => {
  const ismobile = useMediaQuery("(max-width:699px)");

  return (
    <div style={{ cursor: "pointer", height: { size }, width: { size } }}>
      <img
        style={{
          objectFit: "cover",
          borderRadius: `${(iscard && !ismobile) === true ? "0px" : "50%"}`,
        }}
        width={size}
        height={size}
        alt="user"
        src={src ? src : `${URL}/assets/${image}`}
        // src={src ? src : `http://localhost:3001/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;
