import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  padding: 5px 20px;
  width: 100%;
  background: var(--primary-color);
  overscroll-behavior: none;
  color: #fff;
  position: sticky;
  top: 0;
  height: ${({ timelinesIconRow }) => (timelinesIconRow ? '4.25rem' : '3rem')};
  z-index: 2;
  overflow-x: hidden;
  align-items: ${({ timelinesIconRow }) =>
    timelinesIconRow ? 'flex-start' : 'center'}; ;
`
