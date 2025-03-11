import MessageRecipientList from "@/components/messenger/MessageRecipient/MessageRecipientList"
import MessengerScreenHeader from "@/components/messenger/MessengerScreenHeader"
import RecipientModal from "@/components/messenger/RecipientModal/RecipientModal"
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useNavigation } from "expo-router"
import React, { useEffect } from "react"
import { SafeAreaView, View } from "react-native"
import { KeyboardStickyView } from "react-native-keyboard-controller"
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated"

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
      <View className="border-b-[2px] border-black bg-primary-200 ">
        <MessageRecipientList />
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
