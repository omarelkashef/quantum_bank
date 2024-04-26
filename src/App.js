import React, { useState } from 'react';
import './App.css';
import Graph from './Graph';

function App() {
  const [players, setPlayers] = useState([20, 20]);
  const [turn, setTurn] = useState(0);
  const [uncertainty, setUncertainty] = useState(20 * 20);
  const [inputval, setInputVal] = useState("");
  const bound = 120000;

  const dice = [4,6,8,10,12,20]
  const bounds = [4,7,10,14,17,23,27,30,33,37,41,46]

  const whichBound = (x) => {
    for (let i = 0; i < bounds.length; i++) {
        if (x <= bounds[i]) {
          return i;
        }
      }
      return 11; 
    }

  
  const whichRoll = (y) => {
    const x = whichBound(y);
    let diceStr = 'd';
    if (x <= 5) {
        diceStr = diceStr.concat(dice[x].toString());
    } else {
        diceStr = diceStr.concat("20 + d");
        diceStr = diceStr.concat(dice[x-6].toString());
    }
    return diceStr;
  }


  const handleUncertaintyChange = (value) => {
    let product = players[0] * players[1];
    const newPlayers = [...players];
    newPlayers[turn] = value;
    if (product < bound) {
        const diff = (1 - product / bound);
        for (let i = 0; i < newPlayers.length; i++) {
          if (i !== turn) {
            newPlayers[i] *= (1 + diff);
          }
        }
    }
    product = newPlayers[0] * newPlayers[1];
    setPlayers(newPlayers);
    setUncertainty(product);
  };

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  }

  const nextTurn = () => {
    setTurn((prevTurn) => (prevTurn + 1) % 2);
  };

  return (
    <div className="App">
      <h1>Quantum Heist</h1>
      <Graph players={players} uncertainty={Math.log2(uncertainty)} />
      <div>
        <h2>{`Player ${turn + 1}'s Turn`}</h2>
        <button onClick={(e) => handleUncertaintyChange(inputval)}>Update Uncertainty</button>
        <input
          id='new_uncertainity'  
          placeholder='New Uncertainity'
          type="number"
          value={inputval}
          onChange = {handleInputChange}
        />
        <button onClick={nextTurn}>Next Turn</button>
        <p>{`Roll a ${whichRoll(players[turn])}`}</p>
      </div>
    </div>
  );
}

export default App;


