export function loadFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function saveToLocalStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item))
}

export function deleteFromLocalStorage(key) {
  localStorage.removeItem(key)
}
