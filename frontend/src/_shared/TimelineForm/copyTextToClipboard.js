import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}

const fallbackCopyTextToClipboard = (text) => {
  var textArea = document.createElement('textarea')
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    var successful = document.execCommand('copy')
    if (successful) {
      toast.success(`Texto foi copiado para o clipboard`, toastConfig)
    } else {
      toast.error(`Erro ao copiar texto para o clipboard`, toastConfig)
    }
  } catch (err) {
    toast.error(`Erro ao copiar texto para o clipboard: ${err}`, toastConfig)
  }

  document.body.removeChild(textArea)
}
export const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text).then(
    () => toast.success('Texto copiado para o clipboard', toastConfig),
    (err) =>
      toast.error(`Erro ao copiar texto para o clipboard: ${err}`, toastConfig)
  )
}
