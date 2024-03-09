import URL from '../url'
import { useEffect, useState } from "react";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

import axios from "axios";
const ProfileFriend = ({ friendid }) => {
  const token = useSelector((state) => state.token);
  const [friendsfriend, setfriendsfriend] = useState({});
  const ismobilefriend = useMediaQuery("(max-width:699px)");

  const getFriend = async () => {
    try {
      const { data } = await axios.get(
        `${URL}/users/${friendid}`,
        // `http://localhost:3001/users/${friendid}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setfriendsfriend(data);
    } catch (error) {}
  };

  useEffect(() => {
    getFriend();
  }, []);

  const { avatar , firstname, lastname, friends } = friendsfriend;

  return (
    <>
      {!ismobilefriend && (
        <div className="profile-info-box">
          <UserImage image={avatar} size="75px " />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3 style={{ textAlign: "center" }}>
              {firstname + " " + lastname}
            </h3>
            <p style={{ textAlign: "center" }}>
              {friends === undefined ? 0 : friends.length} Friends
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default ProfileFriend;
