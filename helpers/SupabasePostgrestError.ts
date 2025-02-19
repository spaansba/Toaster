import type { PostgrestError } from "@supabase/supabase-js"

export type SupabaseErrorExtension = {
  SupabaseStatusCode: number
  SupabaseStatusText: string // always "" but we will see, maybe gets added in the future
}

export type SupabasePostgrestError = PostgrestError & SupabaseErrorExtension

export function throwSupabaseError(
  error: PostgrestError,
  extension: SupabaseErrorExtension
): never {
  throw {
    ...error,
    ...extension,
  } as SupabasePostgrestError
}

export function isSupbasePostgrestError(error: Error): error is SupabasePostgrestError {
  error.name = "PostgrestError"
  return (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    "message" in error &&
    "details" in error &&
    "hint" in error &&
    "SupabaseStatusCode" in error &&
    "SupabaseStatusText" in error
  )
}
