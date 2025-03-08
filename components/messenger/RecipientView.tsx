import { View, Text, Button } from "react-native"
import React, { useState } from "react"
import RecipientModal from "./RecipientModal/RecipientModal"
import { ToastText } from "../general/ToastText"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"
import SelectedRecipientList from "./RecipientModal/SelectedList/SelectedRecipientList"

const RecipientView = () => {
  const handlePresentModal = () => setModalVisible(true)
  const [modalVisible, setModalVisible] = useState(false)
  const { selectedToasters } = useMessagingToasters()
  return (
    <View>
      <ToastText className="font-courier-bold text-xl">
        Recipients ({selectedToasters.length})
      </ToastText>
      <SelectedRecipientList></SelectedRecipientList>
      <Button title="open" onPress={handlePresentModal}></Button>

      <RecipientModal isModalVisible={modalVisible} setIsModalVisible={setModalVisible} />
    </View>
  )
}

export default RecipientView
