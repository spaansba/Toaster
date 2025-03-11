import CircleTabBarButton from "@/components/CircleTabBarButton"
import { useAuth } from "@/providers/AuthProvider"
import { FontAwesome } from "@expo/vector-icons"
import { router, Tabs } from "expo-router"
import React, { useEffect } from "react"
function TabsLayout() {
  const { session } = useAuth()

  useEffect(() => {
    if (!session) {
      router.replace("/")
    }
  }, [session])

  const tabIconSize = 28
  const tabColor = "#e5e5e3"

  return (
    <Tabs
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#6B7280",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 85,
          paddingTop: 10,
          borderTopWidth: 1.3,
          borderTopColor: "#000000",
          backgroundColor: tabColor,
        },
      })}
    >
      <Tabs.Screen
        name="toaster"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="print" size={tabIconSize} color={focused ? color : "#6B7280"} />
          ),
        }}
      />
      <Tabs.Screen
        name="sendMessage"
        options={{
          headerShown: true,
          tabBarButton: (props) => <CircleTabBarButton />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="user-o" size={tabIconSize} color={focused ? color : "#6B7280"} />
          ),
        }}
      />
      <Tabs.Screen name="userSettings" options={{}} />
    </Tabs>
  )
}

export default TabsLayout
