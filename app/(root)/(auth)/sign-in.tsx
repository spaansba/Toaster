import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  AppState,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import React, { useState } from "react"
import images from "@/constants/images"
import { supabase } from "../../../lib/supabase"
import { Button, Input } from "@rneui/themed"
import { useRouter } from "expo-router"

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
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
      router.push("/")
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
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert("Please check your inbox for email verification!")
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-primary-300">
          <SafeAreaView className="flex-1">
            <ScrollView
              className="flex-1"
              contentContainerClassName="flex-grow"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Image
                source={images.walkingToaster}
                className="w-full h-[40%]" // Reduced height to give more space for inputs
                resizeMode="contain"
              />

              <View className="px-10 mb-6">
                <Text className="text-base text-center uppercase font-courier text-black-200">
                  Welcome To Real Scout
                </Text>
              </View>

              <View className="px-5 py-1 mt-5">
                <Input
                  label="Email"
                  leftIcon={{ type: "font-awesome", name: "envelope" }}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="email@address.com"
                  autoCapitalize={"none"}
                  containerStyle={{ paddingHorizontal: 0 }}
                  keyboardType="email-address"
                  returnKeyType="next"
                />
              </View>

              <View className="px-5 py-1">
                <Input
                  label="Password"
                  leftIcon={{ type: "font-awesome", name: "lock" }}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoCapitalize={"none"}
                  containerStyle={{ paddingHorizontal: 0 }}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>

              <View className="px-5 py-1 mt-5">
                <Button
                  title="Sign in"
                  disabled={loading}
                  onPress={signInWithEmail}
                  buttonStyle={{ borderRadius: 8 }}
                />
              </View>

              <View className="px-5 py-1 mb-5">
                <Button
                  title="Sign up"
                  disabled={loading}
                  onPress={signUpWithEmail}
                  buttonStyle={{ borderRadius: 8 }}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default SignIn
