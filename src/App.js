import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./components/Die";
import "./App.css";

function App() {
  const [dice, setDice] = useState(generateRandomNumber());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const areAllHeld = areAllDiceHeld();
    const number = dice[0].value;
    const areAllEquals = dice.every((die) => die.value === number);
    areAllHeld && areAllEquals && setTenzies(true);
  }, [dice]);

  function areAllDiceHeld() {
    return dice.every((die) => die.isHeld);
  }
  function getNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function generateRandomNumber() {
    const numbers = [];
    for (let i = 0; i < 10; i++) numbers.push(getNewDie());
    return numbers;
  }

  function handleRollClick() {
    setDice((prevDice) =>
      areAllDiceHeld()
        ? generateRandomNumber()
        : prevDice.map((die) => (die.isHeld ? die : getNewDie()))
    );
    areAllDiceHeld() && setTenzies(false);
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) => (die.id === id ? { ...die, isHeld: true } : die))
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      onClick={() => hold(die.id)}
    />
  ));

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instruction">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button onClick={handleRollClick}>
          {areAllDiceHeld() ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}

export default App;
