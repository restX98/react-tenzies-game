import "./Die.css";

function Die(props) {
  return (
    <div
      className={"Die" + (props.isHeld ? " held" : "")}
      onClick={props.onClick}
    >
      <span>{props.value}</span>
    </div>
  );
}

export default Die;
