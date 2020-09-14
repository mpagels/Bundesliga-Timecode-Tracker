import { useState, useEffect } from 'react'

export default function useHasZeros(
  timeCode,
  timeCodeLowerThirdIn,
  timeCodeLowerThirdLength
) {
  const [hasOnlyZeros, setHasOnlyZeros] = useState()
  const [lowerThirdInHasOnlyZeros, setLowerThirdInHasOnlyZeros] = useState()
  const [lowerThirdOutHasOnlyZeros, setLowerThirdOutHasOnlyZeros] = useState()

  useEffect(() => {
    setHasOnlyZeros(new RegExp('^[0]+$').test(timeCode))
    setLowerThirdInHasOnlyZeros(new RegExp('^[0]+$').test(timeCodeLowerThirdIn))
    setLowerThirdOutHasOnlyZeros(
      new RegExp('^[0]+$').test(timeCodeLowerThirdLength)
    )
  }, [timeCode, timeCodeLowerThirdIn, timeCodeLowerThirdLength])

  return [hasOnlyZeros, lowerThirdInHasOnlyZeros, lowerThirdOutHasOnlyZeros]
}
