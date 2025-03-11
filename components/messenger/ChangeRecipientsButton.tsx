import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import { Ionicons } from "@expo/vector-icons"

const ChangeRecipientsButton = () => {
  const showModal = useRecipientsStore((state) => state.ShowRecipientSelectorModal)

  return (
    <TouchableOpacity
      onPress={showModal}
      className="flex-row items-center bg-primary-200 border border-primary-300 px-3 py-1.5"
    >
      <View className="p-1">
        <Ionicons name="add" size={20} color={"#000"} />
      </View>
    </TouchableOpacity>
  )
}

export default ChangeRecipientsButton
