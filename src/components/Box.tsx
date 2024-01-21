import React, { useRef, useState } from 'react'

const CardSpotlight = ({
  title,
  children,
  customClass
}: {
  title?: string
  children: React.ReactNode,
  customClass?: string
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={"relative  overflow-hidden rounded-3xl border dark:border-neutral-800 bg-gradient-to-r dark:from-black dark:to-neutral-950 p-6 shadow-sm w-full " + customClass}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(244, 182, 255, 0.1), transparent 40%)`
        }}
      />
      
      {title && <h2 className="block text-2xl mb-4 font-medium">{title}</h2>}
      {children}
    </div>
  )
}

export default CardSpotlight
