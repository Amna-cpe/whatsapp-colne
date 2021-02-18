export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Contacts:undefined;
  ChatRoom:undefined;
};

export type MainTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Calls:undefined;
  Status:undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Message = {
  id:String;
  content:String;
  createdAt:String;  
  user:User
}

export type User = {
  id:String;
  name:String;
  imageUri:String;
}

export type ChatRoom = {
  id:String;
  users:User[];
  lastMessage:Message
}

