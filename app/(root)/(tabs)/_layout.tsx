import { router, Tabs } from "expo-router"
import React, { useEffect } from "react"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import { useAuth } from "@/providers/AuthProvider"

function TabsLayout() {
  const { session } = useAuth()

  useEffect(() => {
    if (!session) {
      router.replace("/")
    }
  }, [session])
  const tabIconSize = 28
  const tabColor = "#FBC567"
  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#6B7280",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: tabColor,
          paddingTop: 5,
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6
              name="pen-to-square"
              size={tabIconSize}
              color={focused ? color : "#6B7280"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "compass" : "compass-outline"} size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="user-o" size={tabIconSize} color={focused ? color : "#6B7280"} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
