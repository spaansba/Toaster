import { throwSupabaseError } from "@/helpers/SupabasePostgrestError"
import { supabase } from "@/lib/supabase"
import type { LoggedInUser } from "@/types/types"

export async function getLoggedInUser(userId: string | undefined): Promise<LoggedInUser | null> {
  if (!userId) {
    throw new Error("user Id is undefined")
  }
  const { data, error, status, statusText } = await supabase
    .from("profiles")
    .select(`id, username, avatar_url`)
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
