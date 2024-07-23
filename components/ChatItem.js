import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Image } from 'expo-image';
import { blurhash, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ChatItem({ item, index, router, noBorder, currentUser }) {
    const [lastMessage, setLastMessage] = useState(undefined)

    useEffect(() => {
        let roomId = getRoomId(currentUser?.userId, item?.userId)
        const docRef = doc(db, 'rooms', roomId)
        const messagesRef = collection(docRef, 'messages')
        const q = query(messagesRef, orderBy('createdAt', 'desc'))

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map((doc) => {
                return doc.data()
            })
            setLastMessage(allMessages[0] ? allMessages[0] : null)
        })

        return unsub;
    }, [])

    console.log('last message', lastMessage)

    const baseStyle = {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 8,
    };

    const borderStyle = noBorder ? '' : {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
    };

    const openChatRoom = () => {
        router.push({pathname: '/chatRoom', params: item})
    }

    return (
        <TouchableOpacity onPress={openChatRoom} style={{ ...baseStyle, ...borderStyle }}>
            {/* <Image
                source={{uri: item?.profileUrl}}
                style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
            /> */}
            <Image
                style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
                source={item?.profileUrl}
                placeholder={blurhash}
                transition={500}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        fontSize: hp(1.8),
                        fontWeight: '600',
                        color: '#1F2937'
                    }}>
                        {item?.username}
                    </Text>
                    <Text style={{
                        fontSize: hp(1.6),
                        fontWeight: '500',
                        color: '#6B7280'
                    }}>
                        Time
                    </Text>
                </View>
                <Text style={{
                    fontSize: hp(1.6),
                    fontWeight: '500',
                    color: '#6B7280'
                }}>
                    Last Message
                </Text>
            </View>
        </TouchableOpacity>
    )
}