import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/theme'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "transparent",
        tabBarActiveTintColor: "transparent",
        tabBarInactiveTintColor: "rgb(181, 181, 181)",
        tabBarStyle: {
          backgroundColor: "black",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: 0,
          height: 45,
          paddingBottom: 0,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={25} 
              color={focused ? "rgb(255, 255, 255)" : "rgb(181, 181, 181)"} 
            />
          )
        }} 
      />
      
      <Tabs.Screen 
        name="bookmarks"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "bookmark" : "bookmark-outline"} 
              size={25} 
              color={focused ? "rgb(255, 255, 255)" : "rgb(181, 181, 181)"} 
            />
          )
        }} 
      />

      <Tabs.Screen 
        name="create"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "add-circle" : "add-circle-outline"} 
              size={25} 
              color={focused ? "rgb(255, 255, 255)" : "rgb(181, 181, 181)"} 
            />
          )
        }} 
      />
      
      <Tabs.Screen 
        name="profile"
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "person-circle" : "person-circle-outline"} 
              size={25} 
              color={focused ? "rgb(255, 255, 255)" : "rgb(181, 181, 181)"} 
            />
          )
        }} 
      />
      
      <Tabs.Screen 
        name="notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "notifications" : "notifications-outline"} 
              size={25} 
              color={focused ? "rgb(255, 255, 255)" : "rgb(181, 181, 181)"} 
            />
          )
        }} 
      />
    </Tabs>
  )
}