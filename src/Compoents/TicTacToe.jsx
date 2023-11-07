import React, { useState } from "react";
import circle from "./Assets/circle.png";
import cross from "./Assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

function TicTacToe() {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState("");
  const [winningCells, setWinningCells] = useState([]);

  const toggle = (num) => {
    if (lock || data[num] !== "" || winner) {
      return;
    }
    const updatedData = [...data];
    if (count % 2 === 0) {
      updatedData[num] = "x";
      setCount(count + 1);
    } else {
      updatedData[num] = "o";
      setCount(count + 1);
    }
    data = updatedData;
    checkForWin(updatedData, num);
  };

  const resetGame = () => {
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    setLock(false);
    setWinner("");
    setWinningCells([]);
  };

  const checkForWin = (board, moveIndex) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setLock(true);
        setWinningCells(line);
        return;
      }
    }

    if (count === 8) {
      setWinner("draw");
      setLock(true);
    }
  };

  const boardStyle =
    "lg:w-96 lg:h-80 w-60 h-60 mx-auto flex justify-center items-center lg:mt-10 mb-0";

  const cellStyle =
    "lg:w-28 lg:h-28 w-16 h-16 bg-[white] border-solid border-4 border-[#687c80] cursor-pointer flex justify-center items-center rounded-lg";

  const iconStyle = "w-3/5 h-3/5";

  return (
    <div>
      <h1 className="mt-20 text-white text-lg lg:text-4xl font-medium flex justify-center items-center ">
        Tic Tac Toe Game Using
        <span className="text-[#31373a] pl-3">React</span>
      </h1>
      <div className={boardStyle}>
        <div className="flex flex-wrap items-center justify-center">
          {data.map((cell, index) => (
            <div
              key={index}
              className={`cell ${cellStyle} ${
                winningCells.includes(index) ? "strike-through" : ""
              }`}
              onClick={() => toggle(index)}
            >
              {cell === "x" && (
                <img src={cross} alt="X" className={iconStyle} />
              )}
              {cell === "o" && (
                <img src={circle} alt="O" className={iconStyle} />
              )}
            </div>
          ))}
        </div>
      </div>
      {winner && (
        <p className="text-[#31373a] p-3 text-xl lg:p-0 lg:mt-4 lg:text-2xl font-bold ">
          {winner === "x"
            ? "Player X wins!"
            : winner === "o"
            ? "Player O wins!"
            : "It's a draw!"}
        </p>
      )}
      <button
        className="w-20 h-8 text-lg rounded-md lg:w-28 lg:h-12 lg:text-2xl  border-none outline-none cursor-pointer lg:rounded-lg bg-[white] text-[#3f474b] font-medium lg:mt-5  hover:bg-[#31373a] hover:text-white duration-200"
        onClick={resetGame}
      >
        Reset
      </button>
    </div>
  );
}

export default TicTacToe;
