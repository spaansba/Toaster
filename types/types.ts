export type BaseUser = {
  id: string
  username: string
  picture_url: string
}

type LoggedInUser = BaseUser & {}
