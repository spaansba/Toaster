import { ToastText } from "@/components/general/ToastText"
import ToasterButton from "@/components/ToasterButton"
import ToasterInput from "@/components/ToasterInput"
import images from "@/constants/images"
import { WeakPasswordHelper } from "@/helpers/WeakPasswordHelper"
import { supabase } from "@/lib/supabase"
import { AuthWeakPasswordError } from "@supabase/supabase-js"
import { makeRedirectUri } from "expo-auth-session"
import { Image } from "expo-image"
import { router } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import React, { useState } from "react"
import { Keyboard, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { Toast } from "react-native-toast-message/lib/src/Toast"
WebBrowser.maybeCompleteAuthSession()

function EmailAuth() {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailErrors, setEmailErrors] = useState<string[]>([])
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  const gotoPasswordRecovery = () => {
    router.push({
      pathname: "/request-reset-password",
      params: { inputEmail: email },
    })
  }

  const redirectTo = makeRedirectUri({
    scheme: "com.toaster",
    path: "sendMessage",
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            timestamp: new Date().toISOString(),
          },
        },
      })
      console.log(error?.code)
      setEmailErrors([])
      setPasswordErrors([])
      if (error) {
        switch (error.code) {
          case "user_already_exists":
            Toast.show({
              type: "info",
              text1: "User already exists",
              text2: "Try logging in or recover",
              visibilityTime: 5000,
              onPress: gotoPasswordRecovery,
              props: {
                onPressButtonText: "Recover Password",
              },
            })
          case "anonymous_provider_disabled":
            setEmailErrors((prev) => [...prev, "Provide an email address"])
            break
          case "weak_password":
            if (error instanceof AuthWeakPasswordError) {
              setPasswordErrors(WeakPasswordHelper(error))
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
      } else if (!data.session) {
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
          <ToastText className="text-blue-500 text-sm" onPress={() => gotoPasswordRecovery()}>
            Forgot password?
          </ToastText>
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
          <ToastText className="uppercase font-courier-bold text-1xl">No Account?</ToastText>
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
          <ToastText className="text-blue-500 text-sm mt-2" onPress={() => router.back()}>
            Other Sign In Methods
          </ToastText>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default EmailAuth
