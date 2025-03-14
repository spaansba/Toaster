import { useConnectedToasterStore } from "@/providers/ConnectedToasterStore"
import type { ConnectedToaster } from "@/types/types"
import { LegendList } from "@legendapp/list"
import React from "react"
import SelectToasterModalListItem from "./SelectToasterModalListItem"

const SelectToasterList = () => {
  const connectedToasters = useConnectedToasterStore((state) => state.connectedToasters)
  const SetSelectedToaster = useConnectedToasterStore((state) => state.SetSelectedToaster)
  const selectedToaster = useConnectedToasterStore((state) => state.selectedToaster)
  const SetModalVisibility = useConnectedToasterStore((state) => state.SetModalVisibility)
  const handleSelectToaster = (toaster: ConnectedToaster) => {
    SetModalVisibility(false)
    SetSelectedToaster(toaster)
  }

  const sortedToasters = [...connectedToasters].sort((a, b) => {
    return a.toasterName.localeCompare(b.toasterName)
  })
  return (
    <LegendList
      scrollEnabled={false}
      data={sortedToasters}
      renderItem={({ item }) => (
        <SelectToasterModalListItem
          item={item}
          onSelect={handleSelectToaster}
          isSelected={item.toasterId === selectedToaster?.toasterId}
        />
      )}
      keyExtractor={(item) => item.toasterId}
      estimatedItemSize={43}
    />
  )
}

export default SelectToasterList
