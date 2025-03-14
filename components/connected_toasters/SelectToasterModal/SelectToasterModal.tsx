import { useConnectedToasterStore } from "@/providers/ConnectedToasterStore"
import { useHeaderHeight } from "@react-navigation/elements"
import React from "react"
import { Modal, TouchableOpacity, View } from "react-native"
import SelectToasterList from "./SelectToasterList"

const SelectToasterModal: React.FC = () => {
  const SetModalVisibility = useConnectedToasterStore((state) => state.SetModalVisibility)
  const isModalVisible = useConnectedToasterStore((state) => state.isModalVisible)
  const headerHeight = useHeaderHeight()

  return (
    <Modal
      visible={isModalVisible}
      transparent
      onRequestClose={() => {
        SetModalVisibility(false)
      }}
    >
      <TouchableOpacity
        className="flex-1 bg-black/50"
        activeOpacity={1}
        onPress={() => SetModalVisibility(false)}
      >
        <View
          className="absolute left-2 bg-white rounded-lg p-2 shadow-md"
          style={{ top: headerHeight, maxHeight: 900, width: 250 }}
        >
          <SelectToasterList />
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export default SelectToasterModal
