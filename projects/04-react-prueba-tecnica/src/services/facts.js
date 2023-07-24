import { CAT_FACT_URL } from '../common/constants'

export const getRandomFact = async () => {
  try {
    const response = await fetch(CAT_FACT_URL)
    const data = await response.json()
    const { fact } = data
    return fact
  } catch (error) {
    return console.error(error)
  }
}
