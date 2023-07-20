import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./Modal.css";

const modal = (props) => {
  const animationTiming = {
    enter: 400,
    exit: 1000,
  };

  // CSSTransition requires the classes based on animation event
  const animationClasses = {
    enter: "", //when component is entering the DOM
    enterActive: "ModalOpen", //when component is on the DOM
    exit: "", //when component is exiting the DOM
    exitActive: "ModalClosed", //when component has exited the DOM
    appear: "", //when component is rendering first time on the DOM
    appearActive: "", //when component is rendered first time and attached to the DOM
  };

  return (
    // Using CSSTransition component to animate Modal
    <CSSTransition
      in={props.show}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
      classNames={animationClasses}
    >
      <div className="Modal">
        <h1>A Modal</h1>
        <button className="Button" onClick={props.closed}>
          Dismiss
        </button>
      </div>
    </CSSTransition>
  );
};

export default modal;
