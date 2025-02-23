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
import { Toast } from "react-native-toast-message/lib/src/Toast"
import { Ionicons } from "@expo/vector-icons"
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
  })

  async function signInWithEmail() {
    setIsSigningIn(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        if (error.code === "invalid_credentials") {
          Toast.show({
            type: "error",
            text1: "Login Error",
            text2: "Invalid email or password",
          })
        } else {
          console.error(error.message)
          Toast.show({
            type: "error",
            text1: "Login Error",
            text2: "An unexpected error occured during sign-in, try again",
          })
        }
      }
    } catch (error) {
      console.error("Sign in error:", error)
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: "An unexpected error occured during sign-in, try again",
      })
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
            console.error("Sign up error:", error)
            Toast.show({
              type: "error",
              text1: "Login Error",
              text2: "An unexpected error occured during sign-in, try again",
            })
            break
        }
      } else if (!session) {
        Toast.show({
          type: "general",
          text1: "Verification Required",
          text2: "Please check your inbox",
          props: {
            ionIcon: "mail-unread-outline",
          },
          visibilityTime: 5000,
        })
      }
    } catch (error) {
      console.error("Sign up error:", error)
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: "An unexpected error occured during sign-in, try again",
      })
    } finally {
      setIsSigningUp(false)
    }
  }

  return (
    <KeyboardAwareScrollView
      className="bg-primary-200 flex-1"
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
          value={email}
          onChangeText={setEmail}
          placeholder="email@address.com"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          returnKeyType="next"
          errors={emailErrors}
        />
        <ToasterInput
          label="PASSWORD"
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="password"
          autoComplete="password"
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
          className="w-full h-[55px]"
          content={{
            type: "text",
            text: "SIGN IN",
            updating: {
              updateText: "SIGNING IN...",
              isUpdating: isSigningIn,
            },
          }}
          disabled={isSigningIn || isSigningUp}
          loading={isSigningIn}
          onPress={signInWithEmail}
          variant="green"
        />
        <View className="items-center my-6">
          <Text className="uppercase font-courier-bold text-1xl">No Account?</Text>
        </View>
        <ToasterButton
          className="w-full h-[55px]"
          content={{
            type: "text",
            text: "SIGN UP",
            updating: {
              updateText: "SIGNING UP...",
              isUpdating: isSigningUp,
            },
          }}
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
