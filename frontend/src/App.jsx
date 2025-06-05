import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import FindaRide from "./components/FindaRide";
import axios from "axios";
import Sidebar from "./components/Sidebar";
function App() {
  const [count, setCount] = useState(0);
  const [routes, setRoutes] = useState([]);
  const hook = () => {
    axios.get("http://localhost:4001/api/routes").then((resp) => {
      console.log(resp.data);
      setRoutes(resp.data);
    });
    // const addRoute = () => {
    //   const newRoute = {
    //     from: "nashik",
    //     to: "nagpur",
    //   };
    //   // axios
    //   //   .post("http://localhost:4001/api/routes", newRoute)
    //   //   .then((resp) => console.log(resp));
    // };
    // addRoute();
  };
  useEffect(hook, []);
  return (
    <div className="app">
      <Navbar />
      <FindaRide />
      {/* <Calendar /> */}
      {/* <Sidebar /> */}
    </div>
  );
}

export default App;
