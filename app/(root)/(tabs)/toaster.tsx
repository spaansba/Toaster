import SelectToasterModal from "@/components/connected_toasters/HeaderSelectToasterModal/SelectToasterModal"
import React from "react"
import { SafeAreaView } from "react-native"

export default function Toaster() {
  return (
    <SafeAreaView className="bg-primary-200 flex-1">
      <SelectToasterModal />
    </SafeAreaView>
  )
}
