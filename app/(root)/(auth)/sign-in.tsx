import { View, Text, Platform, ScrollView } from "react-native"
import images from "@/constants/images"
import { Redirect, router } from "expo-router"
import ToasterButton from "@/components/ToasterButton"
import AppleAuth from "@/components/auth/AppleAuth"
import { useAuth } from "@/providers/AuthProvider"
import { Image } from "expo-image"

export default function SignIn() {
  return (
    <ScrollView className="bg-primary-200">
      <View className="h-full">
        <Image
          source={images.walkingToaster}
          style={{ width: "100%", height: 400 }}
          contentFit="contain"
          cachePolicy="memory-disk"
          transition={0}
        />
        <View className="flex-1 bg-primary-200 px-7 items-center">
          <>
            <Text className="uppercase font-courier-bold text-4xl mt-4 mb-5">Continue With</Text>
            {Platform.OS === "ios" && <AppleAuth />}
            <Text className="uppercase font-courier-bold text-1xl my-6">or Continue With</Text>

            <ToasterButton
              className="w-full h-[55px]"
              content={{
                type: "text",
                text: "EMAIL",
                leftIcon: {
                  glyph: "mail",
                },
              }}
              onPress={() => {
                router.push("/email-auth")
              }}
              variant="blue"
            />
          </>
        </View>
      </View>
    </ScrollView>
  )
}
