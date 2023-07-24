import { Square } from './Square'

export default function Board ({ board, updateBoard }) {
  return (
    board.map((square, index) => (
      <Square key={index} index={index} updateBoard={updateBoard}>
        {square}
      </Square>
    ))
  )
}
