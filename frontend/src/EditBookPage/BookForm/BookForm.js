import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { StyledTextField, Wrapper } from './BookForm.styles'
import { useMutation } from '@apollo/client'
import { UPDATE_BOOK_MUTATION } from './UPDATE_BOOK_MUTATION'
import { DeleteButtonAndConfirmation } from '../../_shared/DeleteButtonAndConfirmation/DeleteButtonAndConfirmation'
import { DELETE_BOOK_MUTATION } from './DELETE_BOOK_MUTATION'
import { useHistory } from 'react-router'
import { toast, Slide } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const BookForm = ({ bookData, setLoading }) => {
  let history = useHistory()
  const isFirstRun = useRef(true)
  const [book, setBook] = useState({
    book_name: bookData.book_name,
    publisher: bookData.publisher,
    publishing_year: bookData.publishing_year,
    edition: bookData.edition,
    author: bookData.author,
  })
  const [showDeleteMessage, setShowDeleteMessage] = useState(false)
  const [updateBook, { loading }] = useMutation(UPDATE_BOOK_MUTATION, {
    variables: {
      id: bookData.id,
      input: book,
    },
  })
  const navigateToBooks = () => {
    history.push('/books')
  }
  const [deleteBook, { loading: deleteLoading }] = useMutation(
    DELETE_BOOK_MUTATION,
    {
      variables: {
        id: bookData.id,
      },
    }
  )
  const handleDelete = () => {
    deleteBook().then((res) => {
      if (res.data.deleteBook.success) {
        navigateToBooks()
      } else {
        toast.error(res.data.deleteBook.message, {
          position: 'top-center',
          hideProgressBar: true,
          transition: Slide,
        })
      }
    })
  }
  const handleChange = (bookPropName) => (e) => {
    const newBook = { ...book }
    newBook[bookPropName] = e.target.value
    setBook(newBook)
  }
  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  useEffect(() => {
    if (!isFirstRun.current && book.publishing_year !== '') {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        const payload = {
          variables: {
            id: bookData.id,
            input: book,
          },
        }
        updateBook(payload)
      }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [bookData.id, book, updateBook])

  const numberOfRelatedEntries = bookData.time_entries.length
  const skipDeleteMessage = !numberOfRelatedEntries
  const deleteMessage = `Ao deletar esse livro ${
    numberOfRelatedEntries > 1
      ? `${numberOfRelatedEntries} acontecimentos perderão esse livro como fonte`
      : `1 acontecimento irá perder esse livro como fonte`
  }. Tem certeza que deseja deletar esse livro? Essa ação será irreversível.`

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
        type="number"
        label="Ano de publicação"
        variant="outlined"
        value={book.publishing_year}
        onChange={handleChange('publishing_year')}
        date={true}
      />
      <DeleteButtonAndConfirmation
        deleteMessage={deleteMessage}
        showDeleteMessage={showDeleteMessage}
        setShowDeleteMessage={setShowDeleteMessage}
        skipDeleteMessage={skipDeleteMessage}
        loading={deleteLoading}
        deleteFunction={handleDelete}
      />
      <ToastContainer />
    </Wrapper>
  )
}

BookForm.propTypes = {
  bookData: PropTypes.object,
  setLoading: PropTypes.func,
}
