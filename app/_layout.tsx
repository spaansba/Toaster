import { SplashScreen, Stack } from "expo-router"
import "./global.css"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import { KeyboardProvider } from "react-native-keyboard-controller"
import AuthProvider from "@/providers/AuthProvider"
import { AppState, LogBox } from "react-native"
import { supabase } from "@/lib/supabase"

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
    <AuthProvider>
      <KeyboardProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
        </Stack>
      </KeyboardProvider>
    </AuthProvider>
  )
}
