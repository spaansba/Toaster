import ToasterButton from "@/components/ToasterButton"
import ToasterInput from "@/components/ToasterInput"
import { supabase } from "@/lib/supabase"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { Alert, Text } from "react-native"
import * as Linking from "expo-linking"
import { makeRedirectUri } from "expo-auth-session"

function emailAuth() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const url = Linking.useURL()
  async function signInWithEmail() {
    setLoading(true)
    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (session) {
      router.replace("/")
    }
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: makeRedirectUri({
          scheme: "com.toaster",
          path: "home",
        }),
      },
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert("Please check your inbox for email verification!")
    setLoading(false)
  }

  return (
    <>
      <ToasterInput
        label="EMAIL ADDRESS"
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
        // error={emailError} // Optional error message
      />

      <ToasterInput
        label="PASSWORD"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize="none"
        returnKeyType="done"
        // onSubmitEditing={Keyboard.dismiss}
        //   error={passwordError} // Optional error message
      />
      <ToasterButton
        title={loading ? "SIGNING IN..." : "SIGN IN"}
        disabled={loading}
        loading={loading}
        onPress={signInWithEmail}
        variant="green"
      />
      <Text className="uppercase font-courier-bold text-1xl my-6">No Account?</Text>
      <ToasterButton
        title={loading ? "SIGNING UP..." : "SIGN UP"}
        disabled={loading}
        onPress={signUpWithEmail}
        variant="yellow"
      />
    </>
  )
}

export default emailAuth
