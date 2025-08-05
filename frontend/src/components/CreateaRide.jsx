import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import calender from "../assets/calender.png";
import circle from "../assets/circle.png";
import userpng from "../assets/user.png";
import UserContext from "../contexts/UserContext";
import "../css/FindaRide.css";
import routeService from "../services/routeService";
import ErrorMessage from "./ErrorMessage";
import FormInput from "./FormInput";
import SuccessMsg from "./SuccessMsg";
function CreateaRide() {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengerCapacity: "",
    startTime: "",
    endTime: "",
  });
  const [successmsg, setSuccessmsg] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  if (user === null) {
    return null;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setSuccessmsg("");
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "passengerCapacity" && (value > 8 || value < 1)) {
      setError("Passengers should be less than equal to 8 and greater than 0");
    } else {
      setError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.date ||
        !formData.from ||
        formData.passengerCapacity > 8 ||
        formData.passengerCapacity < 1 ||
        !formData.to ||
        !formData.startTime ||
        !formData.endTime
      ) {
        setError("Enter all values");
        setSuccessmsg("");
        return;
      }
      if (!user) {
        console.log("cant be submitted. Login first bitch~");
        return;
      }
      const response = await routeService.create(formData, user.token);
      console.log(response);
      setSuccessmsg("Route created successfully");
    } catch (error) {
      if (error.status === 500)
        setError("Server not working~ Not your problem~!");
      else if (error.status === 401) {
        setError("Token expired, login again!");
        setSuccessmsg("");
      } else if (error.status === 400) {
        setError("UserId missing or not valid");
        setSuccessmsg("");
      } else {
        setError("somehow crashed");
        setSuccessmsg("");
      }
      console.log(error);
    }
  };
  return (
    <div className="find-a-ride">
      <div className="find-a-ride-header">
        <h1>Create a ride</h1>
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
          />
          <hr className="hr" />
          <FormInput
            icon={circle}
            type="text"
            name="to"
            placeholder="Going to"
            value={formData.to}
            handleChange={handleChange}
          />
          <hr className="hr" />
          <FormInput
            icon={calender}
            type="date"
            name="date"
            placeholder="Today"
            value={formData.date}
            handleChange={handleChange}
          />
          <hr className="hr" />
          <FormInput
            icon={userpng}
            type="number"
            placeholder="1 passenger"
            max="8"
            name="passengerCapacity"
            value={formData.passengerCapacity}
            handleChange={handleChange}
          />
          <hr className="hr" />

          <FormInput
            icon={userpng}
            type="time"
            placeholder="Enter start time"
            name="startTime"
            value={formData.startTime}
            handleChange={handleChange}
          />
          <hr className="hr" />

          <FormInput
            icon={userpng}
            type="time"
            placeholder="Enter end time"
            name="endTime"
            value={formData.endTime}
            handleChange={handleChange}
          />

          <div className="submit-container">
            <button
              type="submit"
              onClick={handleSubmit}
              className="find-a-ride-submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
      {error !== "" ? <ErrorMessage error={error} /> : null}
      {successmsg !== "" ? <SuccessMsg msg={successmsg} /> : null}
    </div>
  );
}

export default CreateaRide;
