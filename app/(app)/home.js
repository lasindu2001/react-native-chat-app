import { View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ChatList from '../../components/ChatList'
import { useAuth } from '../../context/authContext'
import { getDocs, query, where } from 'firebase/firestore'
import { usersRef } from '../../firebaseConfig'
import { StatusBar } from 'expo-status-bar'
// import Loading from '../../components/Loading'

export default function Home() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (user?.uid) {
      getUsers()
    }
  }, [])

  const getUsers = async () => {
    const q = query(usersRef, where('userId', '!=', user?.uid))
    const querySnapshot = await getDocs(q)
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({...doc.data()})
    })
    setUsers(data)
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <StatusBar style='light'/>
      {users.length > 0 ? (
        <ChatList users={users}/>
      ):(
        <View style={{
          top: hp(30),
          flex: 1,
          alignItems: 'center'
        }}>
          <ActivityIndicator size='large' />
          {/* <Loading size={hp(10)}/> */}
        </View>
      )}
    </View>
  )
}