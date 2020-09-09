export function formatter(value) {
  if (value.length > 2) {
    const newStringList = []
    for (let i = 0; i < value.length; i++) {
      if (i % 2 === 0 && i !== 0) {
        newStringList.push(':' + value[i])
      } else {
        newStringList.push(value[i])
      }
    }
    return newStringList.join('')
  } else {
    return value
  }
}
