import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'
import {
    FontAwesome5,
    Entypo,
    Fontisto,
    MaterialCommunityIcons, MaterialIcons,
} from '@expo/vector-icons';

function ChatInput() {
    const [message, setMessage] = useState('');

   const  onMicrophonePress = ()=>{
       console.warn("pressed mic")
   }

   const onSendPress = ()=>{
       console.warn('press sending')
       setMessage('')
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
