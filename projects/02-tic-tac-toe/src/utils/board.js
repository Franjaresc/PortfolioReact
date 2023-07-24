import { WINNING_COMBINATIONS } from '../constants'

export const checkWinnerForm = (boardToCheck) => {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] !== null &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
    ) { return boardToCheck[a] }
  }
  return null
}

export const checkEndGameForm = (boardToCheck) => {
  return boardToCheck.every((square) => square !== null)
}
