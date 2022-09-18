import { Component } from "react";
import "./Die.css";

class Die extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={"Die" + (this.props.isHeld ? " held" : "")}
        onClick={this.props.onClick}
      >
        <span>{this.props.value}</span>
      </div>
    );
  }
}

export default Die;
