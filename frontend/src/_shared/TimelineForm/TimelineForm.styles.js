import styled from 'styled-components'
import { colors } from '../colors'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 1rem;
`
export const TimelinesWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0 0.5rem 0;
`

export const IconWrapper = styled.div`
  margin: 0 5px 0 0;
  background-color: ${colors.white};
  border: solid 1px #999;
  color: #655;
  border-radius: 2px;
  min-width: 0.8rem;
  min-height: 0.8rem;
  width: 0.8rem;
  height: 0.8rem;
  font-size: 0.8rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NewTimelineWrapper = styled.div`
  min-height: 20vh;
  border-bottom: solid 1px ${colors.lightBrown};
`
export const NewTimelineNameWrapper = styled.input`
  width: 50vw;
  color: ${colors.lightBrown};
`

export const BottomContainer = styled.div`
  height: calc(80vh - 2rem);
`

export const UserTimelinesWrapper = styled.div`
  border-right: solid 1px ${colors.lightBrown};
  width: 50%;
  height: 100%;
`

export const TimelinesListLabel = styled.label``

export const NewTimelineLabel = styled.label``
