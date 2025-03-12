import { View, ScrollView } from "react-native"
import { Text } from "react-native"
import { ToasterButton } from "../components/ToasterButton"
import { ToasterInput } from "../components/ToasterInput"
import { useState } from "react"

export default function UserSettingsScreen() {
  const [username, setUsername] = useState("JohnDoe")
  const [email, setEmail] = useState("john@example.com")
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleSaveSettings = () => {
    // Implement settings save logic here
    console.log("Settings saved")
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Settings</Text>

        {/* Profile Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Profile
          </Text>
          <View className="space-y-4">
            <ToasterInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
            />
            <ToasterInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Preferences
          </Text>
          <View className="space-y-4">
            <ToasterButton
              onPress={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
              variant={isNotificationsEnabled ? "primary" : "secondary"}
              text={`Notifications: ${isNotificationsEnabled ? "On" : "Off"}`}
            />
            <ToasterButton
              onPress={() => setIsDarkMode(!isDarkMode)}
              variant={isDarkMode ? "primary" : "secondary"}
              text={`Dark Mode: ${isDarkMode ? "On" : "Off"}`}
            />
          </View>
        </View>

        {/* Privacy Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Privacy
          </Text>
          <View className="space-y-4">
            <ToasterButton onPress={() => {}} variant="secondary" text="Change Password" />
            <ToasterButton onPress={() => {}} variant="secondary" text="Privacy Settings" />
          </View>
        </View>

        {/* Save Button */}
        <View className="mt-6">
          <ToasterButton onPress={handleSaveSettings} variant="primary" text="Save Changes" />
        </View>
      </View>
    </ScrollView>
  )
}
