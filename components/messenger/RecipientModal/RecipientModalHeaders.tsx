import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { ToastText } from "@/components/general/ToastText"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"

type RecipientModalHeadersProps = {
  onCancelPress: () => void
  onFinishPress: () => void
}

const RecipientModalHeaders = ({ onCancelPress, onFinishPress }: RecipientModalHeadersProps) => {
  const { selectedToasters } = useMessagingToasters()
  return (
    <View className="flex-row justify-between items-center mb-6">
      <TouchableOpacity onPress={onCancelPress}>
        <ToastText className="font-courier-bold text-xl">Cancel</ToastText>
      </TouchableOpacity>

      <View className="flex-col items-center">
        <ToastText>ADD RECIPIENTS</ToastText>
        <ToastText>{`${selectedToasters.length}/63`}</ToastText>
      </View>

      <TouchableOpacity onPress={onFinishPress}>
        <ToastText className="font-courier-bold text-xl">Finish</ToastText>
      </TouchableOpacity>
    </View>
  )
}

export default RecipientModalHeaders
