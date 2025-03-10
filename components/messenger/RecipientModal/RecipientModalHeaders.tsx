import { ToastText } from "@/components/general/ToastText"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import React from "react"
import { TouchableOpacity, View } from "react-native"

type RecipientModalHeadersProps = {
  onCancelPress: () => void
  onFinishPress: () => void
}

const RecipientModalHeaders = ({ onCancelPress, onFinishPress }: RecipientModalHeadersProps) => {
  const selectedRecipients = useRecipientsStore((state) => state.SelectedRecipients)

  return (
    <View className="flex-row justify-between items-center mb-6">
      <TouchableOpacity onPress={onCancelPress}>
        <ToastText className="font-courier-bold text-xl">Cancel</ToastText>
      </TouchableOpacity>

      <View className="flex-col items-center">
        <ToastText>ADD RECIPIENTS</ToastText>
        <ToastText>{`${selectedRecipients.length}/63`}</ToastText>
      </View>

      <TouchableOpacity onPress={onFinishPress}>
        <ToastText className="font-courier-bold text-xl">Finish</ToastText>
      </TouchableOpacity>
    </View>
  )
}

export default RecipientModalHeaders
