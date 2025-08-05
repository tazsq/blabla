import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import calender from "../assets/calender.png";
import circle from "../assets/circle.png";
import userpng from "../assets/user.png";
import UserContext from "../contexts/UserContext";
import "../css/FindaRide.css";
import ErrorMessage from "./ErrorMessage";
import FormInput from "./FormInput";
function FindaRide() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengersRequired: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  //scrapping this for while
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setError("");
  //   if (name === "passengersRequired" && (value > 8 || value < 1)) {
  //     setError("Passengers should be less than equal to 8 and greater than 0");
  //     setFormData({
  //       ...formData,
  //       [name]: formData.passengersRequired,
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "passengersRequired" && (value > 8 || value < 1)) {
      setError("Passengers should be less than equal to 8 and greater than 0");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.from ||
        !formData.to ||
        formData.passengersRequired > 8 ||
        formData.passengersRequired < 1
      ) {
        setError("Enter valid fields");
        return;
      }
      const searchParams = new URLSearchParams();
      searchParams.append("from", formData.from.toLowerCase());
      searchParams.append("to", formData.to.toLowerCase());
      searchParams.append("date", formData.date);
      searchParams.append("passengersRequired", formData.passengersRequired);
      // searchParams.append("filter", filter[0]);
      const resp = await axios.get(`/api/routes/?${searchParams.toString()}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log(resp.status);
      if (resp.status === 401) {
        setError("Login expired!");
        return;
      } else if (resp.status === 400) {
        setError("userId missing");
        return;
      }
      if (resp.data.length === 0) {
        setError("you are out of luck :( No routes found");
        return;
      }
      setRides(resp.data);
      console.log(resp.data);
      navigate("/rides", {
        state: { ridesUpper: resp.data },
      });
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };
  if (user === null) {
    return null;
  }
  return (
    <div className="find-a-ride">
      <div className="find-a-ride-header">
        <h1>Find a ride</h1>
      </div>
      <div className="find-a-ride-container">
        <form action="" className="form">
          <FormInput
            icon={circle}
            type="text"
            name="from"
            placeholder="Leaving from"
            value={formData.from}
            handleChange={handleChange}
            required={true}
          />
          <hr className="hr" />
          <FormInput
            icon={circle}
            type="text"
            name="to"
            placeholder="Going to"
            value={formData.to}
            handleChange={handleChange}
            required={true}
          />
          <hr className="hr" />
          <FormInput
            icon={calender}
            type="date"
            name="date"
            placeholder="Today"
            value={formData.date}
            handleChange={handleChange}
            // required={true}
          />
          <hr className="hr" />
          <FormInput
            icon={userpng}
            type="number"
            placeholder="1 passenger"
            max="8"
            name="passengersRequired"
            value={formData.passengersRequired}
            handleChange={handleChange}
            // required={true}
          />

          <div className="submit-container">
            <button
              type="submit"
              onClick={handleSubmit}
              className="find-a-ride-submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {error !== "" ? <ErrorMessage error={error} /> : null}
    </div>
  );
}

export default FindaRide;
