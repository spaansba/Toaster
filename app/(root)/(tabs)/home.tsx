import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Animated,
  Keyboard,
  Platform,
  Dimensions,
} from "react-native"
import React, { useState, useRef, useEffect } from "react"
import { Link, router } from "expo-router"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

const SCREEN_HEIGHT = Dimensions.get("window").height

const Home = () => {
  const [text, setText] = useState<string>("")
  const animatedHeight = useRef(new Animated.Value(200)).current
  const bottomOffset = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        const kbHeight = e.endCoordinates.height
        // Animate to keyboard height
        Animated.spring(bottomOffset, {
          toValue: kbHeight,
          useNativeDriver: false,
          friction: 8,
          tension: 45,
        }).start()
      }
    )

    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        Animated.spring(bottomOffset, {
          toValue: 0,
          useNativeDriver: false,
          friction: 8,
          tension: 45,
        }).start()
      }
    )

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const handleTextChange = (newText: string) => {
    setText(newText)
    const lineCount = (newText.match(/\n/g) || []).length
    const newHeight = Math.max(200, (lineCount + 1) * 40 + 200)
    Animated.spring(animatedHeight, {
      toValue: newHeight,
      useNativeDriver: false,
      friction: 7,
      tension: 40,
    }).start()
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#EDE1D81A" }}
      contentContainerClassName="mt-6 h-full"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      enabled={false}
    >
      <View className="flex-1">
        <Animated.View
          className="absolute w-full items-center bottom-0"
          style={{
            height: animatedHeight,
            transform: [
              {
                translateY: Animated.multiply(bottomOffset, -1),
              },
            ],
          }}
        >
          {/* Main receipt paper */}
          <Animated.View
            className="w-11/12 bg-white px-4 py-2 rounded-t-lg shadow-lg"
            style={{
              height: animatedHeight,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <TextInput
              className="flex-1 text-base"
              style={{
                fontFamily: "monospace",
                textAlignVertical: "top", // This fixes the Android centering issue
                paddingTop: 0, // Ensure text starts from the very top
              }}
              multiline
              placeholder="Write your receipt here..."
              value={text}
              onChangeText={handleTextChange}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Home
