import { supabase } from "@/lib/supabase"
import React, { useState } from "react"
import { SafeAreaView, View, Pressable } from "react-native"
import { ToastText } from "@/components/general/ToastText"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import type { ConnectedToaster } from "@/types/types"
import ToasterSelector from "@/components/messenger/ToasterSelector/ToasterSelector"
import ToasterInfo from "@/components/messenger/ToasterInfo/ToasterInfo"
import { dummyToasters } from "@/providers/ConnectedToasterDummyData"

export default function Toaster() {
  const [selectedToaster, setSelectedToaster] = useState<ConnectedToaster>(dummyToasters[0])
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)

  return (
    <SafeAreaView className="bg-primary-200 flex-1">
      {/* Header */}
      {/* <View className="flex-row justify-between items-center px-6 py-4 border-b-[1px] border-black">
        <Pressable className="flex-1 flex-row items-center" onPress={() => setIsSelectorOpen(true)}>
          <ToastText className="text-2xl font-courier-bold mr-2">
            {selectedToaster.toasterName}
          </ToastText>
          <MaterialCommunityIcons name="chevron-down" size={24} color="black" />
        </Pressable>
        <Pressable className="w-10 h-10 rounded-full items-center justify-center border-[1px] border-black bg-primary-100">
          <MaterialCommunityIcons name="plus" size={24} color="black" />
        </Pressable>
      </View> */}

      {/* Toaster Content */}
      <ToasterInfo toaster={selectedToaster} />

      {/* Toaster Selector Modal */}
      <ToasterSelector
        toasters={dummyToasters}
        selectedToaster={selectedToaster}
        onSelect={setSelectedToaster}
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
      />
    </SafeAreaView>
  )
}
