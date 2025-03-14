import { useConnectedToasterStore } from "@/providers/ConnectedToasterStore"
import React from "react"
import BaseScreenHeader from "../screen_header/BaseScreenHeader"
const ConnectedToastersScreenHeader = () => {
  const SetModalVisibility = useConnectedToasterStore((state) => state.SetModalVisibility)
  const isModalVisible = useConnectedToasterStore((state) => state.isModalVisible)
  const selectedToaster = useConnectedToasterStore((state) => state.selectedToaster)
  return (
    <BaseScreenHeader
      title={selectedToaster.toasterName}
      onButtonPress={() => {}}
      titleInteraction={{
        isChevronVisible: true,
        onTitlePress: () => SetModalVisibility(!isModalVisible),
      }}
    />
  )
}

export default ConnectedToastersScreenHeader
