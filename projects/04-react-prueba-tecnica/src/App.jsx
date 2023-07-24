import './app.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

export default function App () {
  const { fact, refreshFact } = useCatFact()
  const { catImage } = useCatImage({ fact })

  const handleCatFact = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>Random Cat Fact</h1>
      <button onClick={handleCatFact}>Get a random cat fact</button>
      {fact &&
        <>
          <p>{fact}</p>
          <img src={catImage} alt='cat fact' />
        </>}
    </main>
  )
}
