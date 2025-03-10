import React from "react"
import { View } from "react-native"
import RecipientModal from "./RecipientModal/RecipientModal"
import SelectedRecipientList from "./RecipientModal/SelectedList/SelectedRecipientList"

const RecipientView = () => {
  return (
    <View>
      <SelectedRecipientList ShowDeleteAllButton={false}></SelectedRecipientList>
      <View className="mt-5">
        <RecipientModal />
      </View>
    </View>
  )
}

export default RecipientView
