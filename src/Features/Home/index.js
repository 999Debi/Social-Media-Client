import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../Features/Navbar/index";
import UserWidget from "../../Features/Widgets/Userwidget";
import PostsWidget from "../../Features/Widgets/PostsWidget";
import MyPostWidget from "../../Features/Widgets/MyPostWidget";
import Menu from "../MenuMobile/Menu";

const HomePage = () => {
  const ismobile = useMediaQuery("(max-width:699px)");
  const ismedium = useMediaQuery("(max-width:1000px)");
  const { _id, avatar } = useSelector((state) => state.user);

  const ismenuopen = useSelector((state) => state.ismenuopen);

  return (
    <div style={{ position: "relative" }}>
      <div
        className="mobile-menu"
        style={{
          display: `${ismenuopen && (ismedium || ismobile) ? "" : "none"}`,
        }}
      >
        <Menu />
      </div>

      <div
        style={{
          position: "relative",
          display: `${!ismenuopen && ismobile ? "" : "none"}`,
        }}
      >
        <Navbar />
        <div
          width="100%"
          padding="2rem 6%"
          style={{ position: "relative", top: "65px" }}
        >
          <MyPostWidget avatar={avatar} margin="11%" />
          <div style={{ marginTop: "0.35em" }}>
            <PostsWidget userid={_id} />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          display: `${!ismenuopen && !ismobile ? "" : "none"}`,
        }}
      >
        <Navbar />

        <div
          style={{
            width: "100%",
            padding: "2rem 6%",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
          <div style={{ display: `${ismedium ? "none" : "block"}` }}>
            <UserWidget userid={_id} avatar={avatar} />
          </div>

          <div style={{ width: "600px", margin: "4.5em 0" }}>
            <MyPostWidget avatar={avatar} margin="0.4em" />
            <PostsWidget userid={_id} />
          </div>
        </div>
      </div>

    </div>
  );
};
export default HomePage;
