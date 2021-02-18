import React from 'react'
import { View, Text } from 'react-native'
import { Message } from '../../types'
import moment from 'moment'
import styles from './styles'

export type ChatRoomProps = {
    chatRoomMessage: Message
}



function ChatMessage(props: ChatRoomProps) {

    const { chatRoomMessage } = props
    const isMyMsg = chatRoomMessage.user.id === 'u1'

    return (
        <View  >
            <View style={[styles.msgContainer, {
                backgroundColor: (isMyMsg ? "#e4fcca" : '#fdfefc'),
                marginRight: isMyMsg ? 5 : 50,
                marginLeft: isMyMsg ? 50 : 5,
                borderTopRightRadius: isMyMsg ? 0 : 10,
                borderTopLeftRadius: isMyMsg ? 10 : 0,
            }]}>

                {
                    !isMyMsg && <Text style={styles.msgUser} >{chatRoomMessage.user.name}</Text>
                }
                <Text style={styles.msgContent} >{chatRoomMessage.content}</Text>
                <Text style={styles.msgTime}>{moment(chatRoomMessage.createdAt).format('HH:mm')}</Text>
            </View>
        </View>

    )
}

export default ChatMessage
