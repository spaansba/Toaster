import { View, Text } from "react-native"
import { type ToastConfigParams } from "react-native-toast-message"
import { Ionicons } from "@expo/vector-icons"

type CustomToastProps = {
  ionIcon?: keyof typeof Ionicons.glyphMap
}

/**
 * https://tailwindcss.com/docs/colors
 * Type for the main toast component
 * @param backgroundColor - Background color (should be a Tailwind {color}-100 value) in hex
 * @param headerTextColor - Header text color (should be a Tailwind {color}-800/900 value) in hex
 * @param bodyTextColor - Body text color (should be a Tailwind {color}-600 value) in hex
 */
type CustomBaseToastType = {
  backgroundColor: string
  ionIcon: keyof typeof Ionicons.glyphMap
  headerText: string
  headerTextColor: string
  bodyText: string
  bodyTextColor: string
}

const CustomBaseToast = ({
  backgroundColor,
  ionIcon,
  headerText,
  bodyText,
  headerTextColor,
  bodyTextColor,
}: CustomBaseToastType) => {
  return (
    <View
      className="w-[90%] mx-auto p-4 rounded-lg shadow"
      style={{ backgroundColor: backgroundColor }}
    >
      <View className="flex-row items-start gap-3">
        <View className="">
          <Ionicons name={ionIcon} size={19} color={headerTextColor} />
        </View>
        <View className="flex-col mt-[1px] mr-10">
          <Text className="text-md font-bold" style={{ color: headerTextColor }}>
            {headerText}
          </Text>
          <Text className="text-s" style={{ color: bodyTextColor }}>
            {bodyText}
          </Text>
        </View>
      </View>
    </View>
  )
}

export const toastConfig = {
  error: ({ text1, text2, props }: ToastConfigParams<CustomToastProps>) => (
    /* color is tailwind red */
    <CustomBaseToast
      backgroundColor="#fecaca"
      ionIcon={props.ionIcon ? props.ionIcon : "close-outline"}
      headerText={text1 ? text1 : "Error"}
      bodyText={text2 ? text2 : "undefined"}
      headerTextColor="#7f1d1d"
      bodyTextColor="#dc2626"
    />
  ),

  info: ({ text1, text2, props }: ToastConfigParams<CustomToastProps>) => (
    /* color is tailwind amber */
    <CustomBaseToast
      backgroundColor="#fde68a"
      ionIcon={props.ionIcon ? props.ionIcon : "alert-sharp"}
      headerText={text1 ? text1 : "Info"}
      bodyText={text2 ? text2 : ""}
      headerTextColor="#92400e"
      bodyTextColor="#d97706"
    />
  ),

  success: ({ text1, text2, props }: ToastConfigParams<CustomToastProps>) => (
    /* color is tailwind emerald */
    <CustomBaseToast
      backgroundColor="#a7f3d0"
      ionIcon={props.ionIcon ? props.ionIcon : "checkmark-sharp"}
      headerText={text1 ? text1 : "Success"}
      bodyText={text2 ? text2 : ""}
      headerTextColor="#065f46"
      bodyTextColor="#059669"
    />
  ),

  general: ({ text1, text2, props }: ToastConfigParams<CustomToastProps>) => (
    /* color is tailwind blue */
    <CustomBaseToast
      backgroundColor="#bfdbfe"
      ionIcon={props.ionIcon ? props.ionIcon : "rocket-outline"}
      headerText={text1 ? text1 : ""}
      bodyText={text2 ? text2 : ""}
      headerTextColor="#1e3a8a"
      bodyTextColor="#2563eb"
    />
  ),
}
