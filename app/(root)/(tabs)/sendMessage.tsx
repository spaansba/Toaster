import React, { useRef } from "react"
import {
  SafeAreaView,
  Platform,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from "react-native"
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useKeyboardAnimation } from "@/components/hooks/useKeyboard"
import Animated, { useAnimatedStyle } from "react-native-reanimated"

export default function sendMessage() {
  const richEditor = useRef<RichEditor>(null)
  const { height, heightWhenOpened, isClosed } = useKeyboardAnimation()
  const tabBarHeight = useBottomTabBarHeight()

  const dismissKeyboard = () => {
    richEditor.current?.blurContentEditor()
  }

  const toolbarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: -height.get() + tabBarHeight,
        },
      ],
    }
  })

  return (
    <SafeAreaView className="flex-1 bg-primary-200">
      <ScrollView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View className="p-2.5">
              <Text>
                Keyboard shown: {String(!isClosed.get())}
                {"\n"}
                Keyboard height: {height.get()}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <RichEditor
            ref={richEditor}
            useContainer={true}
            initialHeight={200}
            className="h-[300px] min-h-[300px] max-h-[300px]"
            placeholder="What's on your mind"
            containerStyle={{ flex: 1 }}
            onChange={(descriptionText) => {
              console.log("descriptionText:", descriptionText)
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      {isClosed.get() && (
        <Animated.View
          style={toolbarAnimatedStyle}
          className="absolute left-0 right-0 bottom-0 border-t border-[#E8E8E8] bg-white z-50"
        >
          <RichToolbar
            editor={richEditor}
            disabledIconTint="darkgrey"
            selectedIconTint="black"
            className="bg-white"
            actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1]}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  )
}
