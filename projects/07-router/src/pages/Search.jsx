import { useEffect } from 'react'

export function Search ({ routeParams }) {
  useEffect(() => {
    document.title = `Search: ${routeParams.query}`
  }, [])
  return (
    <>
      <h1>Search</h1>
      <p>Searching for: {routeParams.query}</p>
    </>
  )
}
