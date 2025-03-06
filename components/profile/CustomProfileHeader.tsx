import { FontAwesome } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

type CustomProfileHeaderProps = {
  title: string
}

const CustomProfileHeader = ({ title }: CustomProfileHeaderProps) => {
  const router = useRouter()

  return (
    <View className="h-[80px] pt-10 px-5 flex-row items-center justify-between bg-primary-200 ">
      <Text className="text-xl font-bold">{title}</Text>
      <TouchableOpacity
        className="p-[5px]"
        // onPress={() => router.push("/settings")}
      >
        <FontAwesome name="cog" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default CustomProfileHeader
