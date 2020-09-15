import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as PlayButton } from '../../assets/play-button.svg'
import { ReactComponent as PauseButton } from '../../assets/pause-button.svg'
import { ReactComponent as EditButton } from '../../assets/edit-button.svg'
import PropTypes from 'prop-types'
import {
  getFormatedTimecode,
  getLowerThirdTimeCodeIn,
  getLowerThirdTimeCodeOut,
} from '../../utils/Timecode'

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
}) {
  return (
    <Card isActive={isActive}>
      <EditButton onClick={() => handleOnEdit()} />
      <Header>
        <Description>{description}</Description>
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
      {tag ? (
        <InfoIfTag>
          <TagAndLength>
            <Tag>{tag}</Tag>
            <Timecode>{getFormatedTimecode(lengthTimeCode)}</Timecode>
          </TagAndLength>
          <LowerThirdContainer>
            <Name>
              Spieler: <span>{playerName}</span>
            </Name>
            <TimecodeIn>
              Bauchbinde IN:
              <span>
                {getLowerThirdTimeCodeIn(
                  index,
                  allSequenceCards,
                  timeCodeLowerThirdIn
                )}
              </span>
            </TimecodeIn>
            <TimecodeOut>
              Bauchbinde OUT:
              <span>
                {getLowerThirdTimeCodeOut(
                  index,
                  allSequenceCards,
                  timeCodeLowerThirdIn,
                  timeCodeLowerThirdLength
                )}
              </span>
            </TimecodeOut>
          </LowerThirdContainer>
        </InfoIfTag>
      ) : (
        <Timecode>{getFormatedTimecode(lengthTimeCode)}</Timecode>
      )}
    </Card>
  )
}

const Card = styled.section`
  border-radius: 10px;
  border: 1px solid grey;
  margin: 15px 20px;
  padding: 10px 10px;
  ${(props) => !props.isActive && 'background-color : #E7C5CA; color: grey;'}
`

const Description = styled.p`
  word-break: break-word;
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
`
const Timecode = styled.p`
  font-weight: 800;
  margin: 0;
  text-align: right;
`

const InfoIfTag = styled.div`
  display: flex;
  flex-direction: column;
`
const TagAndLength = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const Tag = styled.div`
  background-color: var(--tag-border-grey);
  border-radius: 5px;
  color: #8e8e8e;
  height: 30px;
  padding: 5px 6px;
`

const LowerThirdContainer = styled.div`
  margin: 15px 0;
  &: (first-of-type) {
    font-weight: 700;
  }
`
const Name = styled.p`
  margin: 0;
`
const TimecodeIn = styled(Name)``
const TimecodeOut = styled(Name)``

const ToggleContainer = styled.div`
  height: 48px;
  width: 48px;
`
