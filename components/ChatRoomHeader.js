import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Image } from 'expo-image'

export default function ChatRoomHeader({ user, router }) {
    return (
        <Stack.Screen
            options={{
                title: '',
                headerShadowVisible: false,
                headerLeft: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Entypo name='chevron-left' size={hp(4)} color='#737373' />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={user?.profileUrl}
                                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
                            />
                            <Text style={{ fontSize: hp(2.5), color: '#374151', fontWeight: '500', marginLeft: 12 }}>
                                {user?.username}
                            </Text>
                        </View>
                    </View>
                ),
                headerRight: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                        <Ionicons name='call' size={hp(2.8)} color={'#737373'} style={{marginRight: 16}}/>
                        <Ionicons name='videocam' size={hp(2.8)} color={'#737373'}/>
                    </View>
                )
            }}
        />
    )
}