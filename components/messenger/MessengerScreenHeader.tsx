import { useRecipientsStore } from "@/providers/RecipientsStore"
import React from "react"
import BaseScreenHeader from "../ScreenHeader/BaseScreenHeader"
import ToasterButton from "../ToasterButton"

const MessengerScreenHeader = () => {
  const selectedRecipients = useRecipientsStore((state) => state.SelectedRecipients)
  const ShowModal = useRecipientsStore((state) => state.ShowRecipientSelectorModal)
  return (
    <BaseScreenHeader title={`Recipients (${selectedRecipients.length})`} onButtonPress={() => {}}>
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
