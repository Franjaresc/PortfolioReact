import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const firstInput = useRef(true)
  useEffect(() => {
    if (firstInput.current) {
      firstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('Por favor ingrese un termino de busqueda')
      console.log({ error })
    } else {
      setError(null)
    }
  }, [search])

  return { search, updateSearch, error }
}
