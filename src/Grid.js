import React, { useState } from "react";

const winningConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

export const Grid = () => {
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const checkWinner = (arr) => {
    winningConditions.forEach((condition) => {
      let first = condition[0] - 1;
      let second = condition[1] - 1;
      let third = condition[2] - 1;
      if (
        arr[first] === currentPlayer &&
        arr[first] === arr[second] &&
        arr[first] === arr[third]
      ) {
        setWinner(currentPlayer);
        return;
      }
    });
  };

  const handleClick = (index) => {
    let putSymbolOnIndex = [...grid];
    putSymbolOnIndex[index] = currentPlayer;
    setGrid(putSymbolOnIndex);

    checkWinner(putSymbolOnIndex);
    currentPlayer === "X" ? setCurrentPlayer("O") : setCurrentPlayer("X");
  };

  return (
    <>
      {winner === "" ? (
        <>
          <p>Current Player: {currentPlayer}</p>
          <div className="grid">
            {grid.map((square, index) => (
              <p
                key={index}
                onClick={() => handleClick(index)}
                className="square"
              >
                {square}
              </p>
            ))}
          </div>
        </>
      ) : (
        `Winner of the game is ${winner}`
      )}
      <button
        onClick={() => {
          setWinner("");
          setGrid(Array(9).fill(""));
        }}
      >
        Reset game
      </button>
    </>
  );
};
