import { ToastText } from "@/components/general/ToastText"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import { LegendList } from "@legendapp/list"
import React from "react"
import { TouchableOpacity } from "react-native"
import MessageRecipientListItem from "./MessageRecipientListItem"
import Animated, { LinearTransition } from "react-native-reanimated"
import MessageRecipientSingleItem from "./MessageRecipientSingleItem"
import type { BefriendedToaster } from "@/types/types"
import PressableText from "@/components/general/PressableText"

type MessageRecipientListProps = {
  onToasterPress: (toaster: BefriendedToaster) => void
}

const MessageRecipientList = ({ onToasterPress }: MessageRecipientListProps) => {
  const selectedRecipients = useRecipientsStore((state) => state.SelectedRecipients)
  const ShowModal = useRecipientsStore((state) => state.ShowRecipientSelectorModal)

  const renderContent = () => {
    switch (selectedRecipients.length) {
      case 0:
        return (
          <PressableText
            onPress={ShowModal}
            label="No Recipient(s) Selected"
            wrapperClassname="size-full justify-center items-center flex-row"
            isBold={false}
            textClassname="text-md"
          />
        )

      case 1:
        return (
          <MessageRecipientSingleItem
            toaster={selectedRecipients[0]}
            onToasterPress={onToasterPress}
          />
        )

      default:
        // For cases where selectedRecipients.length > 1
        return (
          <LegendList
            data={selectedRecipients}
            renderItem={({ item }) => <MessageRecipientListItem toaster={item} />}
            keyExtractor={(item) => item.toasterId}
            horizontal={true}
            estimatedItemSize={140}
          />
        )
    }
  }

  return (
    <Animated.View layout={LinearTransition.duration(300)} className="h-[50px] ml-4 pt-[2px]">
      {renderContent()}
    </Animated.View>
  )
}

export default MessageRecipientList
