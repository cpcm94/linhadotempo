import React, { useState } from 'react'
import { StyledTextField, Wrapper } from './NewBookForm.styles'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK_MUTATION } from './CREATE_BOOK_MUTATION'
import { SubmitFormButton } from './SubmitFormButton'
import { useHistory } from 'react-router'
import { toast, Slide } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const NewBookForm = () => {
  let history = useHistory()

  const [book, setBook] = useState({
    book_name: '',
    publisher: '',
    publishing_date: '2000-12-31',
    edition: '',
    author: '',
  })
  const [createBook, { loading }] = useMutation(CREATE_BOOK_MUTATION, {
    variables: {
      input: book,
    },
  })
  const handleChange = (bookPropName) => (e) => {
    const newBook = { ...book }
    newBook[bookPropName] = e.target.value
    setBook(newBook)
  }

  const navigateToBooks = () => {
    history.push('/books')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createBook().then((res) => {
      if (res.data.createBook) {
        navigateToBooks()
      } else {
        toast.error('Erro ao criar livro', {
          position: 'top-center',
          hideProgressBar: true,
          transition: Slide,
        })
      }
    })
  }
  return (
    <Wrapper>
      <StyledTextField
        type="text"
        variant="outlined"
        label="Nome"
        value={book.book_name}
        onChange={handleChange('book_name')}
      />
      <StyledTextField
        type="text"
        variant="outlined"
        label="Autor"
        value={book.author}
        onChange={handleChange('author')}
      />
      <StyledTextField
        type="text"
        variant="outlined"
        label="Editora"
        value={book.publisher}
        onChange={handleChange('publisher')}
      />
      <StyledTextField
        type="text"
        variant="outlined"
        label="Edição"
        value={book.edition}
        onChange={handleChange('edition')}
      />
      <StyledTextField
        id="date"
        label="Data de publicação"
        type="date"
        variant="outlined"
        value={book.publishing_date}
        onChange={handleChange('publishing_date')}
      />
      <SubmitFormButton
        book={book}
        onClick={handleSubmit}
        loading={loading}
        buttonText={'Criar Livro'}
      />
      <ToastContainer />
    </Wrapper>
  )
}
