import Ionicons from "@expo/vector-icons/Ionicons"
import React, { useEffect, useState } from "react"
import { Modal, Pressable, TextInput, TouchableOpacity, View } from "react-native"
import { ToastText } from "../../general/ToastText"
import RecipientSectionList from "./RecipientSectionList"
import SelectedRecipientList from "./SelectedRecipientList"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"
import type { CardToaster } from "@/types/types"

type RecipientBottomSheetProps = {
  title: string
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipientModal = ({ isModalVisible, setIsModalVisible }: RecipientBottomSheetProps) => {
  const [searchText, setSearchText] = useState("")
  const isFiltered = searchText.length > 0
  const { availableToasters } = useMessagingToasters()
  const [filteredToasterList, setFilteredToasterList] = useState<CardToaster[]>([])

  useEffect(() => {
    if (!isFiltered) {
      setFilteredToasterList(availableToasters)
    } else {
      const filteredToasters: CardToaster[] = availableToasters.filter((toaster) => {
        return toaster.toaster_name.includes(searchText)
      })
      setFilteredToasterList(filteredToasters)
    }
  }, [searchText, availableToasters])
  const handleIsVisible = () => {
    setIsModalVisible((prev) => !prev)
  }
  const { selectedToasters } = useMessagingToasters()

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={isModalVisible}
      onRequestClose={handleIsVisible}
    >
      <View className="h-full p-4 bg-primary-200">
        <View className="flex-row justify-between items-center mb-6">
          {/* Headers */}
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <ToastText className="font-courier-bold text-xl">Cancel</ToastText>
          </TouchableOpacity>

          <View className="flex-col items-center">
            <ToastText>ADD RECIPIENTS</ToastText>
            <ToastText>{`${selectedToasters.length}/63`}</ToastText>
          </View>

          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <ToastText className="font-courier-bold text-xl">Finish</ToastText>
          </TouchableOpacity>
        </View>

        {/* SearchBar */}
        <View className="flex-row items-center bg-white rounded-lg px-3 mb-4">
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            className="ml-2 flex-1"
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
            style={{
              fontFamily: "Courier",
              fontSize: 16,
              height: 40,
              padding: 0,
              margin: 0,
              textAlignVertical: "center",
            }}
          />
          {searchText.length > 0 && (
            <Pressable hitSlop={20} onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </Pressable>
          )}
        </View>

        <View className="mb-4">
          <SelectedRecipientList />
        </View>

        {/* Give flex-1 to this container to allow proper scrolling */}
        <View className="flex-1">
          <RecipientSectionList filteredToasterList={filteredToasterList} isFiltered={isFiltered} />
        </View>
      </View>
    </Modal>
  )
}

export default RecipientModal
