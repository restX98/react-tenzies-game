import { Component } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./components/Die";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      dice: this.generateRandomNumber(),
      tenzies: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.dice) !== JSON.stringify(this.state.dice)) {
      const areAllHeld = this.areAllDiceHeld();
      const number = this.state.dice[0].value;
      const areAllEquals = this.state.dice.every((die) => die.value === number);
      areAllHeld &&
        areAllEquals &&
        this.setState((prevState) => ({ ...prevState, tenzies: true }));
    }
  }

  areAllDiceHeld() {
    return this.state.dice.every((die) => die.isHeld);
  }

  getNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  generateRandomNumber() {
    const numbers = [];
    for (let i = 0; i < 10; i++) numbers.push(this.getNewDie());
    return numbers;
  }

  handleRollClick() {
    this.setState((prevState) => {
      return this.areAllDiceHeld()
        ? { tenzies: false, dice: this.generateRandomNumber() }
        : {
            ...prevState,
            dice: prevState.dice.map((die) =>
              die.isHeld ? die : this.getNewDie()
            ),
          };
    });
  }

  hold(id) {
    this.setState((prevState) => ({
      ...prevState,
      dice: prevState.dice.map((die) =>
        die.id === id ? { ...die, isHeld: true } : die
      ),
    }));
  }

  diceElements() {
    return this.state.dice.map((die) => (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        onClick={() => this.hold(die.id)}
      />
    ));
  }
  render() {
    return (
      <div className="App">
        {this.state.tenzies && <Confetti />}
        <main>
          <h1 className="title">Tenzies</h1>
          <p className="instruction">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice-container">{this.diceElements()}</div>
          <button onClick={() => this.handleRollClick()}>
            {this.areAllDiceHeld() ? "New Game" : "Roll"}
          </button>
        </main>
      </div>
    );
  }
}

export default App;
