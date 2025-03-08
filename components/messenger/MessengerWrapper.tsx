import {
  View,
  Button,
  TouchableWithoutFeedback,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native"
import React, { useRef, useState } from "react"
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import images from "@/constants/images"
import { KeyboardAwareScrollView, KeyboardStickyView } from "react-native-keyboard-controller"
import { Image } from "expo-image"
import RecipientModal from "./RecipientModal/RecipientModal"
import { ToastText } from "../general/ToastText"
const MessengerWrapper = () => {
  const richEditor = useRef<RichEditor>(null)
  const tabBarHeight = useBottomTabBarHeight()
  const dismissKeyboard = () => {
    richEditor.current?.blurContentEditor()
  }

  //Preload images
  Image.prefetch(images.hoofd, "memory-disk")

  // const handleScrollBeginDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const offsetY = event.nativeEvent

  //   // console.log("Drag started at position:", offsetY)
  // }

  const handlePresentModal = () => setModalVisible(true)
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={35}
        style={{ height: "100%" }}
        keyboardDismissMode="none"
        onScroll={(event) => {
          // When you scroll up with momentum or more than 40 pixels hide the keyboard
          if (event.nativeEvent.contentOffset.y < -40) {
            dismissKeyboard()
          }
        }}
      >
        <Button title="open" onPress={handlePresentModal}></Button>
        <RecipientModal isModalVisible={modalVisible} setIsModalVisible={setModalVisible} />

        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View className="p-2.5">
            <ToastText></ToastText>
          </View>
        </TouchableWithoutFeedback>

        <RichEditor
          scrollEnabled={false}
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
      </KeyboardAwareScrollView>

      <KeyboardStickyView enabled={true} offset={{ opened: tabBarHeight, closed: 100 }}>
        <RichToolbar
          editor={richEditor}
          disabledIconTint="darkgrey"
          selectedIconTint="black"
          className="bg-white"
          actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1]}
        />
      </KeyboardStickyView>

      {/* <KeyboardToolbar
        offset={{ opened: tabBarHeight }}
        showArrows={false}
        onDoneCallback={() => {
          dismissKeyboard()
        }}
        content={<View className="size-full bg-red-300"></View>}
      /> */}
    </>
  )
}

export default MessengerWrapper
