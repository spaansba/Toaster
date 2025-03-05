import tailwindConfig from "@/tailwind.config"
import type { ToasterStyle } from "@/types/types"

export const getToasterColors = (style: ToasterStyle): { color: string; lightColor: string } => {
  try {
    const config = tailwindConfig as any
    const baseColor = config.theme.extend.colors.toaster[style] || "#FFD787" // Default to yellow
    const lightColor = config.theme.extend.colors.toaster[`light-${style}`] || "#FFD787A2" // Default to light yellow

    return {
      color: baseColor,
      lightColor: lightColor,
    }
  } catch (error) {
    // If there's any error accessing the config, return the default colors
    return {
      color: "#FFD787", // Default yellow
      lightColor: "#FFD787A2", // Default light yellow
    }
  }
}
