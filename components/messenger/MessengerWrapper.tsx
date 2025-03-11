import images from "@/constants/images"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { Image } from "expo-image"
import React, { useRef } from "react"
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from "react-native"
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor"
import { ToastText } from "../general/ToastText"

// for webview props https://github.com/react-native-webview/react-native-webview/blob/34956ff0868ff936c1d6ab78d0c1bd00302a98ca/docs/Reference.md#hidekeyboardaccessoryview

const MessengerWrapper = () => {
  const tabBarHeight = useBottomTabBarHeight()
  // const dismissKeyboard = () => {
  //   richText.current?.blurContentEditor()
  // }

  //Preload images
  Image.prefetch(images.hoofd, "memory-disk")

  return (
    <>
      {/* <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          backgroundColor: "purple",
          borderColor: "black",
          borderWidth: 1,
        }}
      > */}
      {/* <WebView
          source={{ uri: "https://reactnative.dev/" }}
          suppressMenuItems={[
            "cut",
            "copy",
            "paste",
            "selectAll",
            "lookup",
            "select",
            "bold",
            "italic",
            "underline",
            "share",
            "translate",
            "replace",
          ]}
        /> */}
      {/* TipTap editor */}

      {/* </KeyboardAvoidingView> */}

      {/* <KeyboardStickyView enabled={true} offset={{ opened: tabBarHeight, closed: 100 }}>
        <RichToolbar
          editor={richEditor}
          disabledIconTint="darkgrey"
          selectedIconTint="black"
          className="bg-white"
          actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1]}
        />
      </KeyboardStickyView> */}
    </>
  )
}

export default MessengerWrapper
