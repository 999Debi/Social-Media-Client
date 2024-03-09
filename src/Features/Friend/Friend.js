import URL from '../../url'
import { useMediaQuery } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import Navbar from "../Navbar";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserImage from "../../Components/UserImage";
import "../../styles.css";
import { useEffect, useState } from "react";
import FriendCard from "../../Components/FriendCard";

import { setReqFriend, setFriends } from "../../States";
import Menu from "../MenuMobile/Menu";

const Friend = ({ friendid, name, useravatar }) => {
  const ismobile = useMediaQuery("(max-width:700px)");

  const [isRequest, setisRequest] = useState(true);
  const [isload, setisload] = useState(true);
  const dispatch = useDispatch();

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);


  const [requestedFriends, setrequestedFriends] = useState([]);
  const [friends, setfriends] = useState([]);

  const ismenuopen = useSelector((state) => state.ismenuopen);

  const getReqFriend = async () => {
    try {
      const { data } = await axios.get(
        `${URL}/users/${_id}/allrequest`,
        // `http://localhost:3001/users/${_id}/allrequest`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setrequestedFriends(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getalreadyFriend = async () => {
    try {
      const { data } = await axios.get(
        `${URL}/users/${_id}/alreadyfriends`,
        // `http://localhost:3001/users/${_id}/alreadyfriends`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setfriends(data);
     
    } catch (error) {
      console.log(error);
    }
  };

  const makeFriend = async (friendid) => {
    try {
      const { data } = await axios.patch(
        `${URL}/users/${_id}/${friendid}/add`,
        // `http://localhost:3001/users/${_id}/${friendid}/add`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setReqFriend({ reqFriend: data.requestedFriend }));
      dispatch(setFriends({ friends: data.friends }));
    } catch (error) {
      console.log(error);
    }
  };

  const cancelFriend = async (friendid) => {
    try {
      const { data } = await axios.patch(
        `${URL}/users/${_id}/${friendid}/cancel`,
        // `http://localhost:3001/users/${_id}/${friendid}/cancel`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setReqFriend({ reqFriend: data }));
    } catch (error) {}
  };

  useEffect(() => {
    getReqFriend();
    getalreadyFriend();
    if (isload) setisload(false);
  }, [isRequest]);

  return (
    <>
      <div style={{ display: `${ismenuopen ? "" : "none"}` }}>
        <Menu />
      </div>

      <div
        style={{
          backgroundColor: `${ismobile === true ? "" : ""}`,

          display: `${ismenuopen ? "none" : ""}`,
        }}
      >
        <Navbar />

        {ismobile && (
          <div
            style={{
              padding: "0px 2em",
              position: "relative",
              top: "5em",
              backgroundColor: "#ffffff",
            }}
          >
            <div>
              <div className="flex-box">
                <h1 style={{ fontWeight: "500" }}>Friends</h1>
                <button
                  className="btn-fri"
                  onClick={() => setisRequest(!isRequest)}
                >
                  {isRequest ? "Your Friends" : "Friend Request"}
                </button>
              </div>

              <div className="flex-box" style={{ paddingTop: "2em" }}>
                <h3 style={{ fontWeight: "600" }}>
                  {isRequest ? "Friend Request" : "All Friends"}
                </h3>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "10px",
                }}
              >
                {requestedFriends.length === 0 && isRequest && (
                  <h3 style={{ paddingTop: "3em", textAlign: "center" }}>
                    No new request
                  </h3>
                )}
                {friends.length === 0 && (
                  <h3 style={{ paddingTop: "3em", textAlign: "center" }}>
                    No friends
                  </h3>
                )}
                {isRequest &&
                  requestedFriends.map((friend, index) => {
                    const indexid = index;
                    return (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "1em",

                          padding: "1em",
                        }}
                      >
                        <UserImage image={friend[1]} size={"70px"} />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "70%",
                          }}
                        >
                          <h3 style={{ textAlign: "left" }}>
                            {friend[2] + " " + friend[3]}
                          </h3>
                          <p style={{ textAlign: "left" }}>
                            {requestedFriends === undefined
                              ? 0
                              : requestedFriends.length}{" "}
                            Friends
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "0.3em",
                            }}
                          >
                            <button
                              className="friendReq-mobilebtn"
                              style={{ backgroundColor: "#645cff" }}
                              onClick={() => makeFriend(friend[0].toString())}
                            >
                              Confirm
                            </button>
                            <button
                              className="friendReq-mobilebtn"
                              style={{
                                backgroundColor: "#d4d9e0",
                                color: "black",
                              }}
                              onClick={() => cancelFriend(friend[0].toString())}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {!isRequest &&
                  friends.map((friend, index) => {
                    const indexid = index;

                    return (
                      <FriendCard
                        key={index}
                        isReqFriend={false}
                        friendid={friend}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {!ismobile && (
          <div className="">
            <div className="sidebar">
              {/* <h1 style={{ textAlign: "left", marginBottom: "1em" }}>Friends</h1> */}
              <div
                className=" friend-row"
                onClick={() => {
                  getReqFriend();
                  setisRequest(true);
                }}
              >
                <PersonAddIcon
                  sx={{
                    backgroundColor: "#e2e8f0",
                    fontSize: "2.3em",
                    marginRight: "0.5em",
                    borderRadius: "20px",
                  }}
                />
                <h3 style={{ paddingTop: "1em" }}>Friend Request</h3>
              </div>

              <div
                className="friend-row"
                onClick={() => {
                  setisRequest(false);
                }}
              >
                <PeopleIcon
                  sx={{
                    backgroundColor: "#e2e8f0",
                    fontSize: "2.3em",
                    borderRadius: "20px",
                    marginRight: "0.5em",
                  }}
                />
                <h3>All Friends</h3>
              </div>
            </div>

            {isRequest && (
              <div
                style={{
                  width: "80%",
                  margin: "auto",
                  marginTop: "70px",
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ paddingTop: "1em" }}>Friend requests</h2>
                  {requestedFriends.length === 0 && (
                    <h3 style={{ paddingTop: "1em" }}>No new request</h3>
                  )}
                </div>

                <div className="friend-grid">
                  {requestedFriends.map((friend, index) => {
                    const indexid = index;
                    return (
                      <FriendCard
                        key={index}
                        image={friend[1]}
                        isReqFriend={true}
                        name={friend[2]}
                        index={indexid}
                        friendid={friend[0]}
                        // makeFriend={makeFriend}
                        // cancelFriend={cancelFriend}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {!isRequest && (
              <div
                style={{
                  width: "80%",
                  margin: "auto",
                  marginTop: "70px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ paddingTop: "1em" }}>All friends</h2>
                  {friends.length === 0 && (
                    <h3 style={{ paddingTop: "1em" }}>No friends</h3>
                  )}
                </div>
                <div className="friend-grid">
                  {friends.map((friend, index) => {
                    const indexid = index;
                 
                    return (
                      <FriendCard
                        key={index}
                        isReqFriend={false}
                        friendid={friend}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Friend;
