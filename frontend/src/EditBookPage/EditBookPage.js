import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { BookForm } from './BookForm/BookForm'
import { useHistory } from 'react-router'
import { toast, Slide } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMutation } from '@apollo/client'
import { DELETE_BOOK_MUTATION } from '../_shared/DELETE_BOOK_MUTATION'
import { UPDATE_BOOK_MUTATION } from '../_shared/UPDATE_BOOK_MUTATION'
import { convertBookFormData } from '../_shared/convertBookFormDataValues'
import { checkIfBookError } from '../_shared/checkIfBookError'
import { moveTouch } from '../_shared/moveTouch'
import { startTouch } from '../_shared/startTouch'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditBookPage = ({ bookData }) => {
  let history = useHistory()
  const navigateToBooks = () => {
    history.push('/books')
  }
  const isFirstRun = useRef(true)
  const [book, setBook] = useState({
    book_name: bookData.book_name,
    publisher: bookData.publisher,
    publishing_year: bookData.publishing_year,
    edition: bookData.edition,
    author: bookData.author,
  })
  const [initialX, setInitialX] = useState(null)
  const bookEntries = bookData.time_entries
  const [updateBook, { loading }] = useMutation(UPDATE_BOOK_MUTATION, {
    variables: {
      id: bookData.id,
      input: book,
    },
  })
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
  const bookError = checkIfBookError(book)
  useEffect(() => {
    if (!isFirstRun.current && book.publishing_year !== '') {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (!bookError)
        timeoutId = setTimeout(() => {
          const payload = {
            variables: {
              id: bookData.id,
              input: convertBookFormData(book),
            },
          }
          updateBook(payload)
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [bookData.id, book, updateBook, bookError])

  const onStartTouch = (e) => startTouch(e, setInitialX)
  const onMoveTouch = (e) => moveTouch(e, navigateToBooks, initialX)

  useEffect(() => {
    window.addEventListener('touchstart', onStartTouch)
    window.addEventListener('touchmove', onMoveTouch)
    return () => {
      window.removeEventListener('touchstart', onStartTouch)
      window.removeEventListener('touchmove', onMoveTouch)
    }
  })
  return (
    <Layout>
      <Header
        title={'Editar Livro'}
        returnButton={navigateToBooks}
        loading={loading}
      />
      <Container>
        <BookForm
          book={book}
          setBook={setBook}
          handleDelete={handleDelete}
          deleteLoading={deleteLoading}
          bookEntries={bookEntries}
          bookError={bookError}
        />
        <ToastContainer />
      </Container>
    </Layout>
  )
}

EditBookPage.propTypes = {
  bookData: PropTypes.object,
}
