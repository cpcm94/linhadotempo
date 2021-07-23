import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const EntriesWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  top: 0;
  width: 100%;
  margin-bottom: 70px;
  @media (min-width: 540px) {
    padding: 0 20%;
  }
  @media (min-width: 720px) {
    padding: 0 25%;
  }
  @media (min-width: 1080px) {
    padding: 0 35%;
  }
`
export const Wrapper = styled.div`
  width: 100%;
`
export const InvisibleIconWrapper = styled.div`
  display: flex;
  justify-content: center;
`
