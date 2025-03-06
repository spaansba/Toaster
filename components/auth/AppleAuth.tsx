import ToasterButton from "@/components/ToasterButton"
import { supabase } from "@/lib/supabase"
import * as AppleAuthentication from "expo-apple-authentication"
import { useRouter } from "expo-router"
import React from "react"
import Toast from "react-native-toast-message"

const VARIANTS = {
  black: {
    bg: "bg-black",
    text: "text-white",
    loading: "#FFFFFF",
  },
}

const AppleAuth = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const handlePress = async () => {
    setLoading(true)
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      // Sign in via Supabase Auth.
      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        })

        if (!error) {
          router.replace("/")
        }
      } else {
        throw new Error("No identityToken.")
      }
    } catch (e: unknown) {
      if (typeof e === "object" && e !== null && "code" in e) {
        switch (e.code) {
          case "ERR_REQUEST_CANCELED":
            Toast.show({
              type: "info",
              text1: "Authentication Stopped",
              text2: "Try again or try another method",
            })
            // user cancelld sign in request
            break
          case "ERR_INVALID_RESPONSE":
            Toast.show({
              type: "error",
              text1: "Authentication Error",
              text2: "Invalid response from Apple",
            })
            break
          case "ERR_NOT_AVAILABLE":
            Toast.show({
              type: "error",
              text1: "Authentication Error",
              text2: "Apple authentication is not available on this device",
            })
            break
          default:
            Toast.show({
              type: "error",
              text1: "Authentication Error",
              text2: "An error occurred during Apple sign in",
            })
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: "An unexpected error occurred",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const getBackgroundColor = () => {
    return VARIANTS.black.bg
  }

  const getTextColor = () => {
    return VARIANTS.black.text
  }

  const getLoadingColor = () => {
    return VARIANTS.black.loading
  }

  return (
    <ToasterButton
      className="w-full h-[55px]"
      onPress={handlePress}
      loading={loading}
      content={{
        type: "text",
        text: "APPLE",
        leftIcon: {
          glyph: "logo-apple",
        },
      }}
    />
  )
}

export default AppleAuth
