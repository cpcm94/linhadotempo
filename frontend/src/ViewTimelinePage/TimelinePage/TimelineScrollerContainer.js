import styled from 'styled-components'

export const TimelineScrollerContainer = styled.div`
  margin-top: ${({ chosenCategories, showSearchBar }) =>
    chosenCategories[0] && showSearchBar
      ? '5.25rem'
      : showSearchBar && !chosenCategories[0]
      ? '4rem'
      : '2rem'};
  display: flex;
  justify-content: center;
`
