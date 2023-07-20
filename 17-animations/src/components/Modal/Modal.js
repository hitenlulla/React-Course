import React from "react";
import Transition from "react-transition-group/Transition";

import "./Modal.css";

const modal = (props) => {
  const animationTiming = {
    enter: 400,
    exit: 1000,
  };

  return (
    // Using Transition component to animate Modal
    <Transition
      in={props.show}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
    >
      {/* transitionState can be 'entering', 'entered', 'exiting', 'exited' */}
      {(transitionState) => {
        const cssClasses = [
          "Modal",
          transitionState === "entering"
            ? "ModalOpen"
            : transitionState === "exiting"
            ? "ModalClosed"
            : null,
        ];
        // Updating classes based on transitionState

        return (
          <div className={cssClasses.join(" ")}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>
              Dismiss
            </button>
          </div>
        );
      }}
    </Transition>
  );
};

export default modal;
