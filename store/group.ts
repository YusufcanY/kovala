import { defineStore } from 'pinia'
import { useBoardStore } from '@/store/boards'
import type { Group } from '@/types/Group'
export const useGroupStore = defineStore('group', {
  state: () => ({
    groups: [
      {
        id: 10,
        name: 'Frontend',
        visibility: 10,
        icon: '/frontend_lkmt3e',
      },
      {
        id: 20,
        name: 'Backend',
        visibility: 10,
        icon: '/backend_r2hjvn',
      },
    ] as Group[],
  }),
  actions: {
    addGroup(details: { name: string; visibility: number }) {
      const ghost = {
        id: this.groups[0] ? this.groups[this.groups.length - 1].id + 10 : 10,
        visibility: details.visibility,
        name: details.name,
        icon: 'frontend_lkmt3e',
      }
      this.groups.push(ghost)
      return ghost
    },
    removeGroup(id: number) {
      this.groups = this.groups.filter((group) => group.id !== id)
    },
  },
  getters: {
    getGroups: (state) => {
      return state.groups
    },
    getGroupsForNavigation: (state) => {
      return state.groups.map((group) => {
        return {
          name: group.name,
          icon: group.icon,
          route: '/boards/' + group.id,
        }
      })
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
