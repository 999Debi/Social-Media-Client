import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  mode: "light",
  userLoading: true,
  isModal: false,
  Modaltext: "",
  alertText: "",
  alertType: "",
  isLoading: true,
  showAlert: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  posts: [],
  ismenuopen: false,
  aboutuser: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setmenuopen: (state, action) => {
      if (state.ismenuopen === true) {
        state.ismenuopen = false;
      } else if (state.ismenuopen === false) {
        state.ismenuopen = true;
      }
    },

    setModal: (state, action) => {
      state.isModal = true;
      if (action.payload.msg !== "") {
        state.Modaltext = action.payload.msg;
      }
    },
    clearModal: (state, action) => {
      state.isModal = false;
      state.Modaltext = "";
    },

    setAlert: (state, action) => {
      state.showAlert = true;
      state.alertType = action.payload.alertType;
      state.alertText = action.payload.alertText;
    },
    clearAlert: (state, action) => {
      state.showAlert = false;
      state.alertType = "";
      state.alertText = "";
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },

    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setPicture: (state, action) => {
      state.user.avatar = action.payload.avatar;
    },
    setaboutuser: (state, action) => {
      const obj = {};
      const about = Object.entries(action.payload);

      about.map((ele) => {
        obj[ele[0]] = ele[1];
      });
      state.aboutuser = obj;
      state.user.About = obj;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      }
    },
    setReqFriend: (state, action) => {
      if (state.user) {
        state.user.requestedFriend = action.payload.reqFriend;
      }
    },
    setFriendInfo: (state, action) => {
      if (state.user) {
        state.friends = action.payload.friends;
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUser,
  setmenuopen,
  setPicture,
  setaboutuser,
  setModal,
  clearModal,
  setReqFriend,
  setAlert,
  clearAlert,
  setLoading,
} = authSlice.actions;
export default authSlice.reducer;
