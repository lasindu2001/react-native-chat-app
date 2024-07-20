import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import Feather from '@expo/vector-icons/Feather';

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert('Sign Up', "Please fill all the fields")
      return
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style='dark' />
      <View style={{
        paddingTop: hp(8),
        paddingHorizontal: wp(5),
        flex: 1,
        gap: 1
      }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{ height: hp(25) }}
            resizeMode='contain'
            source={require('../assets/images/register.png')}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{
            fontSize: hp(4),
            fontWeight: 'bold',
            letterSpacing: 0.5,
            textAlign: 'center',
            color: '#2D3748',
            marginBottom: 10
          }}>
            Sign Up
          </Text>
          <View style={{ marginBottom: 4 }}>
            <View style={{
              height: hp(7),
              flexDirection: 'row',
              paddingHorizontal: 16,
              backgroundColor: '#f5f5f5',
              alignItems: 'center',
              borderRadius: 12,
              marginBottom: 10
            }}>
              <Feather name="user" size={hp(2.7)} color="gray" style={{ marginRight: 4 }} />
              <TextInput
                onChangeText={value => usernameRef.current = value}
                style={{ fontSize: hp(2), flex: 1, fontWeight: '600', color: '#4A5568' }}
                placeholder='Username'
                placeholderTextColor={'gray'}
              />
            </View>
            <View style={{
              height: hp(7),
              flexDirection: 'row',
              paddingHorizontal: 16,
              backgroundColor: '#f5f5f5',
              alignItems: 'center',
              borderRadius: 12,
              marginBottom: 10
            }}>
              <Octicons name="mail" size={hp(2.7)} color="gray" style={{ marginRight: 4 }} />
              <TextInput
                onChangeText={value => emailRef.current = value}
                style={{ fontSize: hp(2), flex: 1, fontWeight: '600', color: '#4A5568' }}
                placeholder='Email Address'
                placeholderTextColor={'gray'}
              />
            </View>
            <View style={{
              height: hp(7),
              flexDirection: 'row',
              paddingHorizontal: 16,
              backgroundColor: '#f5f5f5',
              alignItems: 'center',
              borderRadius: 12,
              marginBottom: 10
            }}>
              <Octicons name="lock" size={hp(2.7)} color="gray" style={{ marginRight: 4 }} />
              <TextInput
                onChangeText={value => passwordRef.current = value}
                style={{ fontSize: hp(2), flex: 1, fontWeight: '600', color: '#4A5568' }}
                placeholder='Password'
                secureTextEntry
                placeholderTextColor={'gray'}
              />
            </View>
            <View style={{
              height: hp(7),
              flexDirection: 'row',
              paddingHorizontal: 16,
              backgroundColor: '#f5f5f5',
              alignItems: 'center',
              borderRadius: 12,
              marginBottom: 10
            }}>
              <Feather name="image" size={hp(2.7)} color="gray" style={{ marginRight: 4 }} />
              <TextInput
                onChangeText={value => profileRef.current = value}
                style={{ fontSize: hp(2), flex: 1, fontWeight: '600', color: '#4A5568' }}
                placeholder='Profile URL'
                placeholderTextColor={'gray'}
              />
            </View>
          </View>
          <View>
            {loading ? (
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center'
              }}>
                <Loading size={hp(6.5)} />
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  height: hp(6.5),
                  backgroundColor: '#6366F1',
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleRegister}
              >
                <Text style={{
                  fontSize: hp(2.7),
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: hp(1.8),
              fontWeight: '600',
              color: '#6B7280'
            }}>
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push('signIn')}>
              <Text style={{
                fontSize: hp(1.8),
                fontWeight: '900',
                color: '#6366F1'
              }}>
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}