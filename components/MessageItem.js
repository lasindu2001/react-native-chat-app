import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function MessageItem({ message, currentUser }) {
    if (currentUser?.userId == message?.userId) {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 12,
                marginRight: 12,
            }}>
                <View style={{ width: wp(80) }}>
                    <View style={{
                        flex: 1,
                        alignSelf: 'flex-end',
                        padding: 12,
                        borderRadius: 16,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: '#D1D5DB',
                    }}>
                        <Text style={{ fontSize: hp(1.9) }}>
                            {message?.text}
                        </Text>
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <View style={{
                width: wp(80),
                marginBottom: 12,
                marginLeft: 12,
            }}>
                <View style={{
                    flex: 1,
                    alignSelf: 'flex-start',
                    padding: 12,
                    borderRadius: 16,
                    backgroundColor: '#EBF4FF',
                    borderWidth: 1,
                    borderColor: '#C3DAFE'
                }}>
                    <Text style={{ fontSize: hp(1.9) }}>
                        {message?.text}
                    </Text>
                </View>
            </View>
        )
    }
}