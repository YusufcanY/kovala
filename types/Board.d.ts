import type { Person } from '@/types/Person'
interface Issue {
  id: number
  title: string
  description?: string
  labels: object[]
  //   status: 10 | 20 | 30 | 40 | 50 // 10: To Do, 20: In Progress, 30: Resolved, 40: Closed, 50: Reopened
  priority: 10 | 20 | 30 // 10: Low, 20: Medium, 30: High
  assignee?: Person[]
  due_date: string
  created_at: string
  updated_at: string
  task?: {
    total: number
    completed: number
  }
  attachments?: number
}
interface List {
  id: number
  name: string
  issues: Issue[]
}
export type { Issue, List }
