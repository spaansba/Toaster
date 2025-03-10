import { useRecipientsStore } from "@/providers/RecipientsStore"
import React from "react"
import BaseScreenHeader from "../ScreenHeader/BaseScreenHeader"
import ToasterButton from "../ToasterButton"

const MessengerScreenHeader = () => {
  const selectedRecipients = useRecipientsStore((state) => state.SelectedRecipients)
  const ShowModal = useRecipientsStore((state) => state.ShowRecipientSelectorModal)
  return (
    <BaseScreenHeader title={`Recipients (${selectedRecipients.length})`} onButtonPress={() => {}}>
      {/* <View
        className="absolute bg-black"
        style={{
          left: 1.2,
          top: 1.2,
          borderRadius: 999999999,
          width: 35,
          height: 35,
        }}
      /> */}
      <ToasterButton
        className="h-[25px] w-[50px]"
        content={{
          type: "text",
          text: "+",
        }}
        shadowOffset={2}
        onPress={ShowModal}
        variant="green"
        borderRadius={80}
      />
    </BaseScreenHeader>
  )
}

export default MessengerScreenHeader
