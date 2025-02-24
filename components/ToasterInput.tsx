import React, { useState } from "react"
import { View, TextInput, Text, TextInputProps, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ToastText } from "./ToastText"

interface ToasterInputProps extends Omit<TextInputProps, "style"> {
  label?: string
  errors?: string[]
}

const ToasterInput: React.FC<ToasterInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  returnKeyType,
  onSubmitEditing,
  autoCapitalize,
  textContentType,
  autoComplete,
  errors,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = secureTextEntry === true

  return (
    <View className="mb-6 w-full">
      {label && <Text className="mb-1 text-base font-courier-bold">{label}</Text>}
      <View className="relative w-full">
        {/* Shadow element */}
        <View className="absolute inset-0 bg-black rounded translate-x-[5px] translate-y-[5px]" />

        {/* Input container */}
        <View className="relative bg-white border-2 border-black rounded">
          <TextInput
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={isPassword && !showPassword}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            autoCapitalize={autoCapitalize}
            textContentType={textContentType}
            autoComplete={autoComplete}
            className="px-4 py-2.5 text-base leading-6 min-h-[44px] font-courier"
            placeholderTextColor="#666"
            {...rest}
          />

          {/* Password toggle button */}
          {isPassword && value && value.length > 0 && (
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              hitSlop={8}
            >
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#666" />
            </Pressable>
          )}
        </View>
      </View>
      <View className="mt-1">
        {errors?.map((error, index) => (
          <ToastText key={index} className="mt-2 text-red-500 text-sm">
            {error}
          </ToastText>
        ))}
      </View>
    </View>
  )
}

export default ToasterInput
