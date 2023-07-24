import { useEffect, useState } from 'react'
import './App.css'
import { FollowMouse } from './components/FollowMouse'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('Effect', { enabled })
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }
    if (enabled) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      console.log('Cleanup', { enabled })
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [enabled])

  return (
    <main>
      <FollowMouse enabled={enabled} setEnabled={setEnabled} position={position} />
    </main>
  )
}

export default App
