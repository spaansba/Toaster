import { throwSupabaseError } from "@/helpers/SupabasePostgrestError"
import { supabase } from "@/lib/supabase"
import type { BaseUser } from "@/types/types"

export async function getLoggedInUser(userId: string | undefined): Promise<BaseUser | null> {
  if (!userId) {
    throw new Error("user Id is undefined")
  }
  const { data, error, status, statusText } = await supabase
    .from("users")
    .select(`id, username, picture_url`)
    .eq("id", userId)
    .single()
  const x = fetch("http")

  if (error && status !== 406) {
    throwSupabaseError(error, {
      SupabaseStatusCode: status,
      SupabaseStatusText: statusText,
    })
  }

  return data
}

export async function getAllUsers(): Promise<BaseUser[] | null> {
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

  return data
}
