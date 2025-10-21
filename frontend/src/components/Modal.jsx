/* eslint-disable react/prop-types */
import axios from "axios";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import styles from "../css/modal.module.css";
import Overlay from "./Overlay";
import Spinner from "./Spinner";
function Modal({ setShowModal, showModal }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const overlayRef = useRef(null);
  async function fetchResults(query) {
    const results = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&addressdetails=1&limit=3`,
      { headers: { "User-Agent": "RideSharingApp/1.0 (ride@email.com)" } }
    );
    return results;
  }
  async function handleInput(e) {
    const value = e.target.value;
    console.log(value);
    setQuery(value);
    if (value.length < 3) {
      setResults([]);
      return;
    }
    try {
      const results = await fetchResults(value);
      if (results.data.length !== 0) setResults(results.data);
      console.log(results);
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleClick = (e) => {
    if (overlayRef.current == e.target) {
      setShowModal(false);
    }
  };
  if (showModal === false) {
    return null;
  }
  return (
    <Overlay overlayRef={overlayRef} handleClick={handleClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <span>modal here</span> <X onClick={() => setShowModal(false)} />
        </div>

        <input
          type="text"
          name="searchPlaces"
          className={styles.searchInput}
          value={query}
          onChange={handleInput}
        />
        <div className={styles.placesList}>
          {query.length > 3 ? (
            results.map((place) => (
              <div
                key={place.display_name}
                className={styles.dropdownListItem}
                onClick={() => setQuery(place.display_name)}
              >
                {place.display_name.slice(0, 50)}....
              </div>
            ))
          ) : (
            <div className={styles.spinnerWrapper}>
              <Spinner />
              Type something
            </div>
          )}
        </div>
      </div>
    </Overlay>
  );
}

export default Modal;
