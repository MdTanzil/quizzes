// routes.js
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Leaderboard from "../pages/Leaderboard";
import Login from "../pages/Login";
import QuizPage from "../pages/QuizPage";
import Register from "../pages/Register";
import Result from "../pages/Result";
import Root from "../pages/Root";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/quiz/:id",
        element: (
          <PrivateRoute>
            <QuizPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/results/:id",
        element: <Result />,
      },

      {
        path: "/leaderboard/:id",
        element: <Leaderboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
