import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
// import axios from "axios";
// fetch("http://localhost:3001/routes")
//   .then((resp) => {
//     return resp.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });
// const data = await resp.json();
// const promise = axios.get("http://localhost:3001/routes");
// promise.then((resp) => console.log(resp.data));
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
