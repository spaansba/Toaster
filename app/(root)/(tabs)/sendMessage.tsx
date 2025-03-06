import React, { useRef, useState } from "react"
import {
  SafeAreaView,
  Platform,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Button,
} from "react-native"
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useKeyboardAnimation } from "@/components/hooks/useKeyboard"
import Animated, {
  configureReanimatedLogger,
  ReanimatedLogLevel,
  useAnimatedStyle,
} from "react-native-reanimated"
import { ToastText } from "@/components/general/ToastText"
import RecipientBottomSheet from "@/components/messenger/RecipientModal/RecipientModal"
import type { BottomSheetModal } from "@gorhom/bottom-sheet"
import { MessagingToasterProvider } from "@/providers/SelectedRecipientProvider"
import { Image } from "expo-image"
import images from "@/constants/images"
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})
export default function sendMessage() {
  const richEditor = useRef<RichEditor>(null)
  const { height, heightWhenOpened, isClosed } = useKeyboardAnimation()
  const tabBarHeight = useBottomTabBarHeight()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const dismissKeyboard = () => {
    richEditor.current?.blurContentEditor()
  }

  //Preload images
  Image.prefetch(images.hoofd, "memory-disk")

  const toolbarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: -height.get() + tabBarHeight,
        },
      ],
    }
  })

  const handlePresentModal = () => setModalVisible(true)
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <MessagingToasterProvider>
      <SafeAreaView className="h-full bg-primary-200">
        <ScrollView className="">
          <Button title="open" onPress={handlePresentModal}></Button>
          <RecipientBottomSheet
            title="hello"
            isModalVisible={modalVisible}
            setIsModalVisible={setModalVisible}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View className="p-2.5">
                <ToastText>
                  Keyboard shown: {String(!isClosed.get())}
                  {"\n"}
                  Keyboard height: {height.get()}
                </ToastText>
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
    </MessagingToasterProvider>
  )
}
