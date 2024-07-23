import { TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessagesList from '../../components/MessagesList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons';
import CustomeKeyboardView from '../../components/CustomeKeyboardView';

export default function ChatRoom() {
    const item = useLocalSearchParams()
    // console.log(item);
    const router = useRouter()
    const [messages, setMessages] = useState([])

    return (
        <CustomeKeyboardView inchat={true}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar style='dark' />
                <ChatRoomHeader user={item} router={router} />
                <View style={{ height: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }} />
                <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#F3F4F6', overflow: 'visible' }}>
                    <View style={{ flex: 1 }}>
                        <MessagesList messages={messages} />
                    </View>
                    <View style={{ marginBottom: hp(2.7), paddingTop: 8 }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: 'white',
                            marginHorizontal: 12,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                            padding: 8,
                            borderRadius: 100,
                            paddingLeft: 20
                        }}>
                            <TextInput
                                placeholder='Type Message...'
                                style={{ fontSize: hp(2), flex: 1, marginRight: 8 }}
                            />
                            <TouchableOpacity style={{
                                backgroundColor: '#E5E7EB',
                                padding: 8,
                                marginRight: 1,
                                borderRadius: 100
                            }}>
                                <Feather name='send' size={hp(2.7)} color='#737373' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </CustomeKeyboardView>
    )
}