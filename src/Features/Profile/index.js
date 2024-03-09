
import origin from '../../url'
import { useMediaQuery } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { json, useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";



import EditProfile from "../../Components/Modals/EditProfile";
import MyPostWidget from "../../Features/Widgets/MyPostWidget";
import PostsWidget from "../../Features/Widgets/PostsWidget";

import UserImage from "../../Components/UserImage";
import Navbar from "../Navbar/index";
import ProfileFriend from "../../Components/ProfileFriend";
import AboutForm from "./ProfileInfo/AboutForm";
import AboutInfo from "./ProfileInfo/AboutInfo";

import {clearModal,setReqFriend,setFriends } from "../../States";
import Menu from "../MenuMobile/Menu";
import axios from "axios";

const ProfilePage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:700px)");
  const ismobile = useMediaQuery("(max-width:699px)");
  const ismedium = useMediaQuery("(max-width:1000px)");

  const { ismenuopen, isModal } = useSelector((state) => state);

  const [User, setUser] = useState(null);

  const [friendStatus, setfriendStatus] = useState({});
  
  const [profileaction, setprofileaction] = useState({
    about: false,
    friend: false,
    post: true,
    edit: false,
  });

  const [updatedpic, setupdatedpic] = useState({});
  const { userid } = useParams();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [files, setFiles] = useState([]);

  const setdisplay = (e) => {
    if (profileaction.edit === true) return;

    if (e.target.innerHTML === "About") {
      setprofileaction({
        friend: false,
        friend: false,
        about: true,
        edit: false,
      });
    }
    if (e.target.innerHTML === "Friends") {
      setprofileaction({
        friend: true,
        post: false,
        about: false,
        edit: false,
      });
    }
    if (e.target.innerHTML === "Posts") {
      setprofileaction({
        friend: false,
        post: true,
        about: false,
        edit: false,
      });
    }
  };

  const getUser = async () => {
    const { data } = await axios.get(
      `${origin}/users/${userid}`,
      // `http://localhost:3001/users/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
 setUser(data);

  };

    const makeFriend = async () => {
      try {
        const { data } = await axios.patch(
          `${origin}/users/${user._id}/${User._id}/add`,
          // `http://localhost:3001/users/${user._id}/${User._id}/add`,

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
  
      }
    };

  const sendReqfriend = async () => {
    try {
      const { data } = await axios.patch(
        `${origin}/users/${user._id}/${User._id}/request`,
        // `http://localhost:3001/users/${user._id}/${User._id}/request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
   
    }
  };

  const cancelFriend = async () => {
    try {
      const { data } = await axios.patch(
        `${origin}/users/${user._id}/${User._id}/cancel`,
        // `http://localhost:3001/users/${user._id}/${User._id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setReqFriend({reqFriend:data}));
    } catch (error) {
     
    }
  };

  const cancelSentReq = async () => {
    try {
      const { data } = await axios.patch(
        `${origin}/users/${user._id}/${User._id}/cancelSentReq`,
        // `http://localhost:3001/users/${user._id}/${User._id}/cancelSentReq`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (error) {

    }
  };

  const unFriend = async () => {
    try {
      const { data } = await axios.patch(
        `${origin}/users/${user._id}/${User._id}/unfriend`,
        // `http://localhost:3001/users/${user._id}/${User._id}/unfriend`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
   dispatch(setFriends({ friends: data }));

    } catch (error) {
   
    }
  };

  const handlefriend = async (e) => {
   
    if (e.target.innerText==="Confirm") {
      await makeFriend();
          console.log(friendStatus );
          console.log("before")
         setfriendStatus({
           alreadyFriend: true,
           isRequest: false,
           touserRequest: false,
         });
         console.log(friendStatus);
         console.log("after");

    }
    // return ;
   else if (friendStatus.alreadyFriend) {
      await unFriend();
      
      setfriendStatus({

        alreadyFriend: false,
        isRequest: false,
        touserRequest: false,
      });
      console.log(friendStatus)
     
    } else if (friendStatus.isRequest) {
           
      await cancelSentReq();

      setfriendStatus({

        alreadyFriend: false,
        isRequest: false,
        touserRequest: false,
      });
    } else if (friendStatus.touserRequest) {
            
     await cancelFriend();
     console.log(friendStatus);
      setfriendStatus({
        
        // alreadyFriend: false,
        // isRequest: false,
        // touserRequest: false,
      });
      
              
    }
     else if (!friendStatus.isRequest) {
      await sendReqfriend();
      setfriendStatus({
       
        alreadyFriend: false,
        isRequest: true,
        touserRequest: false,
      });
    }

  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setupdatedpic(acceptedFiles[0]);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });



  const thumbs = files.map((file) => (  
    <div>
      <UserImage src={file.preview} size={150} />
    </div>
  ));




  useEffect(() => {
    getUser();


   
    // files.forEach((file) => URL.revokeObjectURL(file.preview));
    files.pop();
  }, [profileaction.edit]);

  if (!User) return null;
  // if(userid!=={user._id)
  const { firstname, lastname, avatar, friends, requestedFriend } = User;

  // const { Graduationyear, Specialization, Skills, Work, Clubs, Hobbies } =
  //   User.About;


  friends.map((friendid) => {

    if (!friendStatus.alreadyFriend && friendid === user._id) {
     
      setfriendStatus({ touserRequest:false,isRequest:false, alreadyFriend: true });
  
    }
  });

   for(let i=0;i<requestedFriend.length;i++){
    if ( !friendStatus.isRequest && requestedFriend[i][0] === user._id){
      setfriendStatus({touserRequest:false,alreadyFriend:false,isRequest:true});
      break;
    }
   }

        for (
          let i = 0;
          i <
          (user.requestedFriend.length === 0
            ? -1
            : user.requestedFriend.length);
          i++
        ) {
          if (
            !friendStatus.touserRequest &&
            user.requestedFriend[i][0] === userid
          ) {
      
            setfriendStatus({
              touserRequest: true,
              isRequest: false,
              alreadyFriend: false,
            });

     
     
          }
        }

  if (isModal) {
    setTimeout(() => {
      dispatch(clearModal());
    }, 3000);
  }

  return (
    <div style={{ position: "relative" }}>
      {isModal && <EditProfile />}

      <div
        style={{
          display: `${ismenuopen && (ismedium || ismobile) ? "" : "none"}`,
        }}
      >
        <Menu />
      </div>

      <div
        style={{
         
          display: `${ismenuopen && (ismedium || ismobile) ? "none" : ""}`,
        }}
      >
        <div
          style={{
            display: `${
              !isNonMobileScreens && profileaction.edit ? "none" : ""
            }`,
          }}
        >
          <Navbar />
        </div>

        <div
          style={{
            position: "relative",
            top: "5em",
            display: `${
              !isNonMobileScreens && profileaction.edit ? "none" : ""
            }`,
          }}
        >
          <div className="profile-img">
            <UserImage image={avatar} size={150} />
            <div className="profile-info">
              <h2 style={{}}>{firstname + " " + lastname}</h2>
              <p style={{ fontWeight: "500" }}>{friends.length} Friends</p>

              {!(user._id === userid) && (
                <>
                  <button
                    className="profile-btn"
                    style={{
                      backgroundColor: `${
                        friendStatus.alreadyFriend || friendStatus.isRequest
                          ? "rgb(212, 217, 224)"
                          : ""
                      }`,
                      color: `${
                        friendStatus.alreadyFriend || friendStatus.isRequest
                          ? "black"
                          : ""
                      }`,
                    }}
                    onClick={(e) => handlefriend(e)}
                  >
                    {friendStatus.touserRequest === true
                      ? "Confirm"
                      : friendStatus.alreadyFriend === true
                      ? "Unfriend"
                      : `${friendStatus.isRequest ? "Cancel" : "Add friend"}`}
                  </button>

                  {friendStatus.touserRequest === true ? (
                    <button
                      className="profile-btn"
                      onClick={handlefriend}
                      style={{
                        backgroundColor: "rgb(212, 217, 224)",
                        color: "black",
                      }}
                    >
                      Remove
                    </button>
                  ) : (
                    ""
                  )}
                </>
              )}

              {user._id === userid && (
                <button
                  className="profile-btn"
                  style={{ backgroundColor: "#bcc0c4" }}
                  onClick={() => {
                    setprofileaction({
                      post: false,
                      friend: false,
                      about: false,
                      edit: true,
                    });
                  }}
                >
                  <EditIcon sx={{ color: "black" }} />
                  <span
                    style={{
                      position: "relative",
                      bottom: "5px",
                      color: "black",
                    }}
                  >
                    Edit Profile
                  </span>
                </button>
              )}
            </div>
          </div>

          {isNonMobileScreens && (
            <>
              <hr style={{ width: "350px", margin: "auto" }}></hr>
              <div className="info-bar flex-center">
                <span onClick={(e) => setdisplay(e)}>About</span>
                <span onClick={(e) => setdisplay(e)}>Friends</span>
                <span onClick={(e) => setdisplay(e)}>Posts</span>
              </div>
            </>
          )}
        </div>

        {!isNonMobileScreens && !profileaction.edit && (
          <div style={{ position: "relative", top: "5em" }}>
            <div className="mobile-post">
          
                <MyPostWidget avatar={avatar} isPro={true} />

              <PostsWidget userid={userid} isProfile={true} />
            </div>
          </div>
        )}

        {profileaction.friend && (
          <div
            style={{
              position: "relative",
              top: "7em",
              width: "70vw",
              // height:"400px",

              minWidth: `${isNonMobileScreens ? "500px" : "0px"}`,
              margin: "auto",
              backgroundColor: "#ffffff",
              borderRadius: "14px",
            }}
          >
            <h2 style={{ textAlign: "center", padding: "1em 0" }}>Friends</h2>

            {friends.length === 0 ? (
              <h3 style={{ textAlign: "center" }}> No friends</h3>
            ) : (
              ""
            )}
            <div className="profile-friend-grid">
              {friends.map((friendid, index) => {
                return (
                  <ProfileFriend
                    friendid={friendid}
                    iscard={true}
                    key={friendid}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* posts */}
        {profileaction.post && (
          <div
            style={{
              position: "relative",
              // top: "7em",
              top: "7em",
              width: "50vw",
              minWidth: `${isNonMobileScreens ? "500px" : "0px"}`,
              display: `${isNonMobileScreens ? "block" : "none"}`,
              margin: "auto",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                backgroundColor: "#ffffff",
                borderRadius: "0.75rem 0.75rem 0 0 ",
                padding: "1em 0px",
                boxShadow: " 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                marginBottom: "1em",
              }}
            >
              All Post
            </h2>
            <MyPostWidget avatar={avatar} isPro={true} />

            <PostsWidget userid={userid} isProfile={true} />
          </div>
        )}

        {/* about */}
        {/* {about && <AboutInfo User={User} />} */}
        {profileaction.about && <AboutInfo User={User} />}

        {/* edit profile */}

        {profileaction.edit && (
          <div
            style={{
              // position: `${isNonMobileScreens ? "relative" : "absolute"}`,
              position: `${isNonMobileScreens ? "relative" : "absolute"}`,
              top: `${isNonMobileScreens ? "7em" : ""}`,
              width: `${isNonMobileScreens ? "70vw" : "100vw"}`,

              // zIndex: `${isNonMobileScreens ? "" : "3"}`,
              margin: "auto",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: `${!isNonMobileScreens ? "" : "1em 1em 0 0 "}`,
                display: "flex",
                justifyContent: `${
                  isNonMobileScreens ? "space-between" : "left"
                }`,
                width: `${!isNonMobileScreens ? "100%" : " "}`,
                position: `${!isNonMobileScreens ? "fixed" : " "}`,
                zIndex: `${!isNonMobileScreens ? "3" : " "}`,
                paddingTop: `${!isNonMobileScreens ? "1em" : ""}`,
                boxShadow: "0px 0.1em 5px rgb(226, 217, 217)",
              }}
            >
              <ArrowBackIcon
                sx={{ display: `${!isNonMobileScreens ? "" : "none"}` }}
                onClick={() =>
                  setprofileaction({ ...profileaction, edit: false })
                }
              />

              <h4
                style={{
                  textAlign: "left",
                  paddingLeft: "2em",

                  margin: `${isNonMobileScreens ? "auto" : ""}`,
                }}
              >
                Edit Profile
              </h4>

              <div
                style={{
                  cursor: "pointer",
                  display: `${!isNonMobileScreens ? "none" : " "}`,

                  // backgroundColor: "#e2e8f0",
                  // padding: "0.4em",
                  // Margin: "0.1em",
                }}
                onClick={() =>
                  setprofileaction({ ...profileaction, edit: false })
                }
              >
                <CloseIcon
                  sx={{
                    "&:hover": {
                      backgroundColor: "#e2e8f0",
                    },
                  }}
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                position: `${!isNonMobileScreens ? "relative" : ""}`,
                top: `${!isNonMobileScreens ? "45px" : ""}`,
              }}
            >
              <div
                className="flex-box"
                style={{
                  padding: "20px 2.5rem 0px ",
                  backgroundColor: "#ffffff",
                  // borderRadius: "0 0 1em 1em",
                }}
              >
                <p style={{ fontWeight: "550" }}>Profile Picture</p>

                {files.length == 0 && (
                  <UserImage image={user.avatar} size={100} />
                )}
                {files.length != 0 && thumbs}
                <div
                  {...getRootProps()}
                  style={{
                    width: "50px",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />

                  <p style={{ textAlign: "center", color: "#645cff" }}>Edit</p>
                </div>
              </div>

              <AboutForm updatedpic={updatedpic} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
