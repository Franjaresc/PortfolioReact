import { lazy, Suspense } from 'react'
import './App.css'
import { Router, Route } from './router'
import Page404 from './pages/Page404'
import { Search } from './pages/Search'

const About = lazy(() => import('./pages/About'))
const Home = lazy(() => import('./pages/Home'))

const routes = [
  {
    path: '/search/:query',
    Component: Search
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path='/' Component={Home} />
          <Route path='/about' Component={About} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
