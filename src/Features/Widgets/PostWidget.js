import URL from '../../url'
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Friend from "../../Components/Friend";
import UserImage from "../../Components/UserImage";
import CommentUser from "../../Components/CommentUser";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearModal, setPost } from "../../States/index";
import { IconButton, useMediaQuery } from "@mui/material";

import axios from "axios";
import "../../styles.css";

const PostWidget = ({
  postid,
  postUserid,
  name,
  description,
  picturepath,
  userpicturepath,
  likes,
  comments,
}) => {
  const ismobile = useMediaQuery("(max-width:699px)");
  const [allcomments, setallcomments] = useState(comments);
  const [isComments, setIsComments] = useState(false);
  const [iscommented, setiscommented] = useState(false);
  const [value, setValue] = useState("Write a comment...");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id); // me as auser
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length; //length of likes
  const ispicture = picturepath === undefined ? false : true;
  const patchLike = async () => {
    const { data } = await axios.patch(
      `${URL}/posts/${postid}/like`,
      // `http://localhost:3001/posts/${postid}/like`,
      { userid: loggedInUserId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedPost = data;

    dispatch(setPost({ post: updatedPost }));
  };

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(
        `${URL}/posts/${postid}/comment`,
        // `http://localhost:3001/posts/${postid}/comment`,
        {
          comment: value.trim(),
          userid: loggedInUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPost = data;
      setallcomments(updatedPost.comments);

      setValue("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={isComments ? "comment-modal" : ""}>
      <div
        className={isComments ? "comment-modal-content" : ""}
        style={{
          marginTop: "2%",
          backgroundColor: "#FFFFFF",
          borderRadius: "0.75rem",
          padding: "1.5rem 1.5rem 0.75rem 1.5rem",
          padding: `${
            isComments
              ? "0 1.5rem 0.75rem 1.5rem"
              : "1.5rem 1.5rem 0.75rem 1.5rem"
          }`,
          backgroundColor: "#fefefe",

          overflow: "hidden",
        }}
      >
        <div
          style={
            isComments
              ? {
                  position: "sticky",
                  display: "flex",
                  top: "0px",
                  justifyContent: "space-between",
                  gap: `${ismobile ? "0px" : "24em"}`,
                  backgroundColor: "#fefefe",
                  zIndex: "5",
                  padding: "1em 0",
                  boxShadow: "0px 0.1em rgb(226, 217, 217)",
                }
              : { display: "none" }
          }
        >
          {ismobile && (
            <div
              onClick={() => {
                dispatch(clearModal());
                setIsComments(false);
              }}
            >
              <ArrowBackIcon
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "#d4d8de",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
              />
            </div>
          )}

          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.3em",
              textAlign: "center",
              margin: "auto",
            }}
          >
            {name}'s post
          </p>

          {!ismobile && (
            <div
              onClick={() => {
                dispatch(clearModal());
                setIsComments(false);
              }}
            >
              <CloseIcon
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "#d4d8de",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
              />
            </div>
          )}
        </div>

        <div>
          <Friend
            name={name}
            userpicturepath={userpicturepath}
            postUserid={postUserid}
          />

          <p>{description}</p>

          {ispicture &&
          picturepath.substring(picturepath.length - 4) === ".mp4" ? (
            <video
              width="100%"
              height="auto"
              alt="Video"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`${URL}/assets/${picturepath}`}
              controls
            ></video>
          ) : (
            ispicture && (
              <img
                width="100%"
                height="100%"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={`${URL}/assets/${picturepath}`}
              />
            )
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IconButton onClick={patchLike}>
                  {isLiked ? (
                    <FavoriteOutlined sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                  {/* { <FavoriteOutlined /> } */}
                </IconButton>
                <p>{likeCount}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IconButton onClick={() => setIsComments(!isComments)}>
                  <ChatBubbleOutlineOutlined />
                </IconButton>

                <p>{comments.length}</p>
              </div>
            </div>
          </div>

          {isComments && (
            <div className="comment-section">
              {allcomments.map((element, i) => (
                <div className="comment">
                  <CommentUser image={element[2]} />
                  <div className="content">
                    <span style={{ "font-weight": "600", fontSize: "0.9em" }}>
                      {element[0]}
                    </span>
                    <p>{element[1]}</p>
                  </div>
                </div>
              ))}

              <hr></hr>
              <form
                onSubmit={(e) => {
                  handleComment(e);
                  setiscommented(!iscommented);
                }}
                style={{ display: `${isComments ? "none" : ""}` }}
              >
                <UserImage image={user.picturepath} size="30px" />

                <div
                  contentEditable
                  suppressContentEditableWarning
                  placeholder="Write a comment..."
                  onInput={(e) => setValue(e.target.innerText)}
                ></div>

                <button type="submit" style={{ backgroundColor: "white" }}>
                  <SendIcon sx={{ color: "#645cff" }} />
                </button>
              </form>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            handleComment(e);
            setiscommented(!iscommented);
          }}
          style={{
            position: "sticky",
            display: `${isComments ? "flex" : "none"}`,
            justifyContent: "space-between",
            bottom: "-13px",
            padding: "1em 0",
            backgroundColor: "#fefefe",
          }}
        >
          <UserImage image={user.picturepath} size="30px" />

          <div
            contentEditable
            suppressContentEditableWarning
            placeholder="Write a comment..."
            onInput={(e) => setValue(e.target.innerText)}
          ></div>

          <button type="submit" style={{ backgroundColor: "white" }}>
            <SendIcon sx={{ color: "#645cff" }} />
          </button>
        </form>
      </div>
    </div>
  );
};
export default PostWidget;
