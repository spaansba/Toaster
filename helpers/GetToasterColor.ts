import tailwindConfig from "@/tailwind.config"

export const getToasterColor = (style: string): string => {
  try {
    const config = tailwindConfig as any
    return config.theme.extend.colors.toaster[style] || "#FFD787" // Default to yellow
  } catch (error) {
    // If there's any error accessing the config, return the default yellow
    return "#FFD787"
  }
}
