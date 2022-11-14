import type { Issue } from '@/types/Board'
interface AddedUpdate {
  newIndex: number
  element: Issue
}
interface RemovedUpdate {
  oldIndex: number
  element: Issue
}
interface MovedUpdate {
  oldIndex: number
  newIndex: number
  element: Issue
}
interface ChangeEventCallback {
  added?: AddedUpdate
  removed?: RemovedUpdate
  moved?: MovedUpdate
}
export type { AddedUpdate, RemovedUpdate, MovedUpdate, ChangeEventCallback }
