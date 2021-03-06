import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem'
import { FlatList } from 'react-native-gesture-handler';
import NewMsgBtn from '../components/NewMsgBtn';
import { getUser } from "./queries"
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { onUpdateChatRoom } from '../src/graphql/subscriptions'

export default function ChatsSceen() {
  const [chatRooms, setChatRooms] = React.useState([])
  const [UpdateOnChatRoomNewMsg,setUpdateOnChatRoomNewMsg] = React.useState(false)

  React.useEffect(() => {
    const fetchChatRooms = async () => {

      try {

        const AuthUser = await Auth.currentAuthenticatedUser()
        const userInfo = await API.graphql(graphqlOperation(getUser, { id: AuthUser.attributes.sub }))
        setChatRooms(userInfo.data.getUser.chatRoomUser.items)
     
      } catch (error) {
        console.log(error)
      }

    }
    fetchChatRooms()
  }, [UpdateOnChatRoomNewMsg])

  React.useEffect(() => {
    const SubToMsgsChange = API.graphql(graphqlOperation(onUpdateChatRoom))
        .subscribe({
            next: (data) => {
              setUpdateOnChatRoomNewMsg(prev=>!prev)
            }
        })

    return () => SubToMsgsChange.unsubscribe()

}, [])


  return (
    <View style={{position:'relative',height:'100%',width:'100%'}}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View
          style={{
            height: 1,
            width: "90%",
            backgroundColor: "#f0f0f0",
            marginLeft: 10,
            marginRight: 10
          }}
        />}
      />
      <NewMsgBtn />

    </View>
  );
}

const styles = StyleSheet.create({


});
