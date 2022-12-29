import { useGroupStore } from '@/store/group'

export default defineNuxtRouteMiddleware((to) => {
  const group = useGroupStore()
  const result = group.getGroupById(Number(to.params.groupID))
  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: "We couldn't find that board group :/",
    })
  }
})
