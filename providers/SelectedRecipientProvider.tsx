import type { CardToaster } from "@/types/types"
import React, { createContext, ReactNode, useContext, useState } from "react"

// Define the context type
type ToasterContextType = {
  availableToasters: CardToaster[]
  selectedToasters: CardToaster[]
  toggleToasterSelection: (toaster: CardToaster) => void
  setAvailableToasters: React.Dispatch<React.SetStateAction<CardToaster[]>>
}

// Create the context
const MessagingToasterContext = createContext<ToasterContextType | undefined>(undefined)

// Create a provider component
type MessagingToasterProviderProps = {
  children: ReactNode
}

export const MessagingToasterProvider: React.FC<MessagingToasterProviderProps> = ({ children }) => {
  const [availableToasters, setAvailableToasters] = useState<CardToaster[]>(DummyDataFullList)
  const [selectedToasters, setSelectedToasters] = useState<CardToaster[]>(DummySelectedList)

  const toggleToasterSelection = (toaster: CardToaster) => {
    setSelectedToasters((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === toaster.id)

      if (isAlreadySelected) {
        return prev.filter((item) => item.id !== toaster.id)
      } else {
        return [...prev, toaster]
      }
    })
  }

  const contextValue = {
    availableToasters,
    selectedToasters,
    toggleToasterSelection,
    setAvailableToasters,
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

const DummySelectedList: CardToaster[] = [
  {
    id: "t0101",
    toasterName: "ToastPro Elite",
    style: "green",
    picture_url: "HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "13",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        id: "14",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    id: "t0100",
    toasterName: "Avocado Deluxe",
    style: "pink",
    picture_url: "HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "15",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        id: "16",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        id: "17",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
    ],
  },
]

const DummyDataFullList: CardToaster[] = [
  {
    id: "t001",
    toasterName: "BreakfastMaster 3000",
    style: "blue",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "10",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
      {
        id: "11",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
      {
        id: "12",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
    ],
  },
  {
    id: "t002",
    toasterName: "ToastPro Elite",
    style: "green",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "13",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        id: "14",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    id: "t003",
    toasterName: "Avocado Deluxe",
    style: "purple",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "15",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        id: "16",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        id: "17",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
      {
        id: "18",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Mia",
      },
    ],
  },
  {
    id: "t004",
    toasterName: "BagelMaster Toaster",
    style: "yellow",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "19",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
      {
        id: "10",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
    ],
  },
  {
    id: "t005",
    toasterName: "AlphaBake Supreme",
    style: "orange",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "11",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
      {
        id: "12",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
      {
        id: "13",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        id: "14",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
      {
        id: "15",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
    ],
  },
  {
    id: "t006",
    toasterName: "ArtisanCrisp",
    style: "purple",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "16",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
    ],
  },
  {
    id: "t007",
    toasterName: "BagelMaster Pro",
    style: "blue",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "17",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
      {
        id: "18",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Mia",
      },
      {
        id: "19",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
    ],
  },
  {
    id: "t011",
    toasterName: "CrispnCrunchy",
    style: "orange",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "10",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
      {
        id: "11",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
    ],
  },
  {
    id: "t012",
    toasterName: "CuisineToast",
    style: "purple",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "12",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
      {
        id: "13",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        id: "14",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    id: "t013",
    toasterName: "ClassicCrisp",
    style: "blue",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "15",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        id: "16",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        id: "17",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
      {
        id: "18",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Mia",
      },
    ],
  },
  {
    id: "t014",
    toasterName: "Geret",
    style: "yellow",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "19",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
    ],
  },
  {
    id: "t015",
    toasterName: "Plat",
    style: "pink",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "10",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
      {
        id: "11",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
      {
        id: "12",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
    ],
  },
  {
    id: "t016",
    toasterName: "Plat",
    style: "pink",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "13",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        id: "14",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    id: "t017",
    toasterName: "Plat",
    style: "pink",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "15",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        id: "16",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        id: "17",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
    ],
  },
  {
    id: "t018",
    toasterName: "Plat",
    style: "pink",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        id: "18",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Mia",
      },
      {
        id: "19",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
    ],
  },
]
