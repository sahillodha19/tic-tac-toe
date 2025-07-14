import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from './../../assets/circle.png';
import cross_icon from './../../assets/cross.png';

const defaultBoard = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [page, setPage] = useState('menu');
  const [board, setBoard] = useState([...defaultBoard]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [isComputer, setIsComputer] = useState(false);
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || board[index] !== "") return;
    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? "X" : "O";
    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);

    if (isComputer && count % 2 === 0 && count < 8) {
      setTimeout(() => computerMove(newBoard), 500);
    }
  };

  const computerMove = (currentBoard) => {
    const emptyIndexes = currentBoard.map((v, i) => v === "" ? i : null).filter(i => i !== null);
    if (emptyIndexes.length === 0) return;
    const randIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    currentBoard[randIndex] = "O";
    setBoard([...currentBoard]);
    setCount(prev => prev + 1);
    checkWin(currentBoard);
  };

  const checkWin = (b) => {
    const wins = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    for (let combo of wins) {
      const [a,b1,c] = combo;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        won(b[a]);
        return;
      }
    }
    if (count >= 8) {
      titleRef.current.innerHTML = `It is a draw`;
      setLock(true);
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations <img src=${winner === 'X' ? cross_icon : circle_icon} />`;
  };

  const reset = () => {
    setBoard([...defaultBoard]);
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = `Tic Tac Toe Game In <span>React</span>`;
  };

  const startGame = (vsComputer = false) => {
    setIsComputer(vsComputer);
    setPage('game');
    reset();
  };

  if (page === 'menu') {
    return (
      <div className="menu-container full-screen">
        <h1 className="menu-title">Tic Tac Toe</h1>
        <button className="menu-btn" onClick={() => startGame(false)}>Start Game (2 Players)</button>
        <button className="menu-btn" onClick={() => startGame(true)}>Play Against Computer</button>
        <button className="menu-btn" onClick={() => window.close()}>Exit</button>
      </div>
    );
  }

  return (
    <div className='container full-screen'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
      <div className="board">
        {board.map((val, idx) => (
          <div key={idx} className="boxes" onClick={() => toggle(idx)}>
            {val && <img src={val === 'X' ? cross_icon : circle_icon} alt={val} />}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;