import { MOVIE_API_KEY, MOVIE_API_URL, MOVIE_API_URL_API, MOVIE_API_URL_SEARCH } from '../common/constants'

export const searchMovies = async ({ search }) => {
  if (search === null || search === undefined || search === '') {
    return null
  }
  try {
    const response = await fetch(
      MOVIE_API_URL +
          MOVIE_API_URL_SEARCH +
          search +
          MOVIE_API_URL_API +
          MOVIE_API_KEY
    )
    const data = await response.json()
    const movies = data?.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (error) {
    throw new Error('Error al buscar las peliculas')
  }
}
