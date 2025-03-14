import type { ConnectedToaster } from "@/types/types"
import { create } from "zustand/react"
import { dummyToasters } from "./ConnectedToasterDummyData"

type ConnectedToasterState = {
  connectedToasters: ConnectedToaster[]
  selectedToaster: ConnectedToaster
  SetSelectedToaster: (toaster: ConnectedToaster) => void
  isModalVisible: boolean
  SetModalVisibility: (visibility: boolean) => void
}

export const useConnectedToasterStore = create<ConnectedToasterState>((set) => ({
  connectedToasters: dummyToasters,
  selectedToaster: dummyToasters[0],
  SetSelectedToaster: (toaster) => set(() => ({ selectedToaster: toaster })),
  isModalVisible: false,
  SetModalVisibility: (visibility) => set(() => ({ isModalVisible: visibility })),
}))
