import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function Home() {
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <Text>Home</Text>
      <Button title='Sign Out' onPress={handleLogout} />
    </View>
  )
}