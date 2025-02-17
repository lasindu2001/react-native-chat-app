import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessagesList({ messages, currentUser, scrollViewRef }) {
  return (
    <ScrollView
    ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {messages.map((message, index) => {
        return (
          <MessageItem message={message} key={index} currentUser={currentUser}/>
        )
      })}
    </ScrollView>
  )
}