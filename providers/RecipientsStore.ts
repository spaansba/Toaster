import type { BefriendedToaster } from "@/types/types"
import { create } from "zustand"
import { DummyDataFullList, DummySelectedList } from "./RecipientStoreDummyData"

type RecipientsState = {
  AllRecipients: BefriendedToaster[]
  SelectedRecipients: BefriendedToaster[]
  RecipientSelectorModalVisibility: boolean
  ShowRecipientSelectorModal: () => void
  HideRecipientSelectorModal: () => void
  RemoveAllSelectedToasters: () => void
  ToggleSelectedRecipient: (selectedRecipient: BefriendedToaster) => void
}

export const useRecipientsStore = create<RecipientsState>((set) => ({
  name: "Recipient-Storage",
  AllRecipients: DummyDataFullList,
  SelectedRecipients: DummySelectedList,
  RecipientSelectorModalVisibility: false,
  ShowRecipientSelectorModal: () => {
    set({ RecipientSelectorModalVisibility: true })
  },
  HideRecipientSelectorModal: () => {
    set({ RecipientSelectorModalVisibility: false })
  },
  RemoveAllSelectedToasters: () => {
    set({ SelectedRecipients: [] })
  },
  ToggleSelectedRecipient: (selectedRecipient: BefriendedToaster) => {
    set((state) => {
      const isAlreadySelected = state.SelectedRecipients.some(
        (item) => item.toasterId === selectedRecipient.toasterId
      )

      if (isAlreadySelected) {
        return {
          SelectedRecipients: state.SelectedRecipients.filter(
            (item) => item.toasterId !== selectedRecipient.toasterId
          ),
        }
      } else {
        return {
          SelectedRecipients: [selectedRecipient, ...state.SelectedRecipients],
        }
      }
    })
  },
}))
