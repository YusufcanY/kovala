export default function () {
  function prettifyDate(timestamp: number) {
    const date = new Date(timestamp)
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  return { prettifyDate }
}
