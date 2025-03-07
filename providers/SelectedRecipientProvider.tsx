import type { BefriendedToaster } from "@/types/types"
import React, { createContext, ReactNode, useContext, useState } from "react"

// Define the context type
type ToasterContextType = {
  availableToasters: BefriendedToaster[]
  selectedToasters: BefriendedToaster[]
  toggleToasterSelection: (toaster: BefriendedToaster) => void
  setAvailableToasters: React.Dispatch<React.SetStateAction<BefriendedToaster[]>>
  removeAllSelectedToasters: () => void
}

// Create the context
const MessagingToasterContext = createContext<ToasterContextType | undefined>(undefined)

// Create a provider component
type MessagingToasterProviderProps = {
  children: ReactNode
}

export const MessagingToasterProvider: React.FC<MessagingToasterProviderProps> = ({ children }) => {
  const [availableToasters, setAvailableToasters] = useState<BefriendedToaster[]>(DummyDataFullList)
  const [selectedToasters, setSelectedToasters] = useState<BefriendedToaster[]>(DummySelectedList)

  const removeAllSelectedToasters = () => {
    setSelectedToasters([])
  }
  const toggleToasterSelection = (toaster: BefriendedToaster) => {
    setSelectedToasters((prev) => {
      const isAlreadySelected = prev.some((item) => item.toasterId === toaster.toasterId)

      if (isAlreadySelected) {
        return prev.filter((item) => item.toasterId !== toaster.toasterId)
      } else {
        return [toaster, ...prev] // Add to beginning instead of end so that the user comes at the beginning of the selected list
      }
    })
  }

  const contextValue = {
    availableToasters,
    selectedToasters,
    toggleToasterSelection,
    setAvailableToasters,
    removeAllSelectedToasters,
  }

  return (
    <MessagingToasterContext.Provider value={contextValue}>
      {children}
    </MessagingToasterContext.Provider>
  )
}

// Create a custom hook to use the context
export const useMessagingToasters = (): ToasterContextType => {
  const context = useContext(MessagingToasterContext)
  if (context === undefined) {
    throw new Error("useMessagingToasters must be used within a MessagingToasterProvider")
  }
  return context
}

const DummySelectedList: BefriendedToaster[] = [
  {
    toasterId: "t0101",
    toasterName: "ToastPro Elite",
    style: "green",
    pictureUrl: "HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T10:15:00Z",
    connectedUsers: [
      {
        userId: "13",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        userId: "14",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    toasterId: "t0100",
    toasterName: "Avocado Deluxe",
    style: "pink",
    pictureUrl: "HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T10:22:00Z",
    connectedUsers: [
      {
        userId: "15",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        userId: "16",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        userId: "17",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
    ],
  },
]

const DummyDataFullList: BefriendedToaster[] = [
  {
    toasterId: "t0101",
    toasterName: "ToastPro Elite",
    style: "green",
    pictureUrl: "HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T10:15:00Z",
    connectedUsers: [
      {
        userId: "13",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        userId: "14",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    toasterId: "t0100",
    toasterName: "Avocado Deluxe",
    style: "pink",
    pictureUrl: "HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T10:22:00Z",
    connectedUsers: [
      {
        userId: "15",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        userId: "16",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        userId: "17",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
    ],
  },
  {
    toasterId: "t001",
    toasterName: "BreakfastMaster 3000",
    style: "blue",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T09:45:00Z",
    connectedUsers: [
      {
        userId: "10",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
      {
        userId: "11",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
      {
        userId: "12",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
    ],
  },
  {
    toasterId: "t004",
    toasterName: "BagelMaster Toaster",
    style: "yellow",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T11:05:00Z",
    connectedUsers: [
      {
        userId: "19",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
      {
        userId: "10",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
    ],
  },
  {
    toasterId: "t005",
    toasterName: "AlphaBake Supreme",
    style: "orange",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T10:37:00Z",
    connectedUsers: [
      {
        userId: "11",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
      {
        userId: "12",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
      {
        userId: "13",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        userId: "14",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
      {
        userId: "15",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
    ],
  },
  {
    toasterId: "t006",
    toasterName: "ArtisanCrisp",
    style: "purple",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T09:18:00Z",
    connectedUsers: [
      {
        userId: "16",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
    ],
  },
  {
    toasterId: "t007",
    toasterName: "BagelMaster Pro",
    style: "blue",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T11:32:00Z",
    connectedUsers: [
      {
        userId: "17",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
      {
        userId: "18",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Mia",
      },
      {
        userId: "19",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
    ],
  },
  {
    toasterId: "t011",
    toasterName: "CrispnCrunchy",
    style: "orange",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T10:51:00Z",
    connectedUsers: [
      {
        userId: "10",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
      {
        userId: "11",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
    ],
  },
  {
    toasterId: "t012",
    toasterName: "CuisineToast",
    style: "purple",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T09:27:00Z",
    connectedUsers: [
      {
        userId: "12",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
      {
        userId: "13",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        userId: "14",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    toasterId: "t013",
    toasterName: "ClassicCrisp",
    style: "blue",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T11:12:00Z",
    connectedUsers: [
      {
        userId: "15",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        userId: "16",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        userId: "17",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
      {
        userId: "18",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Mia",
      },
    ],
  },
  {
    toasterId: "t014",
    toasterName: "Geret",
    style: "yellow",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T09:59:00Z",
    connectedUsers: [
      {
        userId: "19",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
    ],
  },
  {
    toasterId: "t015",
    toasterName: "Plat",
    style: "pink",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T10:43:00Z",
    connectedUsers: [
      {
        userId: "10",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
      {
        userId: "11",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
      {
        userId: "12",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
    ],
  },
  {
    toasterId: "t016",
    toasterName: "Plat",
    style: "pink",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T11:27:00Z",
    connectedUsers: [
      {
        userId: "13",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        userId: "14",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    toasterId: "t017",
    toasterName: "Plat",
    style: "pink",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T10:08:00Z",
    connectedUsers: [
      {
        userId: "15",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        userId: "16",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        userId: "17",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
    ],
  },
  {
    toasterId: "t018",
    toasterName: "Plat",
    style: "pink",
    pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    lastSendMessage: "2025-03-07T09:36:00Z",
    connectedUsers: [
      {
        userId: "18",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Mia",
      },
      {
        userId: "19",
        pictureUrl: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
    ],
  },
]
