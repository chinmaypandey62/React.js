import { useState } from "react";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (const element of lines) {
    const [a, b, c] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
}

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function BoardRow({ squares, rowStart, onClick }) {
  return (
    <div style={{ display: "flex" }}>
      <Square value={squares[rowStart]} onClick={() => onClick(rowStart)} />
      <Square value={squares[rowStart + 1]} onClick={() => onClick(rowStart + 1)} />
      <Square value={squares[rowStart + 2]} onClick={() => onClick(rowStart + 2)} />
    </div>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [prev, setPrev] = useState("O");
  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    
    const newSquares = squares.slice();
    newSquares[i] = prev === "X" ? "O" : "X";
    setSquares(newSquares);
    setPrev(prev === "X" ? "O" : "X");
  }

  return (
    <>
      <center><div>Winner: {winner || "None"}</div></center>
      <BoardRow squares={squares} rowStart={0} onClick={handleClick} />
      <BoardRow squares={squares} rowStart={3} onClick={handleClick} />
      <BoardRow squares={squares} rowStart={6} onClick={handleClick} />
    </>
  );
}
