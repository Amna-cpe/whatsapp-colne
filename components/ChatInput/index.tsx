import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'
import {
    FontAwesome5,
    Entypo,
    Fontisto,
    MaterialCommunityIcons, MaterialIcons,
} from '@expo/vector-icons';

import { API, Auth, graphqlOperation } from "aws-amplify"
import { createMessage, updateChatRoom } from "../../src/graphql/mutations"

function ChatInput(props) {
        const { roomId } = props

        const [message, setMessage] = useState('');
        const [myId, setMyId] = useState('');

        useEffect(() => {
            const fetchTheUser = async () => {
                const user = await Auth.currentAuthenticatedUser()
                setMyId(user.attributes.sub)
            }
            fetchTheUser()
        }, [])

        const onMicrophonePress = () => {
            console.warn("pressed mic")
        }
        const updateLastMsg = async (messageId) => {

            try {
                await API.graphql(graphqlOperation(updateChatRoom, {
                    input: {
                        id: roomId,
                        lastMessageId: messageId,
                    }
                }
                ))

            } catch (error) {
                console.log(error)
            }

        }

        const onSendPress = async () => {
            //send the message then update the last message on the db
            try {
                const msg = await API.graphql(graphqlOperation(createMessage, {
                    input: {
                        content: message,
                        userId: myId,
                        chatRoomId: roomId

                    }
                }))
                await updateLastMsg(msg.data.createMessage.id)

                setMessage('')

            } catch (error) {
                console.log(error)
            }

        }

        const onPress = () => {
            if (!message) {
                onMicrophonePress();
            } else {
                onSendPress();
            }
        }


        return (
            <View style={styles.container}>
                <View style={styles.inputContainer} >
                    {/* iemogu */}
                    <FontAwesome5 name="laugh-beam" size={24} color="grey" />
                    {/* input */}
                    <TextInput
                        placeholder={"Type a message"}
                        style={{ flex: 1, marginLeft: 10 }}
                        multiline
                        value={message}
                        onChangeText={setMessage}
                    />


                    {/* attachment */}
                    <Entypo name="attachment" size={22} color="grey" style={styles.icon} />
                    {/* camera */}
                    {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}

                </View>
                <TouchableOpacity onPress={onPress}>
                    <View style={styles.voice}>
                        {!message
                            ? <MaterialCommunityIcons name="microphone" size={28} color="white" />
                            : <MaterialIcons name="send" size={24} color="white" />}
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

export default ChatInput
