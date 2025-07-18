"use client";
import "../css/RideCard.css";
import rightArrow from "../assets/right-arrow.png";

function RideCard({ ride, onBookRide }) {
  console.log(ride.driver);
  const formatDate = (dateString) => {
    if (!dateString) return "Today";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="ride-card">
      <div className="ride-card-header">
        <div className="route-info">
          <div className="route-cities">
            <span className="from-city">{ride.from}</span>
            <img
              src={rightArrow || "/placeholder.svg"}
              alt="to"
              className="route-arrow"
            />
            <span className="to-city">{ride.to}</span>
          </div>
          <div className="route-date">{formatDate(ride.date)}</div>
        </div>
        <div className="ride-price">
          <span className="price-amount">₹{ride.price || "250"}</span>
          <span className="price-label">per seat</span>
        </div>
      </div>

      <div className="ride-card-body">
        <div className="driver-info">
          <div className="driver-avatar">{getInitials(ride.driver?.name)}</div>
          <div className="driver-details">
            <div className="driver-name">
              {ride.driver?.name || "Unknown Driver"}
            </div>
            <div className="driver-rating">
              <span className="rating-stars">★★★★☆</span>
              <span className="rating-text">
                4.2 • {ride.driver.createdRoutes.length} trips
              </span>
            </div>
          </div>
        </div>

        <div className="ride-details">
          <div className="departure-time">
            <span className="time">{ride.departureTime || "10:30 AM"}</span>
            <span className="time-label">Departure</span>
          </div>
          <div className="available-seats">
            <span className="seats-count">
              {ride.passengerCapacity - ride.passengers.length || "??"}
            </span>
            <span className="seats-label">seats left</span>
          </div>
        </div>
      </div>

      <div className="ride-card-footer">
        <button
          className="book-ride-btn"
          onClick={() => onBookRide && onBookRide(ride)}
        >
          Book Ride
        </button>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  );
}

export default RideCard;
