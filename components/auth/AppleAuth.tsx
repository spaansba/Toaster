import { Alert } from "react-native"
import React from "react"
import * as AppleAuthentication from "expo-apple-authentication"
import { useRouter } from "expo-router"
import ToasterButton from "@/components/ToasterButton"
import { supabase } from "@/lib/supabase"

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

      console.log(credential)
      // Sign in via Supabase Auth.
      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        })
        console.log(JSON.stringify({ error, user }, null, 2))
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
            // user cancelld sign in request
            break
          case "ERR_INVALID_RESPONSE":
            Alert.alert("Authentication Failed", "Invalid response from Apple.")
            break
          case "ERR_NOT_AVAILABLE":
            Alert.alert("Not Available", "Apple authentication is not available on this device.")
            break
          default:
            Alert.alert("Authentication Error", "An error occurred during Apple sign in.")
        }
      } else {
        Alert.alert("Error", "An unexpected error occurred.")
      }
      console.log("Apple Auth Error:", e)
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

  return <ToasterButton onPress={handlePress} title="APPLE" icon="logo-apple" />
}

export default AppleAuth
