export const formatDate = value => {
  const date = new Date(value * 1000)
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes()

  return `${hours}h${minutes}`
}

export const round = value => typeof value == "number" ? value.toFixed(1) : value
