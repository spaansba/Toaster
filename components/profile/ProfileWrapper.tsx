import { View, SafeAreaView, TouchableOpacity, TextInput, Animated } from "react-native"
import React, { useState, useCallback, useMemo } from "react"
import { ToastText } from "../ToastText"
import ConnectedToaster from "./ConnectedToaster"
import { LegendList, type ViewToken } from "@legendapp/list"
import { Feather, Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import images from "@/constants/images"
import ToasterButton from "../ToasterButton"
import type { ToasterData } from "@/types/types"

const ProfileWrapper = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [profileShouldExpand, setProfileShouldExpand] = useState(true)

  // Create a properly typed array of toaster data
  const toasters: ToasterData[] = useMemo(
    () => [
      { id: "1", style: "blue" },
      { id: "2", style: "green" },
      { id: "3", style: "yellow" },
      { id: "4", style: "purple" },
      { id: "5", style: "yellow" },
      { id: "6", style: "green" },
      { id: "7", style: "purple" },
      { id: "8", style: "blue" },
      { id: "9", style: "green" },
      { id: "10", style: "green" },
    ],
    []
  )

  // Memoize the viewable items change handler
  const handleViewableItemsChanged = ({ changed }: { changed: Array<ViewToken> }) => {
    // Check if item with index 0 is in the changed items
    const firstItem = changed.find((item) => item.index === 0)
    if (firstItem) {
      setProfileShouldExpand(firstItem.isViewable)
    }
  }
  // Memoize the render item function
  const renderItem = useCallback(
    ({ item }: { item: ToasterData }) => (
      <ConnectedToaster handleOnSettingsPress={() => {}} style={item.style} />
    ),
    []
  )

  // Memoize the list header component
  const ListHeaderComponent = useMemo(
    () => (
      <View className="bg-primary-200">
        <View className={`overflow-hidden bg-primary-200 px-5 flex gap-4`}>
          <View className="flex-row items-center pt-1 ">
            <View
              className=" rounded-full border-4 border-black overflow-hidden mr-4"
              style={{ width: 100, height: 100 }} // Added explicit dimensions
            >
              <Image
                source={images.hoofd}
                style={{ width: "100%", height: "100%" }} // Added explicit style
                className="w-full h-full"
                contentFit="cover"
                cachePolicy="memory-disk"
              />
            </View>
            <View className="gap-1">
              <View className="flex-row items-center justify-center gap-1">
                <Ionicons name="person-sharp" size={20} />
                <ToastText className="text-xl pt-[3px]">@BartSpaans96</ToastText>
              </View>

              <View className="flex-row items-center gap-1">
                <Ionicons name="hammer-sharp" size={20} />
                <ToastText className=" text-xl pt-[3px]">400</ToastText>
              </View>

              <View className="flex-row items-center gap-1">
                <Ionicons name="calendar" size={16} />
                <ToastText className="font-courier text-xl text-center pt-[3px]">
                  25-10-2025
                </ToastText>
              </View>
            </View>
          </View>
          <View className="flex-col">
            <View className="flex-row justify-between mb-1">
              <ToastText className="text-2xl">Badges</ToastText>
              <ToasterButton
                className="h-[25px] w-[50px]"
                content={{
                  type: "text",
                  text: ">",
                }}
                shadowOffset={2}
                onPress={() => {}}
                variant="yellow"
                borderRadius={80}
              />
            </View>
            <View className="flex-row">
              <View
                className="rounded-full border border-black overflow-hidden mr-4"
                style={{ width: 50, height: 50 }} // Added explicit dimensions
              >
                <Image
                  source={images.walkingToaster}
                  style={{ width: "100%", height: "100%" }} // Added explicit style
                  className="w-full h-full"
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
              </View>
              <View
                className=" rounded-full border border-black overflow-hidden mr-4"
                style={{ width: 50, height: 50 }} // Added explicit dimensions
              >
                <Image
                  source={images.walkingToaster}
                  style={{ width: "100%", height: "100%" }} // Added explicit style
                  className="w-full h-full"
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
              </View>
            </View>
          </View>

          <View className="flex-row justify-between">
            <ToastText className="text-2xl">Connected Toasters</ToastText>
            <ToasterButton
              className="h-[25px] w-[50px]"
              content={{
                type: "text",
                text: "+",
              }}
              shadowOffset={2}
              onPress={() => {}}
              variant="green"
              borderRadius={80}
            />
          </View>
          {/* <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-2 border-[1px] border-black">
            <Feather name="search" size={18} color="black" />
            <TextInput
              className="flex-1 ml-2 font-courier"
              placeholder="Search toasters..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Feather name="x" size={18} color="black" />
              </TouchableOpacity>
            )}
          </View> */}
        </View>
      </View>
    ),
    [searchQuery]
  )

  // Memoize key extractor
  const keyExtractor = useCallback((item: ToasterData) => item.id, [])

  return (
    <SafeAreaView className="bg-primary-200 h-full">
      {/* <ProfileHeader isExpanded={profileShouldExpand} /> */}

      <LegendList
        style={{ backgroundColor: "#fff3e1" }}
        data={toasters}
        estimatedItemSize={110}
        renderItem={renderItem}
        onViewableItemsChanged={(info) => handleViewableItemsChanged(info)}
        ListHeaderComponent={ListHeaderComponent}
        initialScrollOffset={0}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  )
}

export default ProfileWrapper
