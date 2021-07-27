import styled, { keyframes, css } from 'styled-components'
import { colors } from '../../_shared/colors'

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

export const EntryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  color: ${colors.white};
`

export const HeaderWrapper = styled.div`
  display: flex;
  padding: 0.25rem 1rem;
  width: 100%;
  background: var(--primary-color);
  color: #fff;
  position: sticky;
  top: 0;
  height: 2rem;
  z-index: 2;
  overflow-x: hidden;
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
  flex: 1;
  text-align: center;
  animation: ${fadeIn} 1s forwards;
`

export const MonthWrapper = styled.div`
  flex: 1;
  text-align: center;
  animation: ${({ isDisplayEntryMonth }) =>
    isDisplayEntryMonth &&
    css`
      ${fadeIn} 1s forwards
    `};
`

export const DayWrapper = styled.div`
  flex: 1;
  text-align: center;
  animation: ${({ isDisplayEntryDay }) =>
    isDisplayEntryDay &&
    css`
      ${fadeIn} 1s forwards
    `};
`