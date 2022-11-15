import { defineStore } from 'pinia'
import type { Issue } from '@/types/Board'

export const useIssueStore = defineStore('issues', {
  state: () => ({
    issues: [
      {
        id: 1,
        title: 'Landing Page New Desing',
        description: 'The current design is looks bad',
        board_id: 10,
        index_in_board: 0,
        priority: 20,
        assignee: [],
        task: {
          total: 2,
          completed: 1,
        },
        attachments: 2,
        due_date: 1668451017000,
        created_at: 1668497409000,
        updated_at: 1668497409000,
      },
      {
        id: 2,
        title: 'Feature: Adding dark mode',
        priority: 10,
        board_id: 10,
        index_in_board: 2,
        assignee: [],
        created_at: 1668497409000,
        updated_at: 1668497409000,
      },
      {
        id: 3,
        title: 'Buying Token is Not Working',
        description: 'test it bruh',
        priority: 30,
        board_id: 10,
        index_in_board: 1,
        assignee: [],
        attachments: 1,
        due_date: 1668671017000,
        created_at: 1668497409000,
        updated_at: 1668497409000,
      },
      {
        id: 4,
        title: 'Login is not working',
        priority: 30,
        assignee: [],
        attachments: 2,
        due_date: 1668671017000,
        created_at: 1668497409000,
        updated_at: 1668497409000,
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
        due_date: 1668671017000,
        created_at: 1668497409000,
        updated_at: 1668497409000,
      },
    ] as Issue[],
  }),
  actions: {
    createIssue(title: string, boardId: number, assignees?: number[]) {
      this.issues.forEach((issue) => {
        if (issue.board_id === boardId) {
          issue.index_in_board += 1
        }
      })
      this.issues.push({
        id: this.issues[this.issues.length - 1].id + 1,
        title,
        is_editing: true,
        ...(assignees ? { assignee: assignees } : { assignee: [] }),
        board_id: boardId || 0,
        index_in_board: 0,
        created_at: Date.now(),
        updated_at: Date.now(),
      })
    },
    updateIssue(id: number, updates: Issue) {
      updates.updated_at = Date.now()
      const updatedIssues = this.issues.map((issue) =>
        issue.id === id ? updates : issue
      )
      this.issues = updatedIssues
    },
    deleteIssue(id: number) {
      this.issues = this.issues.filter((issue) => issue.id !== id)
    },
    addAssignee(id: number, assigneeId: number) {
      const updatedIssues = this.issues.map((issue) => {
        if (issue.id === id) {
          if (issue.assignee.includes(assigneeId)) {
            issue.assignee = issue.assignee.filter(
              (assignee) => assignee !== assigneeId
            )
          } else {
            return { ...issue, assignee: [...issue.assignee, assigneeId] }
          }
        }
        return issue
      })
      this.issues = updatedIssues
      console.log('this.issues :>> ', this.issues)
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
