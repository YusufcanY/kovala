import { defineStore } from 'pinia'
import type { Issue } from '@/types/Board'

export const useIssueStore = defineStore('issues', {
  state: () => ({
    issues: [
      {
        id: 1,
        title: 'Landing Page New Desing',
        description: 'The current design is looks bad',
        priority: 20,
        assignee: [],
        task: {
          total: 2,
          completed: 1,
        },
        attachments: 2,
        due_date: 'Sep 20, 2022',
        created_at: '2021-07-01',
        updated_at: '2021-07-01',
      },
      {
        id: 2,
        title: 'Feature: Adding dark mode',
        priority: 10,
        due_date: 'Dec 31, 2022',
        created_at: '2021-07-01',
        updated_at: '2021-07-01',
      },
      {
        id: 3,
        title: 'Buying Token is Not Working',
        description:
          'When you swap -> disconnect -> connect -> swap again, it will not work',
        priority: 30,
        assignee: [],
        attachments: 1,
        due_date: 'Due Today',
        created_at: '2021-07-01',
        updated_at: '2021-07-01',
      },
      {
        id: 4,
        title: 'Login is not working',
        priority: 30,
        assignee: [],
        attachments: 2,
        due_date: 'Overdue',
        created_at: '2021-07-01',
        updated_at: '2021-07-01',
      },
      {
        id: 5,
        title: 'Login Page Update',
        priority: 20,
        assignee: [],
        task: {
          total: 5,
          completed: 4,
        },
        due_date: 'Complete',
        created_at: '2021-07-01',
        updated_at: '2021-07-01',
      },
    ] as Issue[],
  }),
  actions: {
    createIssue(title: string, boardId?: number, assignees?: number[]) {
      this.issues.push({
        id: this.issues[this.issues.length - 1].id + 1,
        title,
        is_editing: true,
        ...(assignees ? { assignee: assignees } : {}),
        ...(boardId ? { board_id: boardId } : {}),
        due_date: 'Sep 20, 2022',
        created_at: '2021-07-01',
        updated_at: '2021-07-01',
      })
    },
    updateIssue(id: number, updates: Issue) {
      const updatedIssues = this.issues.map((issue) =>
        issue.id === id ? updates : issue
      )
      this.issues = updatedIssues
    },
    deleteIssue(id: number) {
      this.issues = this.issues.filter((issue) => issue.id !== id)
    },
  },
  getters: {
    getIssues: (state) => {
      return state.issues
    },
    getIssueById: (state) => {
      return (id: number) => state.issues.find((issue) => issue.id === id)
    },
    getUncategorizedIssues: (state) => {
      return state.issues.filter((issue) => !issue.board_id)
    },
    getOnlyCategorizedIssues: (state) => {
      return state.issues.filter((issue) => issue.board_id)
    },
  },
})
