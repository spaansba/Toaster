import { View, Text } from "react-native"
import React from "react"
import { useAuth } from "@/providers/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import {
  createAllUsersQueryOptions,
  createLoggedInUserQueryOptions,
} from "@/state/serverState/queryOptions"
import LoadingSpinner from "../LoadingSpinner"

const ProfileWrapper = () => {
  const { session } = useAuth()

  // const { data, isLoading } = useQuery({
  //   ...createLoggedInUserQueryOptions(session?.user.id),
  //   throwOnError: true, // Make error boundary work on Async errors
  // })

  const { data, isLoading } = useQuery({
    ...createAllUsersQueryOptions(),
    throwOnError: true, // Make error boundary work on Async errors
  })

  console.log(data)
  if (isLoading) return <LoadingSpinner />

  // Null check for data
  if (!data) return null
  return (
    <View className="p-4">
      {/* <View className="bg-slate-300 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-4">
        <Text className="text-2xl font-bold text-black">{data[1].username}</Text>
      </View>
      <View className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <Text className="text-black">{data.avatar_url ?? "No avatar set"}</Text>
      </View> */}
    </View>
  )
}

export default ProfileWrapper
