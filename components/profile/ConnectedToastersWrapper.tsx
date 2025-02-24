import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import ConnectedToaster from "./ConnectedToaster"
import { LegendList } from "@legendapp/list"
import { Feather } from "@expo/vector-icons"

// Define the valid toaster style types
type ToasterStyle = "blue" | "green" | "pink" | "yellow" | "orange" | "purple"

interface ToasterData {
  id: string
  style: ToasterStyle
}

const ConnectedToastersWrapper = () => {
  const [searchQuery, setSearchQuery] = useState("")
  // Create a properly typed array of toaster data
  const toasters: ToasterData[] = [
    { id: "1", style: "blue" },
    { id: "2", style: "green" },
    { id: "3", style: "pink" },
    { id: "4", style: "pink" },
    { id: "5", style: "pink" },
    { id: "6", style: "pink" },
    { id: "7", style: "pink" },
    { id: "8", style: "pink" },
    { id: "9", style: "pink" },
    { id: "10", style: "green" },
  ]

  return (
    <>
      <LegendList
        style={{ backgroundColor: "white" }}
        data={toasters}
        estimatedItemSize={110}
        renderItem={({ item }) => (
          <ConnectedToaster handleOnSettingsPress={() => {}} style={item.style} />
        )}
        ListHeaderComponent={
          <View className="px-4 py-3 bg-white border-b-[1px] border-black">
            <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-2 border-[1px] border-black">
              <Feather name="search" size={18} color="black" />
              <TextInput
                className="flex-1 ml-2 font-courier"
                placeholder="Search toasters..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Feather name="x" size={18} color="black" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        }
        initialScrollIndex={1}
        keyExtractor={(item) => item.id}
        maintainVisibleContentPosition={true}
        // Performance optimizations
        removeClippedSubviews={true}
      />
    </>
  )
}

export default ConnectedToastersWrapper
