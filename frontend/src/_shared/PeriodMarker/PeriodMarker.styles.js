import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0.25rem;
  height: 100%;
  width: ${({ periods }) =>
    `${periods[periods.length - 1][0].position * 0.25}rem`};
`
export const PeriodBlock = styled.div`
  width: 0.25rem;
  height: 100%;
  background-color: ${({ period, isPeriodEnd, isPeriodStart }) => {
    const notPeriodBeginOrEnd = !isPeriodEnd && !isPeriodStart
    if (notPeriodBeginOrEnd) {
      return period[0].period_color
    }
  }};
  background: ${({ period, isPeriodEnd, isPeriodStart }) => {
    if (isPeriodEnd) {
      return `linear-gradient(to bottom, ${period[0].period_color} 50%, transparent 50%) 2`
    } else if (isPeriodStart) {
      return `linear-gradient(to top, ${period[0].period_color} 50%, transparent 50%) 2`
    }
  }};
  position: relative;
  left: ${({ period }) => `${period[0].position * 0.25}rem`};
  margin-left: -0.25rem;
`
