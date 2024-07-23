import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React from 'react'

const ios = Platform.OS == 'ios'

export default function CustomeKeyboardView({ children, inchat }) {
    let keyAvoidViewConfig = {}
    let scrollViewConfig = {}

    if (inchat) {
        keyAvoidViewConfig = {keyboardVerticalOffset: 90}
        scrollViewConfig = {contentContainerStyle: { flex: 1}}
    }
    return (
        <KeyboardAvoidingView
            behavior={ios ? 'padding' : 'height'}
            style={{ flex: 1 }}
            {...keyAvoidViewConfig}
        >
            <ScrollView
                style={{ flex: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                {...scrollViewConfig}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}