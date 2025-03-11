import React from "react"
import { View } from "react-native"
import RecipientModal from "./RecipientModal/RecipientModal"
import ModalSelectedRecipientList from "./RecipientModal/SelectedList/ModalSelectedRecipientList"

const RecipientView = () => {
  return (
    <View>
      <ModalSelectedRecipientList ShowDeleteAllButton={false}></ModalSelectedRecipientList>
      <View className="mt-5">
        <RecipientModal />
      </View>
    </View>
  )
}

export default RecipientView
