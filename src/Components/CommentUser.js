import React from "react";
import URL from '../url'
const CommentUser = ({ image, size = "30px" }) => {
  return (
    <div style={{ height: { size }, width: { size }, marginRight: "1rem" }}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        // src={`http://localhost:3001/assets/${image}`}
        src={`${URL}/assets/${image}`}
      />
    </div>
  );
};

export default CommentUser;
