import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem'
import ChatRoom from '../assets/ChatRooms'
import { FlatList } from 'react-native-gesture-handler';
import NewMsgBtn from '../components/NewMsgBtn';
export default function ChatsSceen() {
  return (
    <View >
      <FlatList
        data={ChatRoom}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View
          style={{
            height:1,
            width: "90%",
            backgroundColor: "#f0f0f0",
            marginLeft:10,
            marginRight:10          
          }}
        />}
      />
      <NewMsgBtn />

    </View>
  );
}

const styles = StyleSheet.create({


});
