import { useState, useEffect } from 'react'

export default function useIsEmptyScene(description, timeCode) {
  const [isEmptyScene, setIsEmptyScene] = useState()

  useEffect(() => {
    setIsEmptyScene(description === '' || timeCode === '')
  }, [description, timeCode])

  return isEmptyScene
}
