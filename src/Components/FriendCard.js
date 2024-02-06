import URL from '../url'
import { useEffect, useState } from "react";
import axios from "axios";
import UserImage from "./UserImage";
import { useMediaQuery } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { setFriends, setReqFriend } from "../States/index";
const FriendCard = ({ image, name, isReqFriend, friendid }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [myfriendinfo, setmyfriendinfo] = useState({});
  const [isFriendEdited, setisFriendEdited] = useState(null);
  const ismobile = useMediaQuery("(max-width:699px)");

  //only for already friends
  const getFriendinfo = async () => {
    try {
      const { data } = await axios.get(
        // `http://localhost:3001/users/${friendid}`,
        `${URL}/users/${friendid}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setmyfriendinfo(data);
    } catch (error) {}
  };

  const makeFriend = async () => {
    try {
      const { data } = await axios.patch(
        // `http://localhost:3001/users/${user._id}/${friendid}/add`,
        `${URL}/users/${user._id}/${friendid}/add`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setReqFriend({ reqFriend: data.requestedFriend }));
      dispatch(setFriends({ friends: data.friends }));
      setisFriendEdited("Friend Added");
    } catch (error) {}
  };

  const cancelFriend = async () => {
    try {
      const { data } = await axios.patch(
        `${URL}/users/${user._id}/${friendid}/cancel`,
        // `http://localhost:3001/users/${user._id}/${friendid}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setReqFriend({ reqFriend: data }));
      setisFriendEdited("Request Removed");
    } catch (error) {}
  };

  const unFriend = async () => {
    try {
      const { data } = await axios.patch(
        `${URL}/users/${user._id}/${friendid}/unfriend`,
        // `http://localhost:3001/users/${user._id}/${friendid}/unfriend`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    
      dispatch(setFriends({ friends: data }));
      setisFriendEdited("Removed");
    } catch (error) {}
  };

  useEffect(() => {
    getFriendinfo();
  }, []);

  return (
    <>
      {isReqFriend && (
        <div className="friend-card">
          <UserImage
            image={image}
            size={ismobile === true ? 60 : 100}
            // iscard={false}
          />

          <div
            className={ismobile ? "btn-box" : ""}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p style={{ textAlign: "center", fontWeight: "600" }}>{name}</p>
            <div className="add-div ">
              {isFriendEdited != null ? (
                <button style={{ backgroundColor: "#d4d9e0", color: "black" }}>
                  {isFriendEdited}
                </button>
              ) : (
                <>
                  <button
                    style={{ backgroundColor: "#645cff" }}
                    onClick={makeFriend}
                  >
                    Confirm
                  </button>
                  <button
                    style={{ backgroundColor: "#d4d9e0", color: "black" }}
                    onClick={cancelFriend}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {!isReqFriend && !ismobile && (
        <div className="friend-card">
          <UserImage image={myfriendinfo.picturepath} size={100} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p style={{ textAlign: "center", fontWeight: "600" }}>
              {myfriendinfo.firstname}
            </p>

            {isFriendEdited != null ? (
              <button
                style={{ backgroundColor: "#d4d9e0", color: "black" }}
                className="editfriend-btn"
              >
                {isFriendEdited}
              </button>
            ) : (
              <div className="add-div ">
                <button
                  style={{ backgroundColor: "#d4d9e0", color: "black" }}
                  onClick={unFriend}
                >
                  Unfriend
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {!isReqFriend && ismobile && (
        <div className="friend-card">
          <UserImage image={myfriendinfo.picturepath} size={60} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ textAlign: "center", fontWeight: "600" }}>
              {myfriendinfo.firstname}
            </p>

            {isFriendEdited != null ? (
              <button style={{}}>{isFriendEdited}</button>
            ) : (
              <div className="add-div ">
                <button
                  style={{
                    backgroundColor: "#d4d9e0",
                    color: "black",
                    cursor: "pointer",
                    width: "100%",
                    borderRadius: "5px",
                    borderStyle: "none",
                    fontWeight: "500",
                    padding: "0.3em",
                  }}
                  onClick={unFriend}
                >
                  Unfriend
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default FriendCard;
