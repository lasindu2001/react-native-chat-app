import { View, Text, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems';
import { Feather } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

const ios = Platform.OS == 'ios'

export default function HomeHeader() {
    const { user, logout } = useAuth()
    const { top } = useSafeAreaInsets()

    const handleProfile = () => { }

    const handleLogout = async () => {
        await logout()
    }

    return (
        <View style={{
            paddingTop: ios ? top : top + 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            backgroundColor: '#4C51BF',
            paddingBottom: 24,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
        }}>
            <View>
                <Text style={{
                    fontSize: hp(3),
                    fontWeight: '500',
                    color: 'white'
                }}>
                    Chats
                </Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper: {
                            // trigger wrapper styles
                        }
                    }}>
                        <Image
                            style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                            source={user?.profileUrl}
                            placeholder={blurhash}
                            transition={1000}
                        />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuItem
                            text="Profile"
                            action={handleProfile}
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)} color='#737373' />}
                        />
                        <MenuItem
                            text="Sign Out"
                            action={handleLogout}
                            value={null}
                            icon={<AntDesign name="logout" size={hp(2.5)} color='#737373' />}
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}