import { Square } from "./Square";

export function WinnerModal({ winner, resetGame } ){
  if (winner === null) return null;

  const winnerText = winner === false ? "It is a draw!" : `${winner} wins!`;
  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">
          {
            winner && <Square>{winner}</Square> // If winner is not false, then it must be X or O
          }
        </header>
        <footer>
          <button onClick={resetGame}>Play again</button>
        </footer>
      </div>
    </section>
  );
}
