//Kevin Roosey personal project
//Tic-Tac-Toe
import './App.css';
import {useState} from "react";

let win = false; //set to false until a winner is declared by calculateWinner
let status;

function App() {
  return (
    <div>
      <Board />
    </div>
  );
}


function Board() {
  //initialize board as a 3x3 array
  const [board, updateBoard] = useState([[null, null, null],[null, null, null],[null, null, null]])
  //initialize turn to represent who's turn is next
  const [turn, updateTurn] = useState('X')
  if (win == false) {
    status = turn +"'s turn.";
  }
  //event handler
  function handleCellClick(rowIndex, columnIndex) {
    const value = board[rowIndex][columnIndex]
    if (value === null && win != true) {
      const updatedBoardValues = board.map(row => row.slice())
      updatedBoardValues[rowIndex][columnIndex] = turn
      updateBoard(updatedBoardValues) 
      const winner = calculateWinner(updatedBoardValues);
      //if winner, change status to winner instead of turn
      if (winner) {
        status = winner + " is the winner!";
        console.log(status);
        win = true;
      }
      //use a ternary operator to update turn
      else {
        updateTurn(turn === 'X' ? 'O' : 'X')
      }
    }
  }

  return(
    <div className="main">
      <div className="Board">
        {board.map((row, rowIndex) =>  
          <div key={rowIndex} className="row">
            {row.map((value, columnIndex) => 
              <Cell 
                value={value} 
                key={columnIndex} 
                onClick={() => handleCellClick(rowIndex, columnIndex)}
              />
            )}
          </div>
        )}
      </div>
      <div className="status">
        <br/>
        <h3>{status}</h3>
      </div>
    </div>
  )  
}

function Cell(props) {
  return <div className="cell" onClick={props.onClick}>{props.value}</div>
}

function calculateWinner(squares) {
  //Use these values to compare all possible connections 
  const xVals = [
    [0, 0, 0], //horizontal
    [1, 1, 1], 
    [2, 2, 2], 
    [0, 1, 2], //vertical
    [0, 1, 2], 
    [0, 1, 2], 
    [0, 1, 2], //diagonal
    [2, 1, 0],            
  ];
  const yVals = [
    [0, 1, 2], //horizontal
    [0, 1, 2], 
    [0, 1, 2],
    [0, 0, 0], //vertical
    [1, 1, 1], 
    [2, 2, 2], 
    [0, 1, 2], //diagonal
    [0, 1, 2],            
  ];
  // Loop through all possible connections
  for (let i = 0; i < xVals.length; i++) {
    const [a, b, c] = xVals[i];
    const [x, y, z] = yVals[i];
    //if all values equal each other, return the winner 
    if (squares[a][x] && squares[a][x] === squares[b][y] && squares[a][x] === squares[c][z]) {
      return squares[a][x]; //returns either 'X' or 'O'
    }
  }
  return null;
}

export default App;
