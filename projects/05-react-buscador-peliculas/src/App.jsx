import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const { search, updateSearch, error } = useSearch()

  const [sort, setSort] = useState(false)

  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 300)
  , [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }
  
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = (event) => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            name='search'
            placeholder='Buscar...'
            onChange={handleChange}
          />
          <input type='checkbox' name='sort' onChange={handleSort} checked={sort} />
          <button type='submit'>
            Buscar
          </button>
        </form>
        {error && <p>{error}</p>}
      </header>
      <main>
        {loading
          ? <p>Buscando peliculas...</p>
          : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
