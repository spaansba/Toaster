import PressableText from "@/components/general/PressableText"
import { ToastText } from "@/components/general/ToastText"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import React from "react"
import { Pressable, TouchableOpacity, View } from "react-native"

type RecipientModalHeadersProps = {
  onCancelPress: () => void
  onFinishPress: () => void
}

const RecipientModalHeaders = ({ onCancelPress, onFinishPress }: RecipientModalHeadersProps) => {
  const selectedRecipients = useRecipientsStore((state) => state.SelectedRecipients)

  return (
    <View className="flex-row justify-between items-center mb-6">
      <PressableText onPress={onCancelPress} label="Cancel" />

      <View className="flex-col items-center">
        <ToastText>ADD RECIPIENTS</ToastText>
        <ToastText>{`${selectedRecipients.length}/63`}</ToastText>
      </View>

      <PressableText onPress={onFinishPress} label="Finish" />
    </View>
  )
}

export default RecipientModalHeaders
