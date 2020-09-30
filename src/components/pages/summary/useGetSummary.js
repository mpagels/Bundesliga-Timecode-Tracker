import {
    getLowerThirdTimeCodeIn,
    getLowerThirdTimeCodeOut,
    getTimecodeTotalLength,
    getTimecodeTotalLengthFromSequenceCards,
  } from '../../../utils/Timecode'
import propTypes from 'prop-types'

useGetSummary.propTypes = {
    cards: propTypes.object.isRequired,
  }

export default function useGetSummary(cards) {

    const keys = ["1st", "2nd"]
    const summary = []
    const lengthFirstHalf =
    cards['1st'].length > 0 &&
    getTimecodeTotalLengthFromSequenceCards(cards['1st'])
      .split(':')
      .join('')
      .slice(2)
  
    keys.forEach(key => {
      for (let i = 0; i < cards[key].length; i++) {
        const {
            tag,
            timeCodeLowerThirdIn,
            timeCodeLowerThirdLength,
            playerName,
            isActive,
            previousTimeCode = key === "1st" ? '00' : lengthFirstHalf.split(':').join(''),
        } = cards[key][i]
        tag && isActive && summary.push({
          tag,
          playerName,
          isActive,
          timeCodeLowerThirdIn: getLowerThirdTimeCodeIn(
            i,
            cards[key],
            getTimecodeTotalLength([timeCodeLowerThirdIn, previousTimeCode])
              .split(':')
              .join('')
          ),
          timeCodeLowerThirdOut: getLowerThirdTimeCodeOut(
            i,
            cards[key],
            getTimecodeTotalLength([timeCodeLowerThirdIn, previousTimeCode])
              .split(':')
              .join(''),
            timeCodeLowerThirdLength
          )
        })
    }
  })
    return summary
}
