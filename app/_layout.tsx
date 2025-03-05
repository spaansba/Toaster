import { SplashScreen, Stack } from "expo-router"
import "./global.css"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import { KeyboardProvider } from "react-native-keyboard-controller"
import AuthProvider from "@/providers/AuthProvider"
import { AppState, LogBox } from "react-native"
import { supabase } from "@/lib/supabase"
import Toast from "react-native-toast-message"
import { toastConfig } from "@/components/ReactToastMessageConfig"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"

LogBox.ignoreAllLogs(true)
LogBox.ignoreLogs(["Unspecified error"])

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "CourierPrime-Bold": require("../assets/fonts/CourierPrime-Bold.ttf"),
    "CourierPrime-BoldItalic": require("../assets/fonts/CourierPrime-BoldItalic.ttf"),
    "CourierPrime-Italic": require("../assets/fonts/CourierPrime-Italic.ttf"),
    "CourierPrime-Regular": require("../assets/fonts/CourierPrime-Regular.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <BottomSheetModalProvider>
          <KeyboardProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(root)" options={{ headerShown: false }} />
            </Stack>
            <Toast config={toastConfig} visibilityTime={3500} />
          </KeyboardProvider>
        </BottomSheetModalProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
