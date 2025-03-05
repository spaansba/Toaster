import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SectionList,
} from "react-native"
import React, { useCallback, useState } from "react"
import { ToastText } from "../general/ToastText"
import Ionicons from "@expo/vector-icons/Ionicons"
import type { ToasterData, ToasterStyle } from "@/types/types"
import ToasterCard from "./ToasterCard"

type RecipientBottomSheetProps = {
  title: string
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

type userSectionListData = {
  title: string
  data: {
    id: string
    name: string
    style: ToasterStyle
  }[]
}

const RecipientBottomSheet = ({ isModalVisible, setIsModalVisible }: RecipientBottomSheetProps) => {
  const [searchText, setSearchText] = useState("")
  const sectionData: userSectionListData[] = [
    {
      title: "Most Used Toasters",
      data: [
        { id: "t001", name: "BreakfastMaster 3000", style: "blue" },
        { id: "t002", name: "ToastPro Elite", style: "green" },
        { id: "t003", name: "CrispMaker Deluxe", style: "pink" },
      ],
    },
    {
      title: "A",
      data: [
        { id: "t004", name: "Avocado Toaster", style: "yellow" },
        { id: "t005", name: "AlphaBake Supreme", style: "orange" },
        { id: "t006", name: "ArtisanCrisp", style: "purple" },
      ],
    },
    {
      title: "B",
      data: [{ id: "t007", name: "BagelMaster Pro", style: "blue" }],
    },
    {
      title: "C",
      data: [
        { id: "t011", name: "CrispnCrunchy", style: "orange" },
        { id: "t012", name: "CuisineToast", style: "purple" },
        { id: "t013", name: "ClassicCrisp", style: "blue" },
      ],
    },
  ]
  const handleIsVisible = () => {
    setIsModalVisible((prev) => !prev)
  }

  // Memoize the render item function
  const renderItem = useCallback(
    ({
      item,
      index,
      section,
    }: {
      item: ToasterData
      index: number
      section: userSectionListData
    }) => {
      const isFirst = index === 0
      const isLast = index === section.data.length - 1
      return <ToasterCard style={item.style} isFirst={isFirst} isLast={isLast} />
    },
    []
  )

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

          <View className="flex-col items-center absolute inset-x-0 mx-auto">
            <ToastText>ADD RECIPIENTS</ToastText>
            <ToastText>0/63</ToastText>
          </View>

          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <ToastText className="font-courier-bold text-xl">Finish</ToastText>
          </TouchableOpacity>
        </View>

        {/* SearchBar */}
        <View className="flex-row items-center bg-white rounded-full px-3 py-2 mb-4">
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 font-courier text-base"
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </Pressable>
          )}
        </View>

        <View>
          <SectionList
            sections={sectionData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section: { title } }) => (
              <View className="">
                <ToastText className="font-courier-bold bg-primary-200">{title}</ToastText>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  )
}

export default RecipientBottomSheet
