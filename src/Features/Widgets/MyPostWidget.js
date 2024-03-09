import URL from '../../url'
import {
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";

import {

  InputBase,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import Dropzone from "react-dropzone";
import UserImage from "../../Components/UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../States/index";
import "../../styles.css";

const MyPostWidget = ({ avatar , isPro = false, margin }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setvideo] = useState(null);
  const [post, setPost] = useState("");
  const [profile, setProfile] = useState(false);

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const ismobile = useMediaQuery("(max-width: 699px)");

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userid", user._id);
    formData.append("description", post);
    formData.append("useravatar", user.avatar);
    if (image) {
      formData.append("picture", image);
      // formData.append("picturepath", image.name);
    }
    if (video) {
      formData.append("picture", video);
      // formData.append("picturepath", video.name);
    }

    const response = await fetch(`${URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setvideo(null);
    setPost("");
    setIsImage(false);
    setIsVideo(false);
  };

  // const handleprofile = () => {
  //   if (isPro) {
  //     setProfile(true);
  //   }
  // };
  if (isPro) {
    return null;
  }

  return (
    <div
      style={{
        // marginTop: "11%",
        marginTop: { margin },
        marginBottom: { margin },
        backgroundColor: "#FFFFFF",
        borderRadius: "0.75rem",
        padding: "1.5rem 1.5rem 0.75rem 1.5rem",
      }}
    >
      <div className="flexbox">
        <UserImage image={avatar} />

        {!profile ? (
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "80%",

              backgroundColor: "#F0F0F0",
              borderRadius: "2rem",
              padding: "0.3rem 1.5rem",
            }}
          />
        ) : null}
      </div>

      {isImage && (
        <div
          style={{
            border: `1px solid black`,
            borderRadius: "5px",
            marginTop: "1rem",
            padding: "1rem",
          }}
        >
          <Dropzone
            // acceptedFiles=".jpg,.jpeg,.png"
            acceptedFiles={
              ismobile ? ".jpg,.jpeg,.png,.mp4" : ".jpg,.jpeg,.png"
            }
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div>
                <div
                  {...getRootProps()}
                  style={{
                    border: `2px dashed green`,
                    padding: "1rem",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p style={{ textAlign: "center" }}>Drag And Drop</p>
                  ) : (
                    <div className="flexbox">
                      <p>{image.name}</p>
                      <EditOutlined />
                    </div>
                  )}
                </div>
                {image && (
                  <IconButton onClick={() => setImage(null)}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}

      {isVideo && (
        <div
          style={{
            border: `1px solid black`,
            borderRadius: "5px",
            marginTop: "1rem",
            padding: "1rem",
          }}
        >
          <Dropzone
            acceptedFiles=".mp4"
            multiple={false}
            onDrop={(acceptedFiles) => setvideo(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div>
                <div
                  {...getRootProps()}
                  style={{
                    border: `2px dashed green`,
                    padding: "1rem",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />
                  {!video ? (
                    <p style={{ textAlign: "center" }}>Drag And Drop</p>
                  ) : (
                    <div className="flexbox">
                      <p>{video.name}</p>
                      <EditOutlined />
                    </div>
                  )}
                </div>
                {video && (
                  <IconButton onClick={() => setvideo(null)}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}

      <hr></hr>
      {
        <div className="flexbox">
          <>
            <div
              onClick={() => {
                setIsImage(!isImage);
                if (isVideo) setIsVideo(false);
              }}
              style={{ cursor: "pointer" }}
              className="flexbox"
            >
              <InsertPhotoIcon sx={{ color: "#09a747" }} />
              <span>{ismobile ? "Image/Video" : "Image"}</span>
            </div>

            <div
              className="flexbox"
              style={{
                cursor: "pointer",
                display: `${ismobile ? "none" : ""}`,
              }}
              onClick={() => {
                setIsVideo(!isVideo);
                if (isImage) setIsImage(false);
              }}
            >
              <PlayCircleFilledIcon sx={{ color: "red" }} />
              <span>Video</span>
              {/* <h4>Video</h4> */}
    
            </div>
          </>

          <Button
            disabled={!post && !image && !video}
            sx={{
              color: "#645cff",
            }}
            onClick={handlePost}
            style={{ borderRadius: "3rem" ,}}
          >
            <span>POST</span>
          </Button>
        </div>
      }
    </div>
  );
};
export default MyPostWidget;
