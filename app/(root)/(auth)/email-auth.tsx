import ToasterButton from "@/components/ToasterButton"
import ToasterInput from "@/components/ToasterInput"
import { supabase } from "@/lib/supabase"
import { makeRedirectUri } from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
import React, { useState } from "react"
import { Alert, Text, Keyboard, View } from "react-native"
import { AuthWeakPasswordError, type WeakPasswordReasons } from "@supabase/supabase-js"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import images from "@/constants/images"
import { router } from "expo-router"
import { Image } from "expo-image"
WebBrowser.maybeCompleteAuthSession()

function EmailAuth() {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailErrors, setEmailErrors] = useState<string[]>([])
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  const redirectTo = makeRedirectUri({
    scheme: "com.toaster",
    path: "home",
  })

  async function signInWithEmail() {
    setIsSigningIn(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.code === "invalid_credentials") {
          Alert.alert("Error", "Invalid email or password")
        } else {
          Alert.alert("Error", error.message)
        }
      }
    } catch (error) {
      console.error("Sign in error:", error)
      Alert.alert("Error", "An unexpected error occurred during sign in")
    } finally {
      setIsSigningIn(false)
    }
  }

  async function signUpWithEmail() {
    setIsSigningUp(true)
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            timestamp: new Date().toISOString(),
          },
        },
      })
      setEmailErrors([])
      setPasswordErrors([])
      if (error) {
        switch (error.code) {
          case "anonymous_provider_disabled":
            setEmailErrors((prev) => [...prev, "Provide an email address"])
            break
          case "weak_password":
            if (error instanceof AuthWeakPasswordError) {
              const errors: string[] = []
              error.reasons.forEach((reason: WeakPasswordReasons) => {
                if (reason === "characters") {
                  errors.push(
                    "Your password needs the following characters:\n• At least one uppercase letter (A-Z)\n• At least one lowercase letter (a-z)\n• At least one number (0-9)"
                  )
                }
                if (reason === "length") {
                  errors.push("Password must be at least 6 characters")
                }
                if (reason === "pwned") {
                  errors.push(
                    "This password has been compromised in data breaches. Please choose a different one."
                  )
                }
              })
              setPasswordErrors(errors)
            } else {
              setPasswordErrors([
                "Your password needs the following characters:\n• At least one uppercase letter (A-Z)\n• At least one lowercase letter (a-z)\n• At least one number (0-9)\n• At least 6 characters long",
              ])
            }
            break
          case "validation_failed":
            setEmailErrors((prev) => [...prev, "Email is invalid"])
            break
          default:
            Alert.alert("Error", error.message)
            break
        }
      } else if (!session) {
        Alert.alert("Verification Required", "Please check your inbox for email verification!")
      }
    } catch (error) {
      console.error("Sign up error:", error)
      Alert.alert("Error", "An unexpected error occurred during sign up")
    } finally {
      setIsSigningUp(false)
    }
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#EDE1D8" }}
      contentContainerClassName="mt-6 h-full"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <Image
        source={images.walkingToaster}
        style={{ width: "100%", height: 200 }}
        contentFit="contain"
        cachePolicy="memory-disk"
        transition={0}
      />
      <View className="px-7">
        <ToasterInput
          label="EMAIL ADDRESS"
          onChangeText={(text) => setEmail(text.trim())}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          errors={emailErrors}
        />
        <ToasterInput
          label="PASSWORD"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          errors={passwordErrors}
        />
        <View className="items-center mb-4">
          <Text
            className="text-blue-500 text-sm font-courier"
            onPress={() =>
              router.push({
                pathname: "/request-reset-password",
                params: { inputEmail: email },
              })
            }
          >
            Forgot password?
          </Text>
        </View>
        <ToasterButton
          title={isSigningIn ? "SIGNING IN..." : "SIGN IN"}
          disabled={isSigningIn || isSigningUp}
          loading={isSigningIn}
          onPress={signInWithEmail}
          variant="green"
        />
        <View className="items-center my-6">
          <Text className="uppercase font-courier-bold text-1xl">No Account?</Text>
        </View>
        <ToasterButton
          title={isSigningUp ? "SIGNING UP..." : "SIGN UP"}
          disabled={isSigningIn || isSigningUp}
          loading={isSigningUp}
          onPress={signUpWithEmail}
          variant="yellow"
        />
        <View className="items-center mt-4">
          <Text className="text-blue-500 text-sm font-courier" onPress={() => router.back()}>
            Other Sign In Methods
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default EmailAuth
