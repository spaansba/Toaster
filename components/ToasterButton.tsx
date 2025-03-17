import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import {
  ActivityIndicator,
  LayoutChangeEvent,
  Pressable,
  View,
  type AnimatableNumericValue,
  type DimensionValue,
} from "react-native"
import type { SvgProps } from "react-native-svg"
import { ToastText } from "./general/ToastText"

type ButtonContent =
  | {
      type: "text"
      text: string
      updating?: {
        updateText: string
        isUpdating: boolean
      }
      leftIcon?: {
        glyph: keyof typeof Ionicons.glyphMap
        size?: number
      }
    }
  | {
      type: "ionicon"
      icon: keyof typeof Ionicons.glyphMap
      size?: number
    }
  | {
      type: "svg-component"
      SvgComponent: React.ComponentType<SvgProps>
      size?: number
    }
  | {
      type: "svg-element"
      element: React.ReactElement
    }

type ToasterButtonProps = {
  content: ButtonContent
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  variant?: "yellow" | "green" | "blue" | "pink" | "orange" | "purple" | "white"
  onPressColor?: string
  borderRadius?: string | AnimatableNumericValue | undefined
  shadowOffset?: DimensionValue | undefined
  className?: string
}

const VARIANTS = {
  white: {
    bg: "bg-white",
    text: "text-black",
    loading: "#000000",
  },
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
  content,
  onPress,
  onPressColor = "#dc87f3",
  disabled = false,
  loading = false,
  variant = "yellow",
  borderRadius = 8,
  shadowOffset = 5,
  className = "", // Default to empty string
}: ToasterButtonProps): JSX.Element {
  const [buttonLayout, setButtonLayout] = useState({ width: 0, height: 0 })
  const [isPressed, setIsPressed] = useState(false)

  const getBackgroundColor = () => {
    if (disabled) return "bg-gray-300"
    if (isPressed) return "bg-accent-button-press"
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

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={getLoadingColor()} />
    }

    switch (content.type) {
      case "text": {
        return (
          <View className="flex-row items-center justify-center z-20">
            {content.leftIcon && (
              <View className="absolute left-0">
                <Ionicons
                  name={content.leftIcon.glyph}
                  size={content.leftIcon.size ?? 25}
                  color={disabled ? "#6B7280" : "black"}
                  className="mr-2"
                />
              </View>
            )}

            <View className="flex-1 items-center">
              <ToastText
                className={`
                  text-lg
                  font-courier-bold
                  leading-[20px]
                  ${getTextColor()}
                `}
              >
                {content.updating?.isUpdating ? content.updating.updateText : content.text}
              </ToastText>
            </View>
          </View>
        )
      }

      case "ionicon": {
        return (
          <View className="items-center justify-center">
            <Ionicons
              name={content.icon}
              size={content.size ?? 25}
              color={disabled ? "#6B7280" : "black"}
            />
          </View>
        )
      }

      case "svg-component": {
        const { SvgComponent } = content
        return (
          <View className="items-center justify-center">
            <SvgComponent
              width={content.size ?? 25}
              height={content.size ?? 25}
              color={disabled ? "#6B7280" : "black"}
            />
          </View>
        )
      }

      case "svg-element": {
        return <View className="items-center justify-center">{content.element}</View>
      }
    }
  }

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setButtonLayout({ width, height })
  }

  return (
    <View className={`relative ${className}`}>
      <View
        className="absolute bg-black"
        style={{
          left: shadowOffset,
          top: shadowOffset,
          borderRadius: borderRadius,
          width: buttonLayout.width,
          height: buttonLayout.height,
        }}
      />
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        onLayout={onLayout}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        className={`
          relative
          h-full 
          px-3
          border-2 
          border-black
          ${getBackgroundColor()}
        `}
        style={{
          borderRadius: borderRadius,
        }}
      >
        <View className="flex-1 justify-center items-center">{renderContent()}</View>
      </Pressable>
    </View>
  )
}

export default ToasterButton
