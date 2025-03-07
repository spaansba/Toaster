import { View, Text, TextInput } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import CrossButton from "./CrossButton"

type SearchBarProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-gray-200 rounded-lg px-3 mb-4">
      <Ionicons name="search-outline" size={20} color="#666" />
      <TextInput
        className="ml-2 flex-1"
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
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
      {searchQuery.length > 0 && (
        <CrossButton backgroundColor="#6b7280" onPress={() => setSearchQuery("")} />
      )}
    </View>
  )
}

export default SearchBar
