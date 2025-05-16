import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addUser: (store, action) => {
      return action.payload;
    },
  },
});

const receiverSlice = createSlice({
  name: "receiver",
  initialState: {},
  reducers: {
    addreceiver: (store, action) => {
      return action.payload;
    },
  },
});

const userStore = configureStore({
  reducer: {
    user: userSlice.reducer,
    receiver: receiverSlice.reducer,
  },
});

export const receiverAction = receiverSlice.actions;
export const userAction = userSlice.actions;
export default userStore;

// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();
// dispatch(movieListAction.addToList(res.data.movies));

// const movie = useSelector((store) => store.favourite);

// import { createSlice } from "@reduxjs/toolkit";
// import { configureStore } from "@reduxjs/toolkit";

// const movieSlice = createSlice({
//   name: "movies",
//   initialState: [],
//   reducers: {
//     addToList: (store, action) => {
//       store = action.payload;
//       return store;
//     },
//   },
// });

// const favStore = configureStore({
//   reducer: {
//     favourite: favSlice.reducer,
//     movies: movieSlice.reducer,
//     search: searchSlice.reducer
//   },
// });

// export const searchAction = searchSlice.actions;
// export const movieListAction = movieSlice.actions;
// export const favAction = favSlice.actions;
// export default favStore;
