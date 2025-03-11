import { ToastText } from "@/components/general/ToastText"
import MessengerScreenHeader from "@/components/messenger/MessengerScreenHeader"
import { useNavigation } from "expo-router"
import React, { useEffect, useRef } from "react"
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from "react-native"
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor"
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated"
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import RecipientModal from "@/components/messenger/RecipientModal/RecipientModal"
import SelectedRecipientList from "@/components/messenger/SelectedRecipientList"
import { KeyboardStickyView } from "react-native-keyboard-controller"

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export default function SendMessage() {
  const tabBarHeight = useBottomTabBarHeight()
  const navigation = useNavigation()

  // Move the setOptions call to a useEffect
  useEffect(() => {
    navigation.setOptions({
      header: () => <MessengerScreenHeader />,
    })
  }, [navigation])

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: "Start editing!",
    theme: {
      webview: {
        paddingTop: 20,
        paddingHorizontal: 20,
      },
    },
  })
  const dismissKeyboard = () => {
    editor.blur()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="px-5 py-3">
        <SelectedRecipientList />
      </View>
      <RichText
        editor={editor}
        onScroll={(event) => {
          // When you scroll up with momentum or more than 40 pixels hide the keyboard
          // console.log(event.nativeEvent.contentOffset.y)
          if (event.nativeEvent.contentOffset.y < -40) {
            dismissKeyboard()
          }
        }}
      />
      <KeyboardStickyView
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0 - tabBarHeight,
        }}
      >
        <Toolbar editor={editor} />
      </KeyboardStickyView>
      <RecipientModal />
    </SafeAreaView>
  )
}
