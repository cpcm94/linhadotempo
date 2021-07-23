import styled, { keyframes, css } from 'styled-components'
import { colors } from '../../../../../../_shared/colors'

const fadeOut = keyframes`
from {
  opacity: 1;
  visibility: visible;
}
to {
  opacity: 0;
  visibility: hidden;

}
`

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

export const EntryDateWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 0.5rem 0 0.5rem 2.25rem;
  animation: ${({ isDisplayEntryDay }) =>
    isDisplayEntryDay
      ? css`
          ${fadeOut} 1s forwards
        `
      : css`
          ${fadeIn} 1s forwards
        `};
  &:before {
    border-top: 1px solid ${colors.lightBrown};
    content: '';
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 0%;
    right: 0%;
    bottom: 0;
    width: 100%;
    z-index: -1;
  }
  span {
    background: ${colors.white};
  }
  font-size: 0.85em;
  color: ${colors.brown};
`

export const EntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const EntryWrapper = styled.div`
  flex: 1;
`
