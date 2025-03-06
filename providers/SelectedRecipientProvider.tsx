import type { CardToaster } from "@/types/types"
import React, { createContext, ReactNode, useContext, useState } from "react"

// Define the context type
type ToasterContextType = {
  availableToasters: CardToaster[]
  selectedToasters: CardToaster[]
  toggleToasterSelection: (toaster: CardToaster) => void
  setAvailableToasters: React.Dispatch<React.SetStateAction<CardToaster[]>>
  removeAllSelectedToasters: () => void
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

  const removeAllSelectedToasters = () => {
    setSelectedToasters([])
  }
  const toggleToasterSelection = (toaster: CardToaster) => {
    setSelectedToasters((prev) => {
      const isAlreadySelected = prev.some((item) => item.toaster_id === toaster.toaster_id)

      if (isAlreadySelected) {
        return prev.filter((item) => item.toaster_id !== toaster.toaster_id)
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

const DummySelectedList: CardToaster[] = [
  {
    toaster_id: "t0101",
    toaster_name: "ToastPro Elite",
    style: "green",
    picture_url: "HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "13",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        user_id: "14",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    toaster_id: "t0100",
    toaster_name: "Avocado Deluxe",
    style: "pink",
    picture_url: "HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "15",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        user_id: "16",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        user_id: "17",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
    ],
  },
]

const DummyDataFullList: CardToaster[] = [
  {
    toaster_id: "t0101",
    toaster_name: "ToastPro Elite",
    style: "green",
    picture_url: "HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "13",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        user_id: "14",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    toaster_id: "t0100",
    toaster_name: "Avocado Deluxe",
    style: "pink",
    picture_url: "HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "15",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        user_id: "16",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        user_id: "17",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
    ],
  },
  {
    toaster_id: "t001",
    toaster_name: "BreakfastMaster 3000",
    style: "blue",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "10",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
      {
        user_id: "11",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
      {
        user_id: "12",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
    ],
  },
  {
    toaster_id: "t004",
    toaster_name: "BagelMaster Toaster",
    style: "yellow",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "19",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
      {
        user_id: "10",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
    ],
  },
  {
    toaster_id: "t005",
    toaster_name: "AlphaBake Supreme",
    style: "orange",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "11",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
      {
        user_id: "12",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
      {
        user_id: "13",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        user_id: "14",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
      {
        user_id: "15",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
    ],
  },
  {
    toaster_id: "t006",
    toaster_name: "ArtisanCrisp",
    style: "purple",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "16",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
    ],
  },
  {
    toaster_id: "t007",
    toaster_name: "BagelMaster Pro",
    style: "blue",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "17",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
      {
        user_id: "18",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Mia",
      },
      {
        user_id: "19",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
    ],
  },
  {
    toaster_id: "t011",
    toaster_name: "CrispnCrunchy",
    style: "orange",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "10",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
      {
        user_id: "11",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
    ],
  },
  {
    toaster_id: "t012",
    toaster_name: "CuisineToast",
    style: "purple",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "12",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
      {
        user_id: "13",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        user_id: "14",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    toaster_id: "t013",
    toaster_name: "ClassicCrisp",
    style: "blue",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "15",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        user_id: "16",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        user_id: "17",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
      {
        user_id: "18",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Mia",
      },
    ],
  },
  {
    toaster_id: "t014",
    toaster_name: "Geret",
    style: "yellow",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "19",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
    ],
  },
  {
    toaster_id: "t015",
    toaster_name: "Plat",
    style: "pink",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "10",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Hans",
      },
      {
        user_id: "11",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Emma",
      },
      {
        user_id: "12",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Olivia",
      },
    ],
  },
  {
    toaster_id: "t016",
    toaster_name: "Plat",
    style: "pink",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "13",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Noah",
      },
      {
        user_id: "14",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Liam",
      },
    ],
  },
  {
    toaster_id: "t017",
    toaster_name: "Plat",
    style: "pink",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "15",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Ava",
      },
      {
        user_id: "16",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Sophia",
      },
      {
        user_id: "17",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Jackson",
      },
    ],
  },
  {
    toaster_id: "t018",
    toaster_name: "Plat",
    style: "pink",
    picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
    connected_users: [
      {
        user_id: "18",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Mia",
      },
      {
        user_id: "19",
        picture_url: "https://5zfgvazvyb.ufs.sh/f/HgS7iFpfFqdYTB6S7Nb7OwZQEdSfRkq49Gr2L6bNpVPxHYhg",
        username: "Lucas",
      },
    ],
  },
]
