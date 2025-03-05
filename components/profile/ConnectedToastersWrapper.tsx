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

  return <></>
}

export default ConnectedToastersWrapper
