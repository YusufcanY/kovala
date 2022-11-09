import { defineStore } from 'pinia'
import { useIssueStore } from '@/store/issues'
import type { List } from '@/types/Board'

export const useBoardStore = defineStore('boards', {
  state: () => ({
    boards: [
      {
        id: 10,
        name: 'To Do',
        color: '#FF0000',
      },
      {
        id: 20,
        name: 'In Progress',
        color: '#FF0000',
      },
      {
        id: 30,
        name: 'Testing',
        color: '#FF0000',
      },
      {
        id: 40,
        name: 'Resolved',
        color: '#FF0000',
      },
      {
        id: 50,
        name: 'Closed',
        color: '#FF0000',
      },
    ] as List[],
  }),
  actions: {
    addBoard() {
      this.boards.push({
        id: this.boards[this.boards.length - 1].id + 10,
        name: 'New Board',
        color: '#FF0000',
        is_editing: true,
      })
    },
    removeBoard(id: number) {
      this.boards = this.boards.filter((board) => board.id !== id)
    },
  },
  getters: {
    getBoardById: (state) => {
      return (id: number) => state.boards.find((board) => board.id === id)
    },
    getBoardsWithIssues: (state) => {
      const issueStore = useIssueStore()
      return state.boards.map((board) => {
        return {
          ...board,
          issues: issueStore.issues.filter(
            (issue) => issue.board_id === board.id
          ),
        }
      })
    },
  },
})
