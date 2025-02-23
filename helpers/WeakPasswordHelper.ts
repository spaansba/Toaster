import type { AuthWeakPasswordError, WeakPasswordReasons } from "@supabase/supabase-js"

export const WeakPasswordHelper = (error: AuthWeakPasswordError): string[] => {
  const errors: string[] = []
  error.reasons.forEach((reason: WeakPasswordReasons) => {
    if (reason === "characters") {
      errors.push(
        "Your password needs the following characters:\n• At least one uppercase letter (A-Z)\n• At least one lowercase letter (a-z)\n• At least one number (0-9)"
      )
    }
    if (reason === "length") {
      errors.push("Password must be at least 6 characters")
    }
    if (reason === "pwned") {
      errors.push(
        "This password has been compromised in data breaches. Please choose a different one."
      )
    }
  })
  return errors
}
