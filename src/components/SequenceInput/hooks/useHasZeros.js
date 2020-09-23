import { useState, useEffect } from 'react'

export default function useHasZeros(
  timeCode,
  timeCodeLowerThirdIn,
  timeCodeLowerThirdLength,
  realTimeCode
) {
  const [hasOnlyZeros, setHasOnlyZeros] = useState()
  const [lowerThirdInHasOnlyZeros, setLowerThirdInHasOnlyZeros] = useState()
  const [lowerThirdOutHasOnlyZeros, setLowerThirdOutHasOnlyZeros] = useState()
  const [realTimeHasOnlyZeros, setRealTimeHasOnlyZeros] = useState()

  useEffect(() => {
    setHasOnlyZeros(new RegExp('^[0]+$').test(timeCode))
    setLowerThirdInHasOnlyZeros(new RegExp('^[0]+$').test(timeCodeLowerThirdIn))
    setLowerThirdOutHasOnlyZeros(
      new RegExp('^[0]+$').test(timeCodeLowerThirdLength)
    )
    setRealTimeHasOnlyZeros(new RegExp('^[0]+$').test(realTimeCode))
  }, [timeCode, timeCodeLowerThirdIn, timeCodeLowerThirdLength, realTimeCode])

  return [
    hasOnlyZeros,
    lowerThirdInHasOnlyZeros,
    lowerThirdOutHasOnlyZeros,
    realTimeHasOnlyZeros,
  ]
}
