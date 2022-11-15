// import type { Person } from '@/types/Person'
interface Issue {
  readonly id: number
  title: string
  description?: string
  //   status: 10 | 20 | 30 | 40 | 50 // 10: To Do, 20: In Progress, 30: Resolved, 40: Closed, 50: Reopened
  priority?: 10 | 20 | 30 // 10: Low, 20: Medium, 30: High
  assignee?: number[]
  board_id: number
  index_in_board: number
  due_date?: number
  created_at: number
  updated_at: number
  task?: {
    total: number
    completed: number
  }
  attachments?: number
  is_editing?: boolean
}
interface List {
  readonly id: number
  name: string
  issues?: Issue[]
  is_editing?: boolean
  color: string
}
export type { Issue, List }
