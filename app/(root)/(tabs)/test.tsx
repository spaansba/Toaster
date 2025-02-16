import React, { useRef } from "react"
import {
  StyleSheet,
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
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated"

const EditorScreen = () => {
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
          translateY: -height.value + tabBarHeight,
        },
      ],
    }
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.debugContainer}>
              <Text>
                Keyboard shown: {String(!isClosed.value)}
                {"\n"}
                Keyboard height: {height.value}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <RichEditor
            ref={richEditor}
            useContainer={true}
            initialHeight={200}
            style={styles.editor}
            placeholder="What's on your mind"
            containerStyle={styles.editorContainer}
            onChange={(descriptionText) => {
              console.log("descriptionText:", descriptionText)
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      {isClosed.value && (
        <Animated.View style={[styles.toolbarContainer, toolbarAnimatedStyle]}>
          <RichToolbar
            editor={richEditor}
            disabledIconTint="darkgrey"
            selectedIconTint="black"
            style={styles.richBar}
            actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1]}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    borderWidth: 2,
    borderColor: "black",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  debugContainer: {
    padding: 10,
  },
  editorContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  editor: {
    height: 300,
    minHeight: 300,
    maxHeight: 300,
  },
  richBar: {
    backgroundColor: "white",
  },
  toolbarContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    backgroundColor: "white",
    zIndex: 999,
  },
})

export default EditorScreen
