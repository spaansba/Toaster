import React from "react"
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native"
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor"

const profile = () => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent,
  })

  const dismissKeyboard = () => {
    editor.blur()
  }

  return (
    <SafeAreaView style={exampleStyles.fullScreen}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View className="h-20">
          <Text></Text>
        </View>
      </TouchableWithoutFeedback>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={exampleStyles.keyboardAvoidingView}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const exampleStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
})

const initialContent = `<p>This is a basic example!</p>`
export default profile
