import React from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

export default function Modal(props) {
  const closeModal = () => {
    props.onClosePrompt();
  };

  return (
    <div>
      <div className={styles.backdrop} onClick={closeModal}></div>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Invalid input</h2>
        </div>
        <div className={styles.content}>
          <h2>{props.errorMessage}</h2>
          <div className={styles.actions}>
            <Button type="button" onClick={closeModal}>
              Okay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
