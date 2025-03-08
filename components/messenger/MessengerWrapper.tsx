import images from "@/constants/images"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { Image } from "expo-image"
import React, { useRef } from "react"
import { KeyboardAwareScrollView, KeyboardStickyView } from "react-native-keyboard-controller"
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor"
import RecipientView from "./RecipientView"
import { View } from "react-native"
const MessengerWrapper = () => {
  const richEditor = useRef<RichEditor>(null)
  const tabBarHeight = useBottomTabBarHeight()
  const dismissKeyboard = () => {
    richEditor.current?.blurContentEditor()
  }

  //Preload images
  Image.prefetch(images.hoofd, "memory-disk")

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
        <View className="px-standardPagePadding">
          <RecipientView></RecipientView>

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
        </View>
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
