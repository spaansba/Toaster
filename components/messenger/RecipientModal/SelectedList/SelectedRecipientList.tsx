import { ToastText } from "@/components/general/ToastText"
import { useRecipientsStore } from "@/providers/RecipientsStore"

import { Ionicons } from "@expo/vector-icons"
import { LegendList } from "@legendapp/list"

import React from "react"
import { Pressable, View } from "react-native"
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated"
import SelectedRecipientItem from "./SelectedRecipientItem"

type SelectedRecipientListProps = {
  ShowDeleteAllButton: boolean
}

const SelectedRecipientList = ({ ShowDeleteAllButton }: SelectedRecipientListProps) => {
  const selectedRecipients = useRecipientsStore((state) => state.SelectedRecipients)
  const RemoveAllSelectedRecipients = useRecipientsStore((state) => state.RemoveAllSelectedToasters)
  return (
    <>
      <Animated.View layout={LinearTransition.duration(300)}>
        <View className="min-h-[115px] relative rounded-lg bg-white border-2 border-black w-full mt-2">
          {selectedRecipients.length > 0 ? (
            <>
              <LegendList
                data={selectedRecipients}
                renderItem={({ item }) => <SelectedRecipientItem toaster={item} />}
                keyExtractor={(item) => item.toasterId}
                horizontal={true}
                estimatedItemSize={95}
              />
            </>
          ) : (
            // couldnt make ListEmptyComponent of the LengendList work so we do it like this
            <Animated.View
              entering={FadeInDown.duration(300)}
              className="w-full h-[100px] justify-center items-center"
            >
              <ToastText className="text-gray-400 text-base">No recipients selected</ToastText>
              <ToastText className="text-gray-400 text-sm mt-1">
                Select recipients to start Toasting
              </ToastText>
            </Animated.View>
          )}
        </View>
      </Animated.View>
      {selectedRecipients.length > 0 && ShowDeleteAllButton && (
        <Pressable
          onPress={RemoveAllSelectedRecipients}
          className="bg-toaster-orange absolute w-[45px] h-[20px] justify-center items-center  rounded-md border-black border-2 right-[-8px] top-[-2px]"
        >
          <Ionicons name="trash-outline" size={13}></Ionicons>
        </Pressable>
      )}
    </>
  )
}

export default SelectedRecipientList
