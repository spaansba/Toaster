import { useRecipientsStore } from "@/providers/RecipientsStore"
import { LegendList } from "@legendapp/list"
import React from "react"
import MessageRecipientItem from "./MessageRecipientItem"
import { View } from "react-native"

const MessageRecipientList = () => {
  const selectedRecipients = useRecipientsStore((state) => state.SelectedRecipients)

  return (
    <View className="min-h-[50px]">
      <LegendList
        data={selectedRecipients}
        renderItem={({ item }) => <MessageRecipientItem toaster={item} />}
        keyExtractor={(item) => item.toasterId}
        horizontal={true}
        estimatedItemSize={140}
      />
    </View>
  )
}

export default MessageRecipientList
