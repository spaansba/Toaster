import { Alert, Button, Modal, Pressable, StyleSheet, View, TextInput } from "react-native"
import React, { forwardRef, useCallback, useMemo, useRef, useState } from "react"
import { ToastText } from "../ToastText"
import ToastTextButton from "../ToastTextButton"
import Ionicons from "@expo/vector-icons/Ionicons"
import { LegendList } from "@legendapp/list"
import { Image } from "expo-image"
import images from "@/constants/images"
import type { ToasterData } from "@/types/types"

type RecipientBottomSheetProps = {
  title: string
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipientBottomSheet = ({ isModalVisible, setIsModalVisible }: RecipientBottomSheetProps) => {
  const [searchText, setSearchText] = useState("")

  // Create a properly typed array of toaster data
  const mostUsedtoasters: ToasterData[] = useMemo(
    () => [
      { id: "1", style: "blue" },
      { id: "2", style: "green" },
      { id: "3", style: "yellow" },
      { id: "4", style: "purple" },
      { id: "5", style: "yellow" },
    ],
    []
  )

  const handleIsVisible = () => {
    setIsModalVisible((prev) => !prev)
  }

  // Memoize the render item function
  const renderItem = useCallback(
    ({ item }: { item: ToasterData }) => (
      <View className={`flex-row h-[50px] items-center ml-3 bg-${item.style}`}>
        <View className="border-black border-[1px] size-[35px] rounded-full overflow-hidden">
          <Image
            source={images.hoofd}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={0}
          />
        </View>
        <View className="flex-col ml-3">
          <ToastText className="font-courier-bold">Name</ToastText>
          <ToastText className="color-gray-500">Today</ToastText>
        </View>
      </View>
    ),
    []
  )

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={isModalVisible}
      onRequestClose={handleIsVisible}
    >
      <View className="h-full p-4 bg-toaster-yellow">
        <View className="flex-row justify-between items-center mb-6">
          {/* Headers */}
          <Pressable onPress={() => setIsModalVisible(false)}>
            <ToastText className="font-courier-bold text-xl">Cancel</ToastText>
          </Pressable>

          <View className="flex-col items-center absolute inset-x-0 mx-auto">
            <ToastText>ADD RECIPIENTS</ToastText>
            <ToastText>0/63</ToastText>
          </View>

          <Pressable onPress={() => setIsModalVisible(false)}>
            <ToastText className="font-courier-bold text-xl">Finish</ToastText>
          </Pressable>
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
          <ToastText>MOST USED TOASTERS</ToastText>
          <LegendList
            style={{ backgroundColor: "#fff3e1" }}
            data={mostUsedtoasters}
            estimatedItemSize={110}
            renderItem={renderItem}
            // onViewableItemsChanged={(info) => handleViewableItemsChanged(info)}
            // ListHeaderComponent={ListHeaderComponent}
            initialScrollOffset={0}
            keyExtractor={(item: ToasterData) => item.id}
          />
        </View>
      </View>
    </Modal>
  )
}

export default RecipientBottomSheet
