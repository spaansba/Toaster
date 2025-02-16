import { router, Tabs } from "expo-router"
import React, { useEffect } from "react"
import { FontAwesome } from "@expo/vector-icons"
import { useAuth } from "@/providers/AuthProvider"
import SquareButton from "@/components/CenterTabButton"
function TabsLayout() {
  const { session } = useAuth()

  useEffect(() => {
    if (!session) {
      router.replace("/")
    }
  }, [session])
  const tabIconSize = 28
  const tabColor = "#B19CD9"
  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#6B7280",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          borderTopColor: "#000000",
          backgroundColor: tabColor,
        },
      })}
    >
      <Tabs.Screen
        name="test"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="book" size={tabIconSize} color={focused ? color : "#6B7280"} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="toaster"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="print" size={tabIconSize} color={focused ? color : "#6B7280"} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="home"
        options={{
          tabBarButton: (props) => <SquareButton />,
        }}
      /> */}
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
