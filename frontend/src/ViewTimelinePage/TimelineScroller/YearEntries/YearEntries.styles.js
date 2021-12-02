import styled, { keyframes, css } from 'styled-components'
import { colors } from '../../../_shared/colors'

const newBackgroundColor = keyframes`
  from {
  background-color: ${colors.lightBrown};
  }
  to {
  background-color: ${colors.white};
  }
`

export const EntryAndIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
  animation: ${({ isNew }) =>
    isNew
      ? css`
          ${newBackgroundColor} 3s
        `
      : null};
  cursor: pointer;
  position: relative;
`

export const EntryImageWrapper = styled.div`
  font-size: 0.5rem;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: ${({ periodColor }) => periodColor && periodColor};
`

export const EntryImage = styled.img`
  position: relative;
  border-radius: 5px;
  width: 1.7rem;
  height: 1.7rem;
  object-fit: cover;
  margin: 0;
  background-color: ${colors.white};
`

export const OuterDateWrapper = styled.div`
  display: flex;
  position: relative;
  /* visibility: ${({ isDisplayEntryDay }) =>
    isDisplayEntryDay ? 'hidden' : 'visible'}; */
  color: ${colors.grey};
  font-size: 0.9em;
  padding: 0.5rem 0;
  span {
    padding: 0 0.25rem;
  }
`
export const LeftDateLine = styled.div`
  border-top: 1px solid ${colors.lightGrey};
  position: absolute;
  top: 50%;
  left: 0%;
  right: 0%;
  bottom: 0;
  width: 7.5rem;
  z-index: 1;
`
export const RightDateLine = styled.div`
  border-top: 1px solid ${colors.lightGrey};
  position: absolute;
  top: 50%;
  left: 1;
  right: 0;
  bottom: 0;
  width: calc(100% - (7.5rem + 46px));
  z-index: 1;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50px;
`

export const EntryNameWrapper = styled.div`
  flex: 1;
  position: relative;
  z-index: 2;
`

export const EntryNameBackground = styled.div`
  flex: 1;
  background-color: ${({ periodColor }) => periodColor && periodColor};
  border-radius: 0 5px 5px 0;
  padding: ${({ hasMainImage }) =>
    hasMainImage ? '0.5rem 0' : '0.5rem 0 0.5rem 1rem'};
`

export const EntryIcon = styled.div`
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border: ${({ borderColor }) =>
    borderColor ? `solid 1px ${borderColor}` : `solid 1px ${colors.white}`};
  border-radius: 5px;
  min-width: 1.25rem;
  min-height: 1.25rem;
  max-width: 1.25rem !important;
  max-height: 1.25rem;
  font-size: 0.5rem;
  text-align: center;
  font-weight: bold;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1px;
`

export const Img = styled.img`
  border-radius: 5px;
  width: 1.2rem;
  height: 1.2rem;
  object-fit: cover;
  margin: 0;
`

export const IconsWrapper = styled.div`
  display: flex;
`

export const YearWrapper = styled.div`
  margin-left: 7.75rem;
`
