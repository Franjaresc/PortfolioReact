import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkEndGameForm, checkWinnerForm } from './utils/board'
import { WinnerModal } from './components/WinnerModal'
import Board from './components/Board'
import { resetGameStorage, saveGameToStorage } from './utils/storage'

function App () {
  const [board, setBoard] = useState(() => {
    const board = window.localStorage.getItem('board')
    return board ? JSON.parse(board) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turn = window.localStorage.getItem('turn')
    return turn ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)
  const updateBoard = (index) => {
    if (board[index] || winner) {
      return
    }
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({ board: newBoard, turn: newTurn })

    const newWinner = checkWinnerForm(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
      resetGameStorage()
    } else if (checkEndGameForm(newBoard)) {
      setWinner(false)
      resetGameStorage()
    }
  }
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        <Board board={board} updateBoard={updateBoard} />
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
