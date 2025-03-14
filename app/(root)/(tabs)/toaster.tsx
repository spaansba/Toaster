import React from "react"
import { SafeAreaView } from "react-native"

import ConnectedToasterModal from "@/components/connected_toasters/ConnectedToasterModal"
export default function Toaster() {
  return (
    <SafeAreaView className="bg-primary-200 flex-1">
      <ConnectedToasterModal />
    </SafeAreaView>
  )
}
