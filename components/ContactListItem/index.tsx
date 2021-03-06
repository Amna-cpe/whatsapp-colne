import React, { useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { User } from '../../types'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { createChatRoomUser, createChatRoom } from "../../src/graphql/mutations"


export type ContsctItemProps = {
    user: User
}

const ContactListItem = (props: ContsctItemProps) => {
    const { user } = props
    const navigation = useNavigation()
    const [authUserID, setauthUserID] = useState('')

    const goToChatRoom = async () => {
        try {
            // create chat room
            const newRoom = await API.graphql(graphqlOperation(createChatRoom, {
                input: {
                    lastMessageId: "zz753fca-e8c3-473b-8e85-b14196e84e16"
                }
            }));
            const roomId = newRoom.data.createChatRoom.id
            
            // add the other user
            if (newRoom.data.createChatRoom) {

                await API.graphql(graphqlOperation(createChatRoomUser, {
                    input: {
                        userId: user.id,
                        chatRoomId: roomId
                    }
                }))
            }
            // add the auth user
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true })
            setauthUserID(authUser.attributes.sub)
            await API.graphql(graphqlOperation(createChatRoomUser, {
                input: {
                    userId: authUser.attributes.sub,
                    chatRoomId: roomId
                }
            }))

            navigation.navigate('ChatRoom', { id: roomId, name: 'amna', userId: authUserID })
        } catch (error) {
            console.log(error)
        }
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
                        <Text> {user.status}</Text>
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>

    );
}

export default ContactListItem
