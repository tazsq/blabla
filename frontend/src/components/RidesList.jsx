"use client";

import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../css/RidesList.css";
import routeService from "../services/routeService";
import Filter from "./Filter";
import RideCard from "./RideCard";

function RidesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const ridesUpper = location.state?.ridesUpper;
  const [rides, setRides] = useState(ridesUpper || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    tags: [],
    date: "",
  });
  useEffect(() => {
    if (ridesUpper && ridesUpper.length > 0) {
      setRides(ridesUpper);
      setLoading(false);
    } else {
      navigate("/find");
      setRides([]); // Clear out rides when empty input
      setLoading(false); // Set to false anyway after processing
    }
  }, [ridesUpper, navigate]);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };
  // const fetchRides = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get("/api/routes/getAllRides", {
  //       headers: { Authorization: `Bearer ${user.token}` },
  //     });
  //     setRides(response.data);
  //     setError("");
  //   } catch (err) {
  //     setError("Failed to load rides. Please try again.");
  //     console.error("Error fetching rides:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleBookRide = async (ride) => {
    // Handle booking logic here
    console.log("Booking ride:", ride);
    alert(`Booking ride from ${ride.from} to ${ride.to}`);
    const resp = await routeService.bookRide(user.token, ride);
    console.log(
      rides.map((r) => {
        return r.id === resp.data.savedRoute.id ? resp.data.savedRoute : r;
      })
    );
    // setRides(
    //   rides.map((r) => {
    //     r.id === resp.data.savedRoute.id ? resp.data.savedRoute : r;
    //   })
    // );
    console.log(resp.data);
  };

  const filteredRides = rides.filter((ride) => {
    if (!filters) return true;

    const matchesFrom =
      !filters.from ||
      ride.from.toLowerCase().includes(filters.from.toLowerCase());
    const matchesTo =
      !filters.to || ride.to.toLowerCase().includes(filters.to.toLowerCase());
    const matchesDate = !filters.date || ride.date.includes(filters.date);
    return matchesFrom && matchesTo && matchesDate;
  });

  if (loading) {
    return (
      <div className="rides-list-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Finding available rides...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rides-list-container">
        <div className="error-state">
          <p>{error}</p>
          <button className="retry-btn">Try Again</button>
        </div>
      </div>
    );
  }
  console.log(filteredRides);
  return (
    <div className="rides-list-container">
      <Filter onChange={handleFilterChange} />
      <div className="rides-list-header">
        <h2>Available Rides</h2>
        <span className="rides-count">
          {filteredRides.length} ride{filteredRides.length !== 1 ? "s" : ""}{" "}
          found
        </span>
      </div>

      {filteredRides.length === 0 || rides.length === 0 ? (
        <div className="no-rides-state">
          <div className="no-rides-icon">🚗</div>
          <h3>No rides found</h3>
          <p>Try adjusting your search criteria or check back later.</p>
        </div>
      ) : (
        <div className="rides-grid">
          {filteredRides.map((ride) => (
            <RideCard key={ride.id} ride={ride} onBookRide={handleBookRide} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RidesList;
