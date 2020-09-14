import { useState, useEffect } from 'react'

export default function useIsEmptyEvent(
  playerName,
  timeCodeLowerThirdIn,
  timeCodeLowerThirdLength
) {
  const [useIsEmptyEvent, setuseIsEmptyEvent] = useState()

  useEffect(() => {
    setuseIsEmptyEvent(
      playerName === '' ||
        timeCodeLowerThirdIn === '' ||
        timeCodeLowerThirdLength === ''
    )
  }, [playerName, timeCodeLowerThirdIn, timeCodeLowerThirdLength])

  return useIsEmptyEvent
}
