import { View, TouchableOpacity } from "react-native"
import React from "react"
import { Image } from "expo-image"
import images from "@/constants/images"
import Svg, { Path } from "react-native-svg"
import { Ionicons } from "@expo/vector-icons"
import ConnectedUsersPictures from "../ConnectedUsersPictures"
import { ToastText } from "../general/ToastText"
import { getToasterColors } from "@/helpers/GetToasterColors"
import type { ToasterStyle } from "@/types/types"

type ConntectedToasterProps = {
  style?: ToasterStyle
  handleOnSettingsPress: () => void
}

const ConnectedToaster = ({ style = "green", handleOnSettingsPress }: ConntectedToasterProps) => {
  const backgroundColor = getToasterColors(style)
  return (
    <View className="px-standardPagePadding py-3 min-h-[100px] bg-primary-200">
      <View className="relative">
        <View
          className="absolute bg-black w-full h-full rounded-lg"
          style={{
            left: 5,
            top: 5,
          }}
        />
        <View
          className="relative w-full border-black border-[3px] z-20 rounded-lg"
          style={{ backgroundColor: backgroundColor.color }}
        >
          <View className="flex-row mx-4 my-3 justify-between">
            {/* Left section: profile picture + info */}
            <View className="flex-row">
              {/* profile picture */}
              <View className="border-black border-2 size-[65px] rounded-full overflow-hidden">
                <Image
                  source={images.hoofd}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                  transition={0}
                />
              </View>

              {/* Name + toast count */}
              <View className="ml-3 justify-between py-[2px]">
                <ToastText className=" text-xl font-courier-bold">Bart</ToastText>
                <ToastText className=" text-sm mt-[-12px]">SDFI37DFX</ToastText>

                <View className="flex flex-row gap-1">
                  <Svg width={16} height={13} viewBox="0 0 18 15" fill="none">
                    <Path
                      d="M3.141 1.308a.284.284 0 01-.36-.173.28.28 0 01.174-.358A13.509 13.509 0 015.366.199 18.433 18.433 0 019.01.022l.435-.015.46-.007c1.671 0 3.257.217 4.57.596 1.336.386 2.398.946 2.992 1.625.085.098.16.195.223.292.292.449.374.915.261 1.376-.108.443-.398.87-.855 1.263-.13.112-.272.221-.427.326l.006 7.8c.002.468-.182.896-.476 1.208a1.6 1.6 0 01-1.165.512h-1.81L2.964 15a1.609 1.609 0 01-1.165-.513 1.76 1.76 0 01-.477-1.208l.007-7.8a4.763 4.763 0 01-.425-.326C.447 4.759.157 4.33.049 3.889c-.113-.462-.032-.928.26-1.377.063-.096.138-.194.223-.29a3.296 3.296 0 01.361-.354c.12-.1.298-.086.4.033a.28.28 0 01-.034.396 2.595 2.595 0 00-.301.292 2.005 2.005 0 00-.172.227c-.204.314-.263.632-.188.94.08.327.31.656.675.973a4.3 4.3 0 00.492.361c.078.051.13.138.13.238l-.007 7.95c.001.324.124.616.323.826.193.206.46.334.752.334l10.257-.001h.013a1.03 1.03 0 00.738-.333c.2-.21.323-.502.323-.825l-.005-7.932a.282.282 0 01.13-.257c.186-.119.35-.24.492-.362.367-.316.596-.645.676-.971.076-.308.016-.627-.189-.94a1.984 1.984 0 00-.173-.228c-.522-.595-1.487-1.097-2.722-1.453C11.244.772 9.713.564 8.092.564c-.922 0-1.814.068-2.643.193-.848.127-1.63.315-2.31.55l.002.001zm8.042 7.081a.28.28 0 010-.398c.111-.11.29-.11.402 0l.476.472a.28.28 0 010 .398.286.286 0 01-.402 0l-.476-.472zm.9-2.478a.28.28 0 010 .399.286.286 0 01-.402 0l-1.466-1.454a.28.28 0 010-.399c.111-.11.29-.11.402 0l1.466 1.454zM9.818 3.666a.28.28 0 01-.002.398.286.286 0 01-.401-.002l-.122-.121a.28.28 0 01.002-.398.286.286 0 01.401.002l.122.12zm-1.526 4.43a.28.28 0 010-.398c.111-.11.29-.11.402 0l2.877 2.853a.28.28 0 010 .399.286.286 0 01-.402 0L8.292 8.096zm-2.738-.142a.28.28 0 010-.399c.11-.11.29-.11.401 0l3.51 3.481a.28.28 0 010 .399.286.286 0 01-.402 0l-3.51-3.481zM4.104 9.09a.28.28 0 010-.398c.111-.11.291-.11.402 0l1.466 1.454a.28.28 0 010 .398.286.286 0 01-.401 0L4.104 9.09zm2.266 2.247a.28.28 0 010-.399c.111-.11.29-.11.402 0l.121.12a.28.28 0 010 .4.286.286 0 01-.402 0l-.121-.12zm7.45-10.332c.791.337 1.424.75 1.835 1.217.084.096.158.194.221.29.294.45.376.916.263 1.378-.108.442-.398.87-.856 1.264-.13.111-.272.22-.426.326l.006 7.799c.002.444-.163.852-.43 1.159h.601c.292.001.558-.128.753-.334.198-.21.32-.502.32-.824l-.004-7.932a.282.282 0 01.13-.257c.185-.119.35-.24.492-.362.366-.316.595-.644.675-.971.076-.308.016-.626-.188-.94a2.037 2.037 0 00-.174-.229c-.52-.595-1.487-1.097-2.721-1.453a12.168 12.168 0 00-.498-.133v.002zm-11.75.763a.285.285 0 01-.383-.12.28.28 0 01.121-.38l.102-.052a.285.285 0 01.383.12.28.28 0 01-.121.38l-.102.052z"
                      fill="#57544E"
                    />
                  </Svg>
                  <ToastText className="text-md font-courier">100</ToastText>

                  <View className="mx-1 flex justify-center">
                    <Ionicons name="ellipse" size={5} />
                  </View>
                  <ToastText className="text-md font-courier">Today</ToastText>
                </View>
              </View>
            </View>

            {/* Right section: settings and connected users */}
            <View className="justify-between items-end py-1">
              <TouchableOpacity onPress={handleOnSettingsPress}>
                <Ionicons name="ellipsis-vertical-sharp" size={18} />
              </TouchableOpacity>

              {/* <ConnectedUsersPictures
                backgroundColor={backgroundColor.color}
                imagesAsUrl={[
                  images.hoofd,
                  images.hoofd,
                  images.hoofd,
                  images.hoofd,
                  images.hoofd,
                  images.hoofd,
                  images.hoofd,
                  images.hoofd,
                  images.hoofd,
                  images.hoofd,
                  images.hoofd,
                  images.hoofd,
                ]}
                size={20}
                maxVisibleUsers={4}
              /> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ConnectedToaster
