import React from 'react';

import './Card.css';

// Wrapper Component
const Card = (props) => {
  // Classes of the enclosing component added to Wrapper component
  const classes = 'card ' + props.className;

  // Enclosed Component is accessed through props.children
  return <div className={classes}>{props.children}</div>;
};

export default Card;