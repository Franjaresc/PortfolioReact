import { BUTTONS, EVENTS } from '../const'

export function navigate (pathname) {
  window.history.pushState({}, '', pathname)
  const navEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navEvent)
}

export default function Link ({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTONS.PRIMARY
    const isModifiedEvent = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    const isManageableEvent = target === undefined || target === null || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)
    }
  }
  return <a onClick={handleClick} href={to} target={target} {...props} />
}
