import { useEffect, useState, Children } from 'react'
import { EVENTS } from '../const'
import { match } from 'path-to-regexp'
import { getCurrentPath } from '../utils/utils'

export default function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => (<>404 NOT FOUND</>) }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)

    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  const routeParams = {}

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const routesFromProps = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesFromProps.find(({ path }) => {
    const matchPath = match(path, { decode: decodeURIComponent })
    const matchResult = matchPath(currentPath)
    if (matchResult) {
      Object.assign(routeParams, matchResult.params)
    }
    return matchResult
  })?.Component || DefaultComponent

  return <Page routeParams={routeParams} />
}
