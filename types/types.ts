export type BaseUser = {
  id: string
  username: string
  picture_url: string
}

type LoggedInUser = BaseUser & {}

// Define the valid toaster style types
export type ToasterStyle = "blue" | "green" | "pink" | "yellow" | "orange" | "purple"

export type ToasterData = {
  id: string
  style: ToasterStyle
}
