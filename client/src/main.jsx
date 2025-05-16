import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import userStore from "./store/index.js";
import Chats from "./components/Chats.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Login></Login>,
      },
      { path: "/signUp", element: <SignUp></SignUp> },
      {path: '/chats', element:<Chats></Chats>}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={userStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
