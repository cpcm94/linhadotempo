import styled from 'styled-components'
import { colors } from '../colors'

export const Wrapper = styled.div`
  padding: 0.25rem 0.75rem;
  background-color: ${colors.brown};
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 4.5rem;
  z-index: 2;
`

export const ButtonWrapper = styled.div`
  background-color: ${colors.white};
  border: solid 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 2rem;
  min-height: 2rem;
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const PageActions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background-color: ${colors.brown};

  @media (min-width: 1440px) {
    width: 50%;
    margin: 0 35.5%;
  }
  @media (max-width: 1439px) {
    width: 55%;
    margin: 0 26%;
  }
  @media (max-width: 719px) {
    width: 100%;
    margin: 0;
  }
`
