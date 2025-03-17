import { Ionicons } from "@expo/vector-icons"
import React, { useRef } from "react"
import { TextInput, View } from "react-native"
import CrossButton from "./CrossSquare"

type SearchBarProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const inputRef = useRef<TextInput>(null)

  const handleClearText = () => {
    setSearchQuery("")
    // Keep focus on the input to prevent keyboard dismissal
    inputRef.current?.focus()
  }

  return (
    <View className="flex-row items-center bg-gray-200 rounded-lg px-3 mb-4">
      <Ionicons name="search-outline" size={20} color="#666" />
      <TextInput
        ref={inputRef}
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
        <CrossButton size={20} borderColor="#6b7280" onPress={handleClearText} />
      )}
    </View>
  )
}

export default SearchBar
