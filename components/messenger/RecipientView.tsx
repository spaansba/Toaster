import { useRecipientsStore } from "@/providers/RecipientsStore"
import React, { useState } from "react"
import { Button, View } from "react-native"
import { ToastText } from "../general/ToastText"
import RecipientModal from "./RecipientModal/RecipientModal"
import SelectedRecipientList from "./RecipientModal/SelectedList/SelectedRecipientList"
import ToasterButton from "../ToasterButton"

const RecipientView = () => {
  const handlePresentModal = () => setModalVisible(true)
  const [modalVisible, setModalVisible] = useState(false)
  const selectedRecipients = useRecipientsStore((state) => state.SelectedRecipients)

  const handlePressSelectedRecipients = () => {
    if (!selectedRecipients.length) {
      setModalVisible(true)
    }
  }
  return (
    <View>
      <View className="flex-row justify-between">
        <ToastText className="font-courier-bold text-xl">
          Recipients ({selectedRecipients.length})
        </ToastText>

        <ToasterButton
          className="h-[25px] w-[50px]"
          content={{
            type: "text",
            text: "+",
          }}
          shadowOffset={2}
          onPress={handlePresentModal}
          variant="green"
          borderRadius={80}
        />
      </View>

      <SelectedRecipientList></SelectedRecipientList>
      <View className="mt-5">
        <RecipientModal isModalVisible={modalVisible} setIsModalVisible={setModalVisible} />
      </View>
    </View>
  )
}

export default RecipientView
