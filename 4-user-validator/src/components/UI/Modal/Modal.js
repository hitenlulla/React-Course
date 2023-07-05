import React from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

// For portals
import ReactDOM from "react-dom";
const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCloseModal}></div>;
};

const Overlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h2>Invalid input</h2>
      </div>
      <div className={styles.content}>
        <h2>{props.errorMessage}</h2>
        <div className={styles.actions}>
          <Button type="button" onClick={props.onCloseModal}>
            Okay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Modal(props) {
  const closeModal = () => {
    props.onClosePrompt();
  };

  return (
    <React.Fragment>
      {/* Portal out the backdrop to its defined div in the index.html DOM */}
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={closeModal} />,
        document.getElementById("backdrop-root")
      )}

      {/* Portal out the modaloverlay to its defined div in the index.html DOM */}
      {ReactDOM.createPortal(
        <Overlay onCloseModal={closeModal} errorMessage={props.errorMessage} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
}
