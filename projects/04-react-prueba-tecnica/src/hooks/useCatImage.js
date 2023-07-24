import { useEffect, useState } from 'react'
import { CAT_IMAGE_URL } from '../common/constants'

export function useCatImage ({ fact }) {
  const [catImage, setCatImage] = useState()
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    fetch(`${CAT_IMAGE_URL}${threeFirstWords}`)
      .then(response => {
        if (!response.ok) throw new Error('Error fetching cat image')
        const { url } = response
        setCatImage(url)
      })
      .catch(error => console.error(error))
  }, [fact])
  return { catImage }
}
