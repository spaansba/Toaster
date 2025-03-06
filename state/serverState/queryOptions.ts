import { queryOptions } from "@tanstack/react-query"
import { getLoggedInUser } from "./getLoggedInUser"

export function createLoggedInUserQueryOptions(userId: string | undefined) {
  return queryOptions({
    queryKey: ["loggedInUser", userId],
    queryFn: () => getLoggedInUser(userId),
    enabled: !!userId, // This doesnt effect prefetched queries.
  })
}
