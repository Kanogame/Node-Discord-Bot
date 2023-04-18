import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles.css";

import Root from "./routes/root";
import Player from "./routes/player"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      path: "contacts/:contactId",
      element 
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);