import { defineStore } from 'pinia'
import { useIssueStore } from '@/store/issues'
import { useGroupStore } from '@/store/group'
import type { List } from '@/types/Board'

export const useBoardStore = defineStore('boards', {
  state: () => ({
    boards: [
      {
        id: 10,
        group_id: 10,
        name: 'To Do',
        color: '#eba834',
      },
      {
        id: 20,
        group_id: 20,
        name: 'In Progress',
        color: '#77eb34',
      },
      {
        id: 30,
        group_id: 10,
        name: 'Testing',
        color: '#3440eb',
      },
      {
        id: 40,
        group_id: 10,
        name: 'Resolved',
        color: '#d634eb',
      },
      {
        id: 50,
        group_id: 10,
        name: 'Closed',
        color: '#e82c5e',
      },
    ] as List[],
  }),
  actions: {
    addBoard(groupId: number) {
      this.boards.push({
        id: this.boards[0] ? this.boards[this.boards.length - 1].id + 10 : 10,
        group_id: groupId,
        name: 'New Board',
        color: '#FFF',
        is_editing: true,
      })
    },
    removeBoard(id: number) {
      this.boards = this.boards.filter((board) => board.id !== id)
    },
    updateBoard(id: number, updates: List) {
      const updatedBoards = this.boards.map((issue) =>
        issue.id === id ? updates : issue
      )
      this.boards = updatedBoards
    },
    toggleBoardEditing(id: number) {
      this.boards.forEach((board) => {
        if (board.id === id) {
          board.is_editing = !board.is_editing
        }
      })
    },
  },
  getters: {
    getBoardById: (state) => {
      return (id: number) => state.boards.find((board) => board.id === id)
    },
    getBoardsWithIssues: () => {
      const issueStore = useIssueStore()
      const groupStore = useGroupStore()
      return (groupID: number) => {
        const boards = groupStore.getBoardsOfGroup(groupID)
        return boards.map((board) => {
          return {
            ...board,
            issues: issueStore.issues.filter(
              (issue) => issue.board_id === board.id
            ),
          }
        })
      }
    },
  },
})
