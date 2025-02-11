import React, { useState } from "react"
import { TouchableOpacity, Text, View, ActivityIndicator, LayoutChangeEvent } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type ButtonTitle = {
  text: string
  updating?: {
    updateText: string
    isUpdating: boolean
  }
}

type ToasterButtonProps = {
  title: ButtonTitle
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  variant?: "yellow" | "green" | "blue" | "pink" | "orange" | "purple"
  icon?: keyof typeof Ionicons.glyphMap
  iconSize?: number
}

const VARIANTS = {
  yellow: {
    bg: "bg-toaster-yellow",
    text: "text-black",
    loading: "#000000",
  },
  green: {
    bg: "bg-toaster-green",
    text: "text-black",
    loading: "#000000",
  },
  blue: {
    bg: "bg-toaster-blue",
    text: "text-black",
    loading: "#000000",
  },
  pink: {
    bg: "bg-toaster-pink",
    text: "text-black",
    loading: "#000000",
  },
  orange: {
    bg: "bg-toaster-orange",
    text: "text-black",
    loading: "#000000",
  },
  purple: {
    bg: "bg-toaster-purple",
    text: "text-black",
    loading: "#000000",
  },
}

function ToasterButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "yellow",
  icon,
  iconSize = 25,
}: ToasterButtonProps): JSX.Element {
  const [buttonLayout, setButtonLayout] = useState({ width: 0, height: 0 })

  const getBackgroundColor = () => {
    if (disabled) return "bg-gray-300"
    return VARIANTS[variant].bg
  }

  const getTextColor = () => {
    if (disabled) return "text-gray-500"
    return VARIANTS[variant].text
  }

  const getLoadingColor = () => {
    if (disabled) return "#6B7280"
    return VARIANTS[variant].loading
  }

  const renderIcon = () => {
    if (loading) {
      return <ActivityIndicator color={getLoadingColor()} className="mr-2" />
    }

    if (icon) {
      return (
        <Ionicons
          name={icon}
          size={iconSize}
          color={disabled ? "#6B7280" : "black"}
          className="mr-2"
        />
      )
    }

    return null
  }

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setButtonLayout({ width, height })
  }

  const buttonTitle = title.updating?.isUpdating ? title.updating.updateText : title.text

  return (
    <View className="relative mb-4 w-full">
      <View
        className="absolute top-1.5 left-1.5 bg-black rounded"
        style={{
          width: buttonLayout.width,
          height: buttonLayout.height,
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        disabled={disabled || loading}
        onLayout={onLayout}
        className={`
          relative
          px-6 
          py-3.5 
          rounded
          border-2 
          border-black
          ${getBackgroundColor()}
        `}
      >
        <View className="flex-row items-center justify-center">
          <View className="absolute left-0">{renderIcon()}</View>

          <View className="flex-1 items-center">
            <Text
              className={`
                text-lg
                font-courier-bold
                leading-[20px]
                ${getTextColor()}
              `}
            >
              {buttonTitle}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
export default ToasterButton
