import { useEffect, useState } from "react"
import { Keyboard, Platform, type KeyboardEventName } from "react-native"
import { useKeyboardHandler } from "react-native-keyboard-controller"
import { useSharedValue } from "react-native-reanimated"

const hideEvent: KeyboardEventName = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide"

// We create our own useKeyboard instead of using https://github.com/react-native-community/hooks/blob/main/src/useKeyboard.ts
// This with the reason that we have more control over this hook
export const useKeyboardAnimation = () => {
  const heightWhenOpened = useSharedValue(0)
  const height = useSharedValue(0)
  const progress = useSharedValue(0)
  const isClosed = useSharedValue(true)

  useKeyboardHandler(
    {
      onStart: (e) => {
        "worklet"
        if (e.height > 0) {
          isClosed.value = false
          heightWhenOpened.value = e.height
        }
      },
      onMove: (e) => {
        "worklet"
        progress.value = e.progress
        height.value = e.height
      },
      onEnd: (e) => {
        "worklet"
        isClosed.value = e.height === 0
      },
    },
    []
  )

  return { height, progress, heightWhenOpened, isClosed }
}
