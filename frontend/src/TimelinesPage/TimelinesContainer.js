import styled from 'styled-components'

export const TimelinesContainer = styled.div`
  margin-top: ${({ chosenCategories }) =>
    chosenCategories[0] ? '5.5rem' : '4.25rem'};
`
