// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({selectSquare, squares, restart}) {
  // 🐨 squares is the state for this component. Add useState for squares
  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div className="game-board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function GameInfo({status, history, goToHistory, currentMove}) {
  function renderHistoryItem(_, idx) {
    const text = `Go to ${idx === 0 ? 'game start' : `move #${idx}`}`
    return (
      <li key={idx}>
        {idx === currentMove ? (
          <button disabled>{`${text} (current)`}</button>
        ) : (
          <button onClick={() => goToHistory(idx)}>{text}</button>
        )}
      </li>
    )
  }

  return (
    <div className="game-info">
      <div>{status}</div>
      <ol>{history.map(renderHistoryItem)}</ol>
    </div>
  )
}

function Game() {
  const [squares, setSquares] = useLocalStorageState(
    'tic-tac-toe:squares',
    Array(9).fill(null),
  )
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
    squares,
  ])
  const [currentMove, setCurrentMove] = useLocalStorageState(
    'tic-tac-toe:current',
    0,
  )

  const winner = calculateWinner(squares)
  const nextValue = calculateNextValue(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (squares[square] !== null || winner) return

    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue

    setHistory([...history.slice(0, currentMove + 1), squaresCopy])
    setSquares(squaresCopy)
    setCurrentMove(currentMove + 1)
  }

  function goToHistory(idx) {
    const squaresState = [...history[idx]]
    setCurrentMove(idx)
    setSquares(squaresState)
  }

  function restart() {
    setSquares(Array(9).fill(null))
    setHistory([Array(9).fill(null)])
  }

  return (
    <div className="game">
      <Board squares={squares} selectSquare={selectSquare} restart={restart} />
      <GameInfo
        status={status}
        history={history}
        goToHistory={goToHistory}
        currentMove={currentMove}
      />
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
