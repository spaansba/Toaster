import { throwSupabaseError } from "@/helpers/SupabasePostgrestError"
import { supabase } from "@/lib/supabase"
import { BaseUser } from "@/types/types"

export async function getLoggedInUser(userId: string | undefined): Promise<BaseUser | null> {
  if (!userId) {
    throw new Error("user Id is undefined")
  }
  const { data, error, status, statusText } = await supabase
    .from("users")
    .select(`user_id, username, picture_url,created_at`)
    .eq("user_id", userId)
    .single()
  console.log(data)
  if (error && status !== 406) {
    throwSupabaseError(error, {
      SupabaseStatusCode: status,
      SupabaseStatusText: statusText,
    })
  }

  if (!data) {
    return null
  }

  const user: BaseUser = {
    userId: data.user_id,
    username: data.username,
    pictureUrl: data.picture_url,
  }

  return user
}

export async function getAllUsers(): Promise<BaseUser[]> {
  const { data, error, status, statusText } = await supabase
    .from("users")
    .select(`id, username, picture_url`)

  console.log(error)
  if (error && status !== 406) {
    throwSupabaseError(error, {
      SupabaseStatusCode: status,
      SupabaseStatusText: statusText,
    })
  }

  if (!data) {
    return []
  }

  return data.map((user) => ({
    userId: user.id,
    username: user.username,
    pictureUrl: user.picture_url,
  }))
}
