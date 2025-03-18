import { Ionicons } from "@expo/vector-icons"
import { remapProps } from "nativewind"
// Create a base Ionicons wrapper with remapProps
const PressedIonIcons = remapProps(Ionicons, {
  className: "color", // Maps the className prop to the color prop
})
