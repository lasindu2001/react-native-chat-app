import { View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';

export default function ChatRoom() {
    const item = useLocalSearchParams()
    const router = useRouter()
    // console.log(item);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style='dark'/>
            <ChatRoomHeader user={item} router={router}/>
            <View style={{ height: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}/>
        </View>
    )
}