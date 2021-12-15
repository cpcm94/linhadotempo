import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

export const DateWrapper = styled.div`
  display: flex;
  margin-bottom: -2px;
  @media (max-width: 425px) {
    flex-direction: column;
  }
  @media (min-width: 426px) {
    flex-direction: row;
  }
`
export const InnerDateWrapper = styled.div`
  display: flex;
  font-size: 1.25rem;
`
export const DateSpan = styled.div`
  display: flex;
  padding: 0 0.5rem;
  border-style: ${({ selected }) =>
    selected ? `solid solid none solid` : 'solid'};
  border-width: 1px;
  border-radius: 5px 5px 0 0;
  border-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
  background-color: ${({ selected }) =>
    selected ? colors.lightBrown : colors.white};
  color: ${({ isEmpty }) => (isEmpty ? colors.grey : colors.black)};
  cursor: pointer;
`

export const EllipsisWrapper = styled.div`
  padding: 0 0.5rem;
  margin-top: -0.5rem;
  font-size: 1.5rem;
  border-radius: 5px;
  :hover {
    cursor: pointer;
    background-color: ${colors.lightBrown};
  }
`

export const PeriodMessage = styled.div`
  padding: 0.5rem;
  color: ${colors.grey};
  font-size: 0.9rem;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
export const MicButtonAndTranscriptWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`
export const ConfirmDateButton = styled.div`
  color: green;
  padding: 0 0.25rem;
  font-size: 1.25rem;
`

export const DateResult = styled.div`
  color: ${colors.grey};
  padding: 0.25rem 0.25rem 0 0;
`
export const ConfirmeDateWrapper = styled.div`
  display: flex;
  @media (max-width: 425px) {
    margin-top: 0.5rem;
  }
`
export const SpeechToTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 425px) {
    margin-top: 1rem;
  }
`
export const TranscriptText = styled.span``

export const XIconWrapper = styled.div`
  padding-top: 1px;
`
