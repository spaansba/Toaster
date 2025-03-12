import MessageRecipientList from "@/components/messenger/MessageRecipient/MessageRecipientList"
import MessengerScreenHeader from "@/components/messenger/MessengerScreenHeader"
import RecipientModal from "@/components/messenger/RecipientModal/RecipientModal"
import ToasterInfoModal from "@/components/messenger/ToasterInfoModal/ToasterInfoModal"
import type { BefriendedToaster } from "@/types/types"
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useNavigation } from "expo-router"
import React, { useEffect } from "react"
import { SafeAreaView, View } from "react-native"
import { KeyboardStickyView, KeyboardToolbar } from "react-native-keyboard-controller"
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated"

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export default function SendMessage() {
  const tabBarHeight = useBottomTabBarHeight()
  const [selectedToaster, setSelectedToaster] = React.useState<BefriendedToaster | null>(null)

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
      <View className="border-b-[1px] border-black bg-primary-200 ">
        <MessageRecipientList onToasterPress={setSelectedToaster} />
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
      <KeyboardToolbar
        content={<Toolbar editor={editor} />}
        showArrows={true}
        doneText="done"
        offset={{ opened: tabBarHeight }}
      />
      {/* <KeyboardStickyView
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0 - tabBarHeight,
        }}
      >
        <Toolbar editor={editor} />
      </KeyboardStickyView> */}
      <RecipientModal />
      {selectedToaster && (
        <ToasterInfoModal
          isVisible={!!selectedToaster}
          onClose={() => setSelectedToaster(null)}
          toaster={selectedToaster}
          toastCount={42} // This should be fetched from your actual data
        />
      )}
    </SafeAreaView>
  )
}
