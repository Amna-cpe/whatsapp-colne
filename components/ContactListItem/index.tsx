import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { User } from '../../types'
import styles from './styles'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'

export type ContsctItemProps = {
    user: User
}

const ContactListItem = (props: ContsctItemProps) => {
    const { user } = props
  
    const navigation = useNavigation()
    const goToChatRoom = ()=>{
        // navigation.navigate('ChatRoom' , {id:chatRoom.id , name:user.name})
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
