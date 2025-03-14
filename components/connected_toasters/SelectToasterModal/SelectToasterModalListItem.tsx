import type { ConnectedToaster } from "@/types/types"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { TouchableOpacity } from "react-native"
import { ToastText } from "../../general/ToastText"

type SelectToasterModalListItemProps = {
  item: ConnectedToaster
  onSelect: (toaster: ConnectedToaster) => void
  isSelected: boolean
}

const SelectToasterModalListItem = ({
  item,
  onSelect,
  isSelected,
}: SelectToasterModalListItemProps) => {
  return (
    <TouchableOpacity
      className="py-3 px-2  flex-row items-center gap-2 "
      onPress={() => onSelect(item)}
    >
      <Ionicons name={item.isActive ? "add" : "add-circle-outline"} size={10} />
      <ToastText className={`text-base ${isSelected ? "font-bold" : ""}`} numberOfLines={1}>
        {item.toasterName}
      </ToastText>
    </TouchableOpacity>
  )
}

export default SelectToasterModalListItem
