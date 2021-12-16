import styled from 'styled-components'
import { colors } from '../../../../_shared/colors'

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
