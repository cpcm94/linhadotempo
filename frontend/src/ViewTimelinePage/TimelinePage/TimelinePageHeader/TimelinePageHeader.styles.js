import styled, { keyframes, css } from 'styled-components'
import { colors } from '../../../_shared/colors'

const fadeIn = keyframes`
from {
  opacity: 0;
  visibility: hidden;
}
to {
  opacity: 1;
  visibility: visible;


}
`

export const TextWrapper = styled.div``

export const EntryWrapper = styled.div`
  display: flex;
  padding: 0.2rem 1.5rem 0 0.6rem;
  flex: 1;
  color: ${colors.white};
  font-size: 0.9rem;
`

export const HeaderWrapper = styled.div`
  display: flex;
  padding: 0.25rem 1rem;
  width: 100%;
  background: var(--primary-color);
  color: #fff;
  position: fixed;
  top: 0;
  height: 2rem;
  z-index: 2;
  overflow-x: hidden;
  align-items: center;
  @media (min-width: 540px) {
    padding: 5px 20%;
  }
  @media (min-width: 720px) {
    padding: 5px 27%;
  }
  @media (min-width: 1080px) {
    padding: 5px 36%;
  }
`

export const YearWrapper = styled.div`
  animation: ${fadeIn} 1s forwards;
  min-width: 1rem;
  margin-left: ${({ hasPrefix, zoomOut }) =>
    !hasPrefix && !zoomOut ? '1.2rem' : ''};
`

export const MonthWrapper = styled.div`
  padding: 0 0.25rem;
  min-width: 3.3rem;

  animation: ${({ isDisplayEntryMonth }) =>
    isDisplayEntryMonth &&
    css`
      ${fadeIn} 1s forwards
    `};
`

export const DayWrapper = styled.div`
  min-width: 1.1rem;
  animation: ${({ isDisplayEntryDay }) =>
    isDisplayEntryDay &&
    css`
      ${fadeIn} 1s forwards
    `};
`
export const FormattingWrapper = styled.div`
  min-width: 5.6rem;
`
