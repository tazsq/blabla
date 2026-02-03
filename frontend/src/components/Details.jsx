import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import flashIcon from "../assets/flash.png";
import "../css/Details.css";
function formatDate(dateString) {
  // Create a Date object. Adding 'T00:00:00' prevents timezone issues.
  const date = new Date(dateString + "T00:00:00");

  // Define the desired format
  const options = {
    weekday: "long", // e.g., "Saturday"
    day: "numeric", // e.g., "12"
    month: "long", // e.g., "July"
  };

  // Create a formatter and return the formatted date string
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
function Details() {
  let navigate = useNavigate();
  const data = {
    from: "kota",
    to: "mumbai",
    date: "2025-07-12",
    passengerCapacity: 5,
    driver: {
      $oid: "6854b9dc8c64597fa499ef71",
    },
    passengers: [
      {
        $oid: "6854b9dc8c64597fa499ef71",
      },
      {
        $oid: "6854b9dc8c64597fa499ef71",
      },
    ],
    __v: 2,
  };
  const formattedDate = formatDate(data.date);
  return (
    <div className="ride-detail-wrapper">
      <div className="ride-detail">
        <div className="ride-detail-head">
          <span className="ride-detail-date">{formattedDate}</span>
        </div>
        <div className="ride-detail-body">
          <div className="ride-detail-left">
            <div className="from-to-container"></div>
          </div>
          <div className="ride-detail-right">
            <div className="ride-details-right__summary-top"></div>
            <div className="ride-details-right__summary-passengers"></div>
            <div className="book-a-ride-btn-container">
              <button
                type="submit"
                // onClick={handleSubmit}
                className="book-a-ride-btn"
              >
                <span className="book-a-ride-btn__span">
                  <img src={flashIcon} alt="" height={"20px"} />
                  <p>Book</p>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
