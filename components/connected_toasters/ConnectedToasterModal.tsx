import { useConnectedToasterStore } from "@/providers/ConnectedToasterStore"
import { useHeaderHeight } from "@react-navigation/elements"
import React from "react"
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native"
import { ConnectedToaster } from "@/types/types"
import { LegendList } from "@legendapp/list"

type ToasterItemProps = {
  item: ConnectedToaster
  onSelect: (toaster: ConnectedToaster) => void
}

const ToasterItem: React.FC<ToasterItemProps> = ({ item, onSelect }) => {
  return (
    <TouchableOpacity className="py-3 px-4 border-b border-gray-100" onPress={() => onSelect(item)}>
      <Text className="text-base">{item.toasterName}</Text>
    </TouchableOpacity>
  )
}

const ConnectedToasterModal: React.FC = () => {
  const SetModalVisibility = useConnectedToasterStore((state) => state.SetModalVisibility)
  const isModalVisible = useConnectedToasterStore((state) => state.isModalVisible)
  const connectedToasters = useConnectedToasterStore((state) => state.connectedToasters)
  const SetSelectedToaster = useConnectedToasterStore((state) => state.SetSelectedToaster)
  const headerHeight = useHeaderHeight()

  const handleSelectToaster = (toaster: ConnectedToaster) => {
    SetSelectedToaster(toaster)
    SetModalVisibility(false)
  }

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
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
          className="absolute left-2 bg-toaster-green  rounded-lg p-2 shadow-md"
          style={{ top: headerHeight, maxHeight: 900, width: 200 }}
        >
          <LegendList
            scrollEnabled={false}
            data={connectedToasters}
            renderItem={({ item }) => <ToasterItem item={item} onSelect={handleSelectToaster} />}
            keyExtractor={(item) => item.toasterId}
            estimatedItemSize={43}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export default ConnectedToasterModal
