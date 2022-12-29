import { defineStore } from 'pinia'
import { useBoardStore } from '@/store/boards'

export const useGroupStore = defineStore('group', {
  state: () => ({
    groups: [
      {
        id: 10,
        name: 'Frontend',
        icon: '/frontend_lkmt3e',
      },
      {
        id: 20,
        name: 'Backend',
        icon: '/backend_r2hjvn',
      },
    ],
  }),
  actions: {
    addGroup() {
      this.groups.push({
        id: this.groups[0] ? this.groups[this.groups.length - 1].id + 10 : 10,
        name: 'New Group',
        icon: 'frontend_lkmt3e',
      })
    },
    removeGroup(id: number) {
      this.groups = this.groups.filter((group) => group.id !== id)
    },
  },
  getters: {
    getGroups: (state) => {
      return state.groups
    },
    getGroupById: (state) => {
      return (id: number) => state.groups.find((group) => group.id === id)
    },
    getBoardsOfGroup: () => {
      const boardStore = useBoardStore()
      return (id: number) =>
        boardStore.boards.filter((board) => board.group_id === id)
    },
  },
})
