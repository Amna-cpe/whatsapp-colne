import React from 'react'
import { View , Text ,FlatList ,ImageBackground } from 'react-native'
import {useRoute} from '@react-navigation/native'
import ChatMessage from '../components/ChatMessage'
import ChatRoomMsgs from '../assets/Chats'
import bg from '../assets/images/BG.png'
import ChatInput from '../components/ChatInput'

function ChatRoomScreen() {

    const route = useRoute()
    console.log(route.params)
    return (
        <ImageBackground source={bg} style={{width:'100%' , height:'100%'}}>
            <FlatList
            data={ChatRoomMsgs.messages}
            renderItem={({ item })=><ChatMessage chatRoomMessage={item} />}
            keyExtractor={(item)=>item.id}
            />
            <ChatInput/>
          
        </ImageBackground >
    
    )
}

export default ChatRoomScreen
