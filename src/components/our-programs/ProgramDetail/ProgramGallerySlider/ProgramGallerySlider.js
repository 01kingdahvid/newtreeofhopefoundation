"use client"

import { useState } from "react"
import styles from "./ProgramGallerySlider.module.css"

export default function ProgramGallerySlider({ images }) {

  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex((index + 1) % images.length)
  }

  const prev = () => {
    setIndex((index - 1 + images.length) % images.length)
  }

  return (

    <div className={styles.slider}>

      <button onClick={prev}>‹</button>

      <img src={images[index]} alt="program gallery" />

      <button onClick={next}>›</button>

    </div>

  )
}