import { Ionicons } from "@expo/vector-icons"
import { Pressable, View } from "react-native"
import { type ToastConfigParams, type ToastHideParams } from "react-native-toast-message"
import { ToastText } from "./general/ToastText"

type CustomToastProps = {
  ionIcon?: keyof typeof Ionicons.glyphMap
  onPressButtonText?: string
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
  onPress: (() => void) | undefined
  onPressButtonText?: string
  hide: (params: ToastHideParams) => void
}

const CustomBaseToast = ({
  backgroundColor,
  ionIcon,
  headerText,
  bodyText,
  headerTextColor,
  bodyTextColor,
  onPress,
  onPressButtonText,
  hide,
}: CustomBaseToastType) => {
  const showButton = typeof onPress === "function" && typeof onPressButtonText === "string"
  return (
    <View
      className="w-[90%] mx-auto rounded-lg shadow overflow-hidden"
      style={{ backgroundColor: backgroundColor }}
    >
      <View className="p-4">
        <View className="flex-row items-start gap-3">
          <View>
            <Ionicons name={ionIcon} size={19} color={headerTextColor} />
          </View>
          <View className="flex-col mt-[1px] mr-10">
            <ToastText className="text-md font-courier-bold" style={{ color: headerTextColor }}>
              {headerText}
            </ToastText>
            <ToastText className="text-s mt-[1px]" style={{ color: bodyTextColor }}>
              {bodyText}
            </ToastText>
          </View>
        </View>
        {showButton && (
          <Pressable
            className="mt-2 bg-white"
            onPress={() => {
              onPress?.()
              hide()
            }}
          >
            <ToastText
              className="text-center py-2.5 text-sm font-medium"
              style={{ color: bodyTextColor }}
            >
              {onPressButtonText}
            </ToastText>
          </Pressable>
        )}
      </View>
    </View>
  )
}

export const toastConfig = {
  error: ({ text1, text2, props, onPress, hide }: ToastConfigParams<CustomToastProps>) => (
    /* color is tailwind red */
    <CustomBaseToast
      backgroundColor="#fecaca"
      ionIcon={props.ionIcon ? props.ionIcon : "close-outline"}
      headerText={text1 ? text1 : "Error"}
      bodyText={text2 ? text2 : "undefined"}
      headerTextColor="#7f1d1d"
      bodyTextColor="#dc2626"
      onPress={onPress || undefined}
      onPressButtonText={props.onPressButtonText}
      hide={hide}
    />
  ),

  info: ({ text1, text2, props, onPress, hide }: ToastConfigParams<CustomToastProps>) => (
    /* color is tailwind amber */
    <CustomBaseToast
      backgroundColor="#fde68a"
      ionIcon={props.ionIcon ? props.ionIcon : "alert-sharp"}
      headerText={text1 ? text1 : "Info"}
      bodyText={text2 ? text2 : ""}
      headerTextColor="#92400e"
      bodyTextColor="#d97706"
      onPress={onPress || undefined}
      onPressButtonText={props.onPressButtonText}
      hide={hide}
    />
  ),

  success: ({ text1, text2, props, onPress, hide }: ToastConfigParams<CustomToastProps>) => (
    /* color is tailwind emerald */
    <CustomBaseToast
      backgroundColor="#a7f3d0"
      ionIcon={props.ionIcon ? props.ionIcon : "checkmark-sharp"}
      headerText={text1 ? text1 : "Success"}
      bodyText={text2 ? text2 : ""}
      headerTextColor="#065f46"
      bodyTextColor="#059669"
      onPress={onPress || undefined}
      onPressButtonText={props.onPressButtonText}
      hide={hide}
    />
  ),

  general: ({ text1, text2, props, onPress, hide }: ToastConfigParams<CustomToastProps>) => (
    /* color is tailwind blue */
    <CustomBaseToast
      backgroundColor="#bfdbfe"
      ionIcon={props.ionIcon ? props.ionIcon : "rocket-outline"}
      headerText={text1 ? text1 : ""}
      bodyText={text2 ? text2 : ""}
      headerTextColor="#1e3a8a"
      bodyTextColor="#2563eb"
      onPress={onPress || undefined}
      onPressButtonText={props.onPressButtonText}
      hide={hide}
    />
  ),
}
