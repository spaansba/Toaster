export type BaseUser = {
  userId: string
  username: string
  pictureUrl: string
}

export type BaseToaster = {
  toasterId: string
  toasterName: string
  pictureUrl: string
}

export type BefriendedToaster = BaseToaster & {
  style: ToasterStyle
  connectedUsers: BaseUser[]
  lastSendMessage: string
  favorite: boolean
}

export type ToasterSectionListData = {
  title: string
  data: BefriendedToaster[]
}

// Define the valid toaster style types
export type ToasterStyle = "blue" | "green" | "pink" | "yellow" | "orange" | "purple"

export type ConnectedToaster = BaseToaster & {
  style: ToasterStyle
  connectedUsers: BaseUser[]
  lastUsed: string
  totalToastsSent: number
  isActive: boolean
  deviceId?: string
}
