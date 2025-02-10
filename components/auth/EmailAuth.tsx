import ToasterButton from "@/components/ToasterButton"
import ToasterInput from "@/components/ToasterInput"
import { supabase } from "@/lib/supabase"
import { makeRedirectUri } from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
import React, { useState } from "react"
import { Alert, Text, Keyboard, View } from "react-native"
import { AuthWeakPasswordError, type WeakPasswordReasons } from "@supabase/supabase-js"
import PasswordReset from "./PasswordReset"

WebBrowser.maybeCompleteAuthSession()

type EmailAuthProps = {
  setShowEmailAuth: (show: boolean) => void
}

function EmailAuth({ setShowEmailAuth }: EmailAuthProps) {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailErrors, setEmailErrors] = useState<string[]>([])
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [showPasswordReset, setShowPasswordReset] = useState(false)

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

  if (showPasswordReset) {
    return <PasswordReset onBack={() => setShowPasswordReset(false)} inputEmail={email} />
  }

  return (
    <View className="w-full">
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
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
        errors={passwordErrors}
      />
      <View className="items-center mb-4">
        <Text
          className="text-blue-500 text-sm font-courier"
          onPress={() => setShowPasswordReset(true)}
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
      <View className="w-full bg-primary-300 pt-[25px]">
        <View className="w-[60px]">
          <ToasterButton
            onPress={() => {
              setShowEmailAuth(false)
            }}
            title="<"
            variant="blue"
          />
        </View>
      </View>
    </View>
  )
}

export default EmailAuth
