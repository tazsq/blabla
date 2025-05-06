import React, { useEffect } from "react";
import "../css/FindaRide.css";
import FormInput from "./FormInput";
import circle from "../assets/circle.png";
import calender from "../assets/calender.png";
import user from "../assets/user.png";
import { useState } from "react";

function FindaRide() {
  const [formData, setFormData] = useState({
    from: "",
    goingTo: "",
    date: "",
    passengerCount: "",
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
          />
          <hr className="hr" />
          <FormInput
            icon={circle}
            type="text"
            name="goingTo"
            placeholder="Going to"
            value={formData.goingTo}
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
            icon={user}
            type="number"
            placeholder="1 passenger"
            max="8"
            name="passengerCount"
            value={formData.passengerCount}
            handleChange={handleChange}
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
    </div>
  );
}

export default FindaRide;
