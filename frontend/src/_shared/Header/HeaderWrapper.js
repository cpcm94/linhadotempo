import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--primary-color);
  color: #fff;
  position: fixed;
  top: 0;
  height: ${({ timelinesIconRow }) => (timelinesIconRow ? '4.25rem' : '3rem')};
  z-index: 2;
  overflow-x: hidden;
  align-items: ${({ timelinesIconRow }) =>
    timelinesIconRow ? 'flex-start' : 'center'}; ;
`
