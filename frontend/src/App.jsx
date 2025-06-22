import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import FindaRide from "./components/FindaRide";
import Login from "./components/Login";
import loginService from "./services/login";
import Signup from "./components/Signup";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      loginService.setToken(user.token);
    }
  }, []);
  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };
  // const [count, setCount] = useState(0);
  // const [routes, setRoutes] = useState([]);
  // const baseUrl = "/api";
  // const hook = () => {
  //   axios.get(`${baseUrl}/routes/`).then((resp) => {
  //     console.log(resp.data);
  //     setRoutes(resp.data);
  //   });
  // const addRoute = () => {
  //   const newRoute = {
  //     from: "nashik",
  //     to: "nagpur",
  //   };
  //   // axios
  //   //   .post("http://localhost:3000/api/routes", newRoute)
  //   //   .then((resp) => console.log(resp));
  // };
  // addRoute();
  // };
  // useEffect(hook, []);
  // console.log(user);
  return (
    <div className="app">
      <Navbar user={user} handleLogout={handleLogout} />
      {user === null ? <Login setUser={setUser} /> : <FindaRide />}
      <Signup setUser={setUser} />
      {/* <FindaRide /> */}
      {/* <Calendar /> */}
      {/* <Sidebar /> */}
    </div>
  );
}

export default App;
