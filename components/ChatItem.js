import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';

export default function ChatItem({ item, index, router, noBorder }) {
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

    return (
        <TouchableOpacity style={{ ...baseStyle, ...borderStyle }}>
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