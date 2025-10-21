/* eslint-disable react/prop-types */
import styles from "../css/overlay.module.css";
function Overlay({ children, overlayRef, handleClick = () => {} }) {
  return (
    <div
      className={styles.overlayContainer}
      ref={overlayRef}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default Overlay;
