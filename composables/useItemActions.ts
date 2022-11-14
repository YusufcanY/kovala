import { useIssueStore } from '@/store/issues'
import type {
  AddedUpdate,
  MovedUpdate,
  RemovedUpdate,
} from '@/types/IssueActions'

export default function () {
  const issueStore = useIssueStore()
  function added(e: AddedUpdate, listId: number) {
    const ghost = e.element
    ghost.board_id = listId
    ghost.index_in_board = e.newIndex
    issueStore.updateIssue(e.element.id, ghost)
    const issuesAfterAddedIssue = issueStore.issues.filter(
      (issue) =>
        issue.index_in_board >= ghost.index_in_board &&
        issue.board_id === ghost.board_id &&
        ghost.id !== issue.id
    )
    issuesAfterAddedIssue.forEach((issue) => {
      const ghost = issue
      ghost.index_in_board = issue.index_in_board + 1
      issueStore.updateIssue(issue.id, ghost)
    })
  }
  function removed(e: RemovedUpdate, listId: number) {
    const issuesAfterRemovedIssue = issueStore.issues.filter(
      (issue) => issue.index_in_board > e.oldIndex && issue.board_id === listId
    )
    issuesAfterRemovedIssue.forEach((issue) => {
      const ghost = issue
      ghost.index_in_board = issue.index_in_board - 1
      issueStore.updateIssue(issue.id, ghost)
    })
  }
  function moved(e: MovedUpdate, listId: number) {
    const ghost = e.element
    ghost.index_in_board = e.newIndex
    issueStore.updateIssue(e.element.id, ghost)
    if (e.newIndex > e.oldIndex) {
      const issuesAfterMovedIssue = issueStore.issues.filter((issue) => {
        if (e) {
          return (
            issue.index_in_board > e.oldIndex &&
            issue.index_in_board <= e.newIndex &&
            issue.board_id === listId &&
            issue.id !== e.element.id
          )
        } else return false
      })
      issuesAfterMovedIssue.forEach((issue) => {
        const ghost = issue
        ghost.index_in_board = issue.index_in_board - 1
        issueStore.updateIssue(issue.id, ghost)
      })
    } else {
      const issuesAfterMovedIssue = issueStore.issues.filter((issue) => {
        if (e) {
          return (
            issue.index_in_board >= e.newIndex &&
            issue.index_in_board < e.oldIndex &&
            issue.board_id === listId &&
            issue.id !== e.element.id
          )
        } else return false
      })
      issuesAfterMovedIssue.forEach((issue) => {
        const ghost = issue
        ghost.index_in_board = issue.index_in_board + 1
        issueStore.updateIssue(issue.id, ghost)
      })
    }
  }
  return { added, removed, moved }
}
