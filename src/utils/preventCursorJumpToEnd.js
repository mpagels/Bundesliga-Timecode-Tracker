export default function preventCursorJumpToEnd(event) {
  if (event.key === 'Backspace' || event.key === 'Process') {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      const caret = event.target.selectionStart
      const element = event.target
      window.requestAnimationFrame(() => {
        element.selectionStart = caret
        element.selectionEnd = caret
      })
    } else {
      const caret = event.target.selectionStart
      const element = event.target
      window.requestAnimationFrame(() => {
        element.selectionStart = caret - 1
        element.selectionEnd = caret - 1
      })
    }
  }
}
