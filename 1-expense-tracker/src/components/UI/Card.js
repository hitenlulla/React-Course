import "./Card.css";

// Wrapper Component
// Gets the wrapped html in props.children
function Card(props) {
  // Append incoming classes with '.card'
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
}

export default Card;
