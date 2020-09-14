import { useState, useEffect } from 'react'

export default function useCheckLowerThirds(
  timeCodeLowerThirdIn,
  timeCodeLowerThirdLength,
  timeCode
) {
  const [isCorrectLowerThirdIn, setIsCorrectLowerThirdIn] = useState()
  const [isCorrectLowerThirdLength, setTimeCodeLowerThirdLength] = useState()
  const [disabled, setDisabled] = useState()
  const [hasCorrectLowerThirdLength, setHasCorrectLowerThirdLength] = useState()

  useEffect(() => {
    setIsCorrectLowerThirdIn(
      timeCodeLowerThirdIn.length % 2 === 0 && timeCodeLowerThirdIn !== ''
    )
    setTimeCodeLowerThirdLength(
      timeCodeLowerThirdLength.length % 2 === 0 &&
        timeCodeLowerThirdLength !== ''
    )
    setDisabled(timeCodeLowerThirdIn === '')
    setHasCorrectLowerThirdLength(
      Number(timeCodeLowerThirdIn) + Number(timeCodeLowerThirdLength) <=
        timeCode
    )
  }, [timeCodeLowerThirdIn, timeCodeLowerThirdLength, timeCode])

  return [
    isCorrectLowerThirdIn,
    isCorrectLowerThirdLength,
    disabled,
    hasCorrectLowerThirdLength,
  ]
}
