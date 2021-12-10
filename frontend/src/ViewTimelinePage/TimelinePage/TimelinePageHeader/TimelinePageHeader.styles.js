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

export const EntryWrapper = styled.div`
  display: flex;
  padding: 0.2rem 1.5rem 0 0.6rem;
  flex: 1;
  color: ${colors.white};
  font-size: 0.9rem;
`

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  background: linear-gradient(to bottom, #cb857c 0 2rem, #f6cbb7 2rem 100%);
  color: #fff;
  position: fixed;
  top: 0;
  height: ${({ showSearchBar, chosenCategories }) =>
    showSearchBar && chosenCategories[0]
      ? '5.25rem'
      : showSearchBar && !chosenCategories[0]
      ? '4rem'
      : '2rem'};
  z-index: 3;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
`
export const UpperHeader = styled.div`
  display: flex;
  padding: 5px 20px;
  flex: 1;
  align-items: center;
  max-height: 2rem;
  width: min(100%, 600px);
`
export const LowerHeader = styled.div`
  display: flex;
  background-color: ${colors.lightBrown};
  height: 100%;
  flex: 1;
  align-items: center;
  padding: 0.25rem 1rem;
  width: min(100%, 600px);
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
