import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, ImageBackground } from 'react-native'
import { useRoute } from '@react-navigation/native'
import ChatMessage from '../components/ChatMessage'
import ChatRoomMsgs from '../assets/Chats'
import bg from '../assets/images/BG.png'
import ChatInput from '../components/ChatInput'
import { Auth, API, graphqlOperation } from "aws-amplify"
import { messagesByChatRoomId } from '../src/graphql/queries'
function ChatRoomScreen() {
    const [chatRoomMessages, setChatRoomMessages] = useState([])
    const route = useRoute()
console.log(route.params)
    useEffect(() => {
        const fetch = async () => {
            const msgs = await API.graphql(graphqlOperation(
                messagesByChatRoomId, {
                chatRoomId: route.params.id,
                sortDirection: "DESC"
            }
            ))
           
            setChatRoomMessages(msgs.data.messagesByChatRoomId.items)
        }
        fetch()
    }, [])



    return (
        <ImageBackground source={bg} style={{ width: '100%', height: '100%' }}>
            <FlatList
                data={chatRoomMessages}
                renderItem={({ item }) => <ChatMessage chatRoomMessage={item} userId={route.params.userId} />}
                keyExtractor={(item) => item.id}
            />
            <ChatInput roomId={route.params.id} />

        </ImageBackground >

    )
}

export default ChatRoomScreen
