import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { ChatRoom } from '../../types'
import styles from './styles'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'

export type ChatRoomProps = {
    chatRoom: ChatRoom
}

const ChatListItem = (props: ChatRoomProps) => {
    const { chatRoom } = props
    const user = chatRoom.users[1]
    const navigation = useNavigation()
    const goToChatRoom = ()=>{
        navigation.navigate('ChatRoom' , {id:chatRoom.id , name:user.name})
    }
    return ( 
        <TouchableWithoutFeedback onPress={goToChatRoom}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View>
                        <Image source={{ uri: user.imageUri }} style={styles.img} />
                    </View>
                    <View style={styles.middleMsg}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text> {chatRoom.lastMessage.content}</Text>
                    </View>
                </View>

                <View >
                    <Text style={styles.time}>{moment(chatRoom.lastMessage.createdAt).format('DD/MM/YY')}</Text>
                </View>

            </View>
        </TouchableWithoutFeedback>

    );
}

export default ChatListItem
