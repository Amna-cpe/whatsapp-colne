export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUri
      status
      chatRoomUser {
        items {
          id
          userId
          chatRoomId
          createdAt
          updatedAt
          chatRoom {
            id
            chatRoomUsers {
              items {
                user {
                  id
                  name
                  imageUri
                  status
                }
              }
            }

            lastMessage{
              id 
              content 
              createdAt
              updatedAt
              user {
                id
                name
              }
            }
         
          }
        }
        
      }
      createdAt
      updatedAt
    }
  }
`;