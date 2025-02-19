import { useAuth } from "@/providers/AuthProvider"
import { createLoggedInUserQueryOptions } from "@/state/serverState/queryOptions"
import { QueryCache, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { Stack } from "expo-router"
import React, { useEffect } from "react"
import { useReactQueryDevTools } from "@dev-plugins/react-query"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // After 5min refetch on new instance of query mount or refetch interval hit
      gcTime: 1000 * 60 * 60, // 1 hour before inactive cache
      retry: 1, // Default but nice to be explicit
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Only show error toasts if we already have data in the cache
      // which indicates a failed background update
      // This means that stale ui will be intact
      if (query.state.data !== undefined) {
        console.error(`Background update Error: ${error.message}`)
        // toast.error(`Something went wrong: ${error.message}`)
      }
    },
  }),
})

export default function RootLayout() {
  const { session, isLoading } = useAuth()
  useReactQueryDevTools(queryClient)

  // Wrap prefetching in an useEffect since enabled flag on querie options dont work on prefetched queries.
  useEffect(() => {
    if (!isLoading && session?.user.id) {
      queryClient.prefetchQuery(createLoggedInUserQueryOptions(session.user.id))
    }
  }, [session, isLoading])

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  )
}
