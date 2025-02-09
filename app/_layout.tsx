import { SplashScreen, Stack } from "expo-router"
import "./global.css"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import { KeyboardProvider } from "react-native-keyboard-controller"
import AuthProvider from "@/providers/AuthProvider"
import { makeRedirectUri } from "expo-auth-session"

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
        <Stack screenOptions={{ headerShown: false }} />
      </KeyboardProvider>
    </AuthProvider>
  )
}
