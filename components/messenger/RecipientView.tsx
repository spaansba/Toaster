import { useRecipientsStore } from "@/providers/RecipientsStore"
import React, { useState } from "react"
import { Button, View } from "react-native"
import { ToastText } from "../general/ToastText"
import RecipientModal from "./RecipientModal/RecipientModal"
import SelectedRecipientList from "./RecipientModal/SelectedList/SelectedRecipientList"

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
      <ToastText className="font-courier-bold text-xl">
        Recipients ({selectedRecipients.length})
      </ToastText>
      <SelectedRecipientList></SelectedRecipientList>
      <Button title="open" onPress={handlePresentModal}></Button>

      <RecipientModal isModalVisible={modalVisible} setIsModalVisible={setModalVisible} />
    </View>
  )
}

export default RecipientView
