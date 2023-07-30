import { Link } from '../router'

export default function Home () {
  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <Link to='/about'>About</Link>
    </>
  )
}
