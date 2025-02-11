import { router, Tabs } from "expo-router"
import React, { useEffect } from "react"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import { useAuth } from "@/providers/AuthProvider"
import ToastIcon from "@/components/svg/ToastIcon"
import SvgComponent from "@/components/svg/SvgComponent"
import { View } from "react-native"
function TabsLayout() {
  const { session } = useAuth()

  useEffect(() => {
    if (!session) {
      router.replace("/")
    }
  }, [session])
  const tabIconSize = 28
  const tabColor = "#EDE1D8"
  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#6B7280",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 2,
          borderTopColor: "#000000",
          backgroundColor: tabColor,
          paddingTop: 3,
        },
      })}
    >
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <SvgComponent size={50} color={focused ? color : "#6B7280"} strokeWidth={8} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <ToastIcon size={40} color={focused ? color : "#6B7280"} strokeWidth={8} />
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
