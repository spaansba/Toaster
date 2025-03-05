export type BaseUser = {
  id: string
  username: string
  picture_url: string
}

export type BaseToaster = {
  id: string
  toasterName: string
  picture_url: string
}

export type CardToaster = BaseToaster & {
  style: ToasterStyle
}

export type ToasterSectionListData = {
  title: string
  data: CardToaster[]
}

type LoggedInUser = BaseUser & {}

// Define the valid toaster style types
export type ToasterStyle = "blue" | "green" | "pink" | "yellow" | "orange" | "purple"
