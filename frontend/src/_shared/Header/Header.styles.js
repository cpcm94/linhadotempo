import styled from 'styled-components'
import { colors } from '../colors'

export const Title = styled.div`
  font-size: 1.1rem;
  padding: 0 0.5rem 0 0.5rem;
  @media (max-width: 425px) {
    display: none;
  }
`
export const MobileTitle = styled.div`
  font-size: 1.1rem;
  padding: 0 0.5rem 0 0.5rem;
  @media (min-width: 426px) {
    display: none;
  }
`

export const PageActions = styled.div`
  display: flex;
`

export const SubTitle = styled.div`
  font-size: 0.6rem;
`

export const TitlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const IconRow = styled.div`
  padding: 0.25rem 0 0 0;
  width: 100%;
`

export const UserButtonWrapper = styled.div`
  position: absolute;
  top: ${({ hasTimelinesIcons, subTitle }) =>
    hasTimelinesIcons ? '0.5rem' : subTitle ? '0.75rem' : '0.55rem'};
  right: 1.25rem;
`

export const UpperHeader = styled.div`
  display: flex;
  padding: 5px 20px;
  flex: 1;
  align-items: center;
`

export const LowerHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: ${colors.lightBrown};
  height: 100%;
  flex: 1;
  align-items: center;
`
export const TimelineTitle = styled.div`
  font-size: 1.1rem;
  width: calc(100% - 4rem);
`
