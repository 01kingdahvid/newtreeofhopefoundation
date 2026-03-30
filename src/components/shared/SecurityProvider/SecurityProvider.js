'use client'

import { useEffect } from 'react'

export default function SecurityProvider() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.key === "s") ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.shiftKey && e.key === "I")
      ) {
        e.preventDefault()
      }
    }

    const handleContextMenu = (e) => e.preventDefault()

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("contextmenu", handleContextMenu)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  return null
}
