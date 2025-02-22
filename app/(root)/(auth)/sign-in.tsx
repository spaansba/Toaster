import { View, Text, Platform, ScrollView, Button } from "react-native"
import images from "@/constants/images"
import { Redirect, router } from "expo-router"
import ToasterButton from "@/components/ToasterButton"
import AppleAuth from "@/components/auth/AppleAuth"
import { Image } from "expo-image"
import Toast from "react-native-toast-message"

export default function SignIn() {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "This went really well!",
    })
  }

  const showToastError = () => {
    Toast.show({
      type: "error",
      text1: "Hello",
      text2:
        "This went semi wellas das dasmnd aksjdh kasjdh kjashf kjash fkJSAHF JKASDH JKFASHKJF HFDKJS ",
    })
  }

  const showToastInfo = () => {
    Toast.show({
      type: "info",
      text1: "Hello",
      text2: "This went wrong",
    })
  }
  const showToastGeneral = () => {
    Toast.show({
      type: "general",
      text1: "Hello",
      text2: "This went wrong",
      props: {
        ionIcon: "airplane",
      },
    })
  }
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
          <Button title="Show toast" onPress={showToast} />
          <Button title="Show toast Error" onPress={showToastError} />
          <Button title="Show toast info" onPress={showToastInfo} />
          <Button title="Show toast general" onPress={showToastGeneral} />
        </View>
      </View>
    </ScrollView>
  )
}
