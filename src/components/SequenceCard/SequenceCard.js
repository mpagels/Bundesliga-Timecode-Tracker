import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as PlayButton } from '../../assets/play-button.svg'
import { ReactComponent as PauseButton } from '../../assets/pause-button.svg'
import { ReactComponent as EditButton } from '../../assets/edit-button.svg'
import PropTypes from 'prop-types'
import {
  getTimecodeTotalLength,
  getFormatedTimecode,
  getLowerThirdTimeCodeIn,
  getLowerThirdTimeCodeOut,
} from '../../utils/Timecode'
import { useHistory } from 'react-router-dom'
import InfoAndTimecode from './InfoAndTimecode'

SequenceCard.propTypes = {
  description: PropTypes.string.isRequired,
  lengthTimeCode: PropTypes.string.isRequired,
  tag: PropTypes.string,
  timeCodeLowerThirdIn: PropTypes.string,
  timeCodeLowerThirdLength: PropTypes.string,
  playerName: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  handleToggle: PropTypes.func.isRequired,
  allSequenceCards: PropTypes.array.isRequired,
}

export default function SequenceCard({
  description,
  lengthTimeCode,
  tag = '',
  timeCodeLowerThirdIn = '',
  timeCodeLowerThirdLength = '',
  playerName = '',
  isActive,
  index,
  handleToggle,
  allSequenceCards,
  handleOnEdit,
  previousTimeCode = '00',
  isSpecial = false,
}) {
  const history = useHistory()
  return (
    <Card isActive={isActive}>
      <Header>
        <Minute></Minute>
        <ToggleContainer>
          {isActive ? (
            <PauseButton
              data-cy="playPauseButton"
              onClick={() => handleToggle(index)}
            />
          ) : (
            <PlayButton
              data-cy="playPauseButton"
              onClick={() => handleToggle(index)}
            />
          )}
        </ToggleContainer>
      </Header>
      <CardContent>
        <InfoAndTimecode
          info={isSpecial ? 'timecode' : 'dauer'}
          timecode={getFormatedTimecode(lengthTimeCode)}
        />
        <Description>{description}</Description>
      </CardContent>
      {tag && (
        <AdditionalCardContent>
          <TagAndPlayer>
            <Tag>{tag}</Tag>
            <Player>{playerName}</Player>
          </TagAndPlayer>
          <Line />
          <LowerThirds>
            <InfoAndTimecode
              info="Bauchbinde in"
              timecode={getLowerThirdTimeCodeIn(
                index,
                allSequenceCards,
                getTimecodeTotalLength([timeCodeLowerThirdIn, previousTimeCode])
                  .split(':')
                  .join('')
              )}
            />
            <InfoAndTimecode
              info="bauchbinde out"
              timecode={getLowerThirdTimeCodeOut(
                index,
                allSequenceCards,
                getTimecodeTotalLength([timeCodeLowerThirdIn, previousTimeCode])
                  .split(':')
                  .join(''),

                timeCodeLowerThirdLength
              )}
            />
          </LowerThirds>
        </AdditionalCardContent>
      )}

      <CardFooter>
        <EditButton
          onClick={() => {
            handleOnEdit()
            history.push('/create')
          }}
        />
      </CardFooter>
    </Card>
  )
}

const Card = styled.section`
  border-radius: 30px;
  border: 1px solid grey;
  color: white;
  ${(props) => !props.isActive && 'opacity: 0.3;'}
  margin: 15px 20px;
  padding: 20px 30px;
  background: transparent
    linear-gradient(
      180deg,
      var(--gradient-blue-top) 0%,
      var(--gradient-blue-bottom) 100%
    )
    0% 0% no-repeat padding-box;
`

const CardContent = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0;
`
const Description = styled.p`
  font-size: 1em;
  word-break: break-word;
  color: white;
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Minute = styled.h2`
  font-size: 2em;
  margin: 0;
`

const AdditionalCardContent = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-top: 25px;
`
const TagAndPlayer = styled.div`
  display: flex;
  align-items: center;
`

const Player = styled.p`
  font-size: 0.8em;
  margin: 0;
  padding: 0;
  color: var(--font-greenish);
`
const Line = styled.hr`
  width: 100%;
  color: white;
  margin: 20px 0;
`

const LowerThirds = styled.div`
  display: flex;
  justify-content: space-between;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`
const Tag = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  border: 3px solid var(--orange-border);
  color: var(--orange-border);
  padding: 5px 15px;
  margin-right: 20px;

  font-size: 0.8em;
`
const ToggleContainer = styled.div`
  height: 48px;
  width: 48px;
`
