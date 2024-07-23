import { Alert, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessagesList from '../../components/MessagesList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons';
import CustomeKeyboardView from '../../components/CustomeKeyboardView';
import { useAuth } from '../../context/authContext'
import { getRoomId } from '../../utils/common';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ChatRoom() {
    const item = useLocalSearchParams()
    // console.log(item);
    const { user } = useAuth()
    const router = useRouter()
    const [messages, setMessages] = useState([])
    const textRef = useRef('')
    const inputRef = useRef(null)

    useEffect(() => {
        createRoomIfNotExists()

        let roomId = getRoomId(user?.userId, item?.userId)
        const docRef = doc(db, 'rooms', roomId)
        const messagesRef = collection(docRef, 'messages')
        const q = query(messagesRef, orderBy('createdAt', 'asc'))

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map((doc) => {
                return doc.data()
            })
            setMessages([...allMessages])
        })

        return unsub;
    }, [])

    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(user?.userId, item?.userId)
        await setDoc(doc(db, 'rooms', roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        })
    }

    const handleSendMessage = async () => {
        let message = textRef.current.trim()
        if (!message) return
        try {
            let roomId = getRoomId(user?.userId, item?.userId)
            const docRef = doc(db, 'rooms', roomId)
            const messagesRef = collection(docRef, 'messages')
            textRef.current = ''
            if (inputRef) inputRef.current.clear()
            const newDoc = await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                username: user?.username,
                profileUrl: user?.profileUrl,
                createdAt: Timestamp.fromDate(new Date())
            })
            // console.log('new message id: ', newDoc.id)
        } catch (error) {
            Alert.alert('Message', error.message)
        }
    }

    // console.log('messages: ', messages);

    return (
        <CustomeKeyboardView inchat={true}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar style='dark' />
                <ChatRoomHeader user={item} router={router} />
                <View style={{ height: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }} />
                <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#F3F4F6', overflow: 'visible' }}>
                    <View style={{ flex: 1 }}>
                        <MessagesList messages={messages} currentUser={user}/>
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
                                ref={inputRef}
                                onChangeText={(value) => textRef.current = value}
                                placeholder='Type Message...'
                                style={{ fontSize: hp(2), flex: 1, marginRight: 8 }}
                            />
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#E5E7EB',
                                    padding: 8,
                                    marginRight: 1,
                                    borderRadius: 100,
                                }}
                                onPress={handleSendMessage}
                            >
                                <Feather name='send' size={hp(2.7)} color='#737373' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </CustomeKeyboardView>
    )
}