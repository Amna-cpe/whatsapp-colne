import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { ChatRoom } from '../../types'
import styles from './styles'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { Auth, API, graphqlOperation } from 'aws-amplify'

export type ChatRoomProps = {
    chatRoom: ChatRoom
}

const ChatListItem = (props: ChatRoomProps) => {
    const { chatRoom } = props
    const [otherUser, setOtherUser] = useState(null);
    const [authUserId , setAuthUserId] = useState(null)



    const navigation = useNavigation()

    useEffect(() => {
        const getOtherUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setAuthUserId( userInfo.attributes.sub)
            if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
                setOtherUser(chatRoom.chatRoomUsers.items[1].user);
            } else {
                setOtherUser(chatRoom.chatRoomUsers.items[0].user);
            }
        }
        getOtherUser();
    }, [])

    const goToChatRoom = () => {
        navigation.navigate('ChatRoom', { id: chatRoom.id, name: otherUser.name, userId: authUserId })
    }

    if (!otherUser) {
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={goToChatRoom}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View>
                        <Image source={{ uri: otherUser.imageUri }} style={styles.img} />
                    </View>
                    <View style={styles.middleMsg}>
                        <Text style={styles.username}>{otherUser.name}</Text>
                        <Text> {chatRoom.lastMessage?.content}</Text>
                    </View>
                </View>

                <View >
                    <Text style={styles.time}>{moment(chatRoom.lastMessage?.createdAt).format('DD/MM/YY')}</Text>
                </View>

            </View>
        </TouchableWithoutFeedback>

    );
}

export default ChatListItem
