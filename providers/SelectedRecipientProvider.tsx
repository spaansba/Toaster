import type { BaseToaster, CardToaster } from "@/types/types"
import React, { createContext, useState, useContext, ReactNode } from "react"

// Define the context type
type ToasterContextType = {
  availableToasters: CardToaster[]
  selectedToasters: CardToaster[]
  setSelectedToasters: React.Dispatch<React.SetStateAction<CardToaster[]>>
  setAvailableToasters: React.Dispatch<React.SetStateAction<CardToaster[]>>
}

// Create the context
const MessagingToasterContext = createContext<ToasterContextType | undefined>(undefined)

// Create a provider component
type MessagingToasterProviderProps = {
  children: ReactNode
}

export const MessagingToasterProvider: React.FC<MessagingToasterProviderProps> = ({ children }) => {
  const [availableToasters, setAvailableToasters] = useState<CardToaster[]>([
    {
      id: "t001",
      toasterName: "BreakfastMaster 3000",
      style: "blue",
      picture_url: "",
    },
    {
      id: "t002",
      toasterName: "ToastPro Elite",
      style: "green",
      picture_url: "",
    },
    {
      id: "t003",
      toasterName: "Avocado Deluxe",
      style: "pink",
      picture_url: "",
    },
    {
      id: "t004",
      toasterName: "BagelMaster Toaster",
      style: "yellow",
      picture_url: "",
    },
    {
      id: "t005",
      toasterName: "AlphaBake Supreme",
      style: "orange",
      picture_url: "",
    },
    {
      id: "t006",
      toasterName: "ArtisanCrisp",
      style: "purple",
      picture_url: "",
    },
    {
      id: "t007",
      toasterName: "BagelMaster Pro",
      style: "blue",
      picture_url: "",
    },
    {
      id: "t011",
      toasterName: "CrispnCrunchy",
      style: "orange",
      picture_url: "",
    },
    {
      id: "t012",
      toasterName: "CuisineToast",
      style: "purple",
      picture_url: "",
    },
    {
      id: "t013",
      toasterName: "ClassicCrisp",
      style: "blue",
      picture_url: "",
    },
    {
      id: "t014",
      toasterName: "Geret",
      style: "yellow",
      picture_url: "",
    },
    {
      id: "t015",
      toasterName: "Plat",
      style: "pink",
      picture_url: "",
    },

    {
      id: "t016",
      toasterName: "Plat",
      style: "pink",
      picture_url: "",
    },

    {
      id: "t017",
      toasterName: "Plat",
      style: "pink",
      picture_url: "",
    },

    {
      id: "t018",
      toasterName: "Plat",
      style: "pink",
      picture_url: "",
    },
  ])
  const [selectedToasters, setSelectedToasters] = useState<CardToaster[]>([
    {
      id: "t002",
      toasterName: "ToastPro Elite",
      style: "green",
      picture_url: "",
    },
    {
      id: "t003",
      toasterName: "Avocado Deluxe",
      style: "pink",
      picture_url: "",
    },
  ])

  const value = {
    availableToasters,
    selectedToasters,
    setSelectedToasters,
    setAvailableToasters,
  }

  return (
    <MessagingToasterContext.Provider value={value}>{children}</MessagingToasterContext.Provider>
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

// Example usage:
//
// // In your app root
// <MessagingToasterProvider>
//   <App />
// </MessagingToasterProvider>
//
// // In any component
// const { availableToasters, selectedToasters, setSelectedToasters } = useMessagingToasters();
