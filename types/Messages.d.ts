interface Message {
  id: number
  from: string
  from_image: string
  message: string
  time: string
  notifications?: number
  is_last_message_from_you?: boolean
}
export { Message }
