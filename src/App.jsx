import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./authGuard/AuthGuard";
import { ToastContainer } from "react-toastify";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Analytics from "./pages/Analytics";
import Favorites from "./pages/Favorites";

const DefaultRoute = () => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  if (loginData) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
};

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <DefaultRoute />,
    },
    {
      path: "/login",
      element: (
        <AuthGuard required={false}>
          <Login />
        </AuthGuard>
      ),
    },
    {
      path: "/register",
      element: (
        <AuthGuard required={false}>
          <Register />
        </AuthGuard>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <AuthGuard required={true}>
          <Dashboard />
        </AuthGuard>
      ),
    },
    {
      path: "/createpost",
      element: (
        <AuthGuard>
          <CreatePost />
        </AuthGuard>
      ),
    },
    {
      path: "/edit-post/:id",
      element: (
        <AuthGuard>
          <CreatePost />
        </AuthGuard>
      ),
    },
    {
      path:"/postdetails/:id",
      element:(
        <AuthGuard>
          <PostDetails />
        </AuthGuard>
      ),
    },
    {
      path:"/analytics",
      element:(
        <AuthGuard>
          <Analytics />
        </AuthGuard>
      ),
    },
    {
      path:"/favorites",
      element:(
        <AuthGuard>
          <Favorites/>
          </AuthGuard>
      ),
    },
  ]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <RouterProvider router={route} />
    </>
  );
}

export default App;