import { Animated, View, Easing } from "react-native"
import React, { useEffect, useRef } from "react"
import { Image } from "expo-image"
import images from "@/constants/images"
import { ToastText } from "../ToastText"

const ProfileHeader = ({
  isExpanded = true,
}: {
  isExpanded?: boolean
  animationDuration?: number
}) => {
  const animationDuration = 500
  // Animation values - initialize based on current state
  const headerHeight = useRef(new Animated.Value(isExpanded ? 200 : 70)).current
  const imageSize = useRef(new Animated.Value(isExpanded ? 100 : 40)).current
  const titleOpacity = useRef(new Animated.Value(isExpanded ? 1 : 0)).current
  const badgesOpacity = useRef(new Animated.Value(isExpanded ? 1 : 0)).current

  // Trigger animations whenever isExpanded changes
  useEffect(() => {
    // Animate all properties in parallel
    Animated.parallel([
      Animated.timing(headerHeight, {
        toValue: isExpanded ? 200 : 70,
        duration: animationDuration,
        useNativeDriver: false,
        isInteraction: false,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      Animated.timing(imageSize, {
        toValue: isExpanded ? 100 : 40,
        duration: animationDuration,
        useNativeDriver: false,
        isInteraction: false,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      Animated.timing(titleOpacity, {
        toValue: isExpanded ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: false,
        isInteraction: false,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      Animated.timing(badgesOpacity, {
        toValue: isExpanded ? 1 : 0,
        duration: isExpanded ? animationDuration : animationDuration * 0.4,
        useNativeDriver: false,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    ]).start()
  }, [isExpanded])

  return (
    <Animated.View
      style={{
        height: headerHeight,
        overflow: "hidden",
        backgroundColor: "#fff3e1",
        paddingHorizontal: 15,
        borderBottomWidth: 2,
        borderColor: "black",
      }}
    >
      {/* Profile section - image and name side by side */}
      <View className="flex-row items-center pt-3 pb-2">
        <Animated.View
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "black",
            overflow: "hidden",
            marginRight: 15,
          }}
        >
          <Image
            source={images.hoofd}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={0}
          />
        </Animated.View>

        <View>
          <ToastText className="font-courier-bold text-2xl">Bart</ToastText>
          <Animated.View
            style={{
              opacity: titleOpacity,
            }}
          >
            <ToastText className="font-courier-bold text-xl text-gray-400">@username</ToastText>
          </Animated.View>
        </View>
      </View>

      {/* Badges and Toasters section - below profile */}
      <Animated.View style={{ opacity: badgesOpacity }}>
        <View className="flex-row mt-2 pb-1">
          <ToastText className="font-courier-bold text-black">Badges</ToastText>
        </View>
      </Animated.View>
    </Animated.View>
  )
}

export default ProfileHeader
