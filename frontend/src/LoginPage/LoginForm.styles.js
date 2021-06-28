import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 25%;
  align-items: center;
`
export const Wrapper = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
`
export const Label = styled.label`
  margin-bottom: 15px;
  margin-top: 15px;
`
export const SubmitButton = styled.button`
  margin-top: 15px;
`
export const ForgotPasswordText = styled.div`
  margin-top: 15px;
  min-width: 160px;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
