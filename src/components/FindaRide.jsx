import React from "react";
import "../css/FindaRide.css";
import FormInput from "./FormInput";
import circle from "../assets/circle.png";
import calender from "../assets/calender.png";
import user from "../assets/user.png";
function FindaRide() {
  return (
    <div className="find-a-ride">
      <div className="find-a-ride-header">
        <h1>Find a ride</h1>
      </div>
      <div className="find-a-ride-container">
        <form action="" className="form">
          <FormInput icon={circle} type="text" placeholder="Leaving from" />
          <hr className="hr" />
          <FormInput icon={circle} type="text" placeholder="Going to" />
          <hr className="hr" />
          <FormInput icon={calender} type="date" placeholder="Today" />
          <hr className="hr" />
          <FormInput
            icon={user}
            type="number"
            placeholder="1 passenger"
            max="8"
          />

          <div className="submit-container">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
              }}
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
