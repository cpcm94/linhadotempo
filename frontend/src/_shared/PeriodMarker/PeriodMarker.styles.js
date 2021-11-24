import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0.75rem;
  height: 100%;
  width: ${({ periods }) =>
    `${periods[periods.length - 1][0].position * 0.75}rem`};
`
export const PeriodBlock = styled.div`
  width: 0.75rem;
  height: 100%;
  background-color: ${({ period }) => {
    return period[0].period_color
  }};
  position: relative;
  left: ${({ period }) => `${period[0].position * 0.75}rem`};
  margin-left: -0.75rem;
`
