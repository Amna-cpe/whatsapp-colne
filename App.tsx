import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';


import Amplify from 'aws-amplify'
import config from './src/aws-exports'
Amplify.configure(config)

import { withAuthenticator } from 'aws-amplify-react-native'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { getUser } from './src/graphql/queries'
import { createUser } from "./src/graphql/mutations"

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
]

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }

  useEffect(() => {
    const fetchUser = async () => {
      // get the authenticated user from COGNITO pool
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })

      // IF USER IS REGISTEF
      if (userInfo) {
        // get the user with user SUB
  
        const userDB = await API.graphql(
          graphqlOperation(getUser, {
            id: userInfo.attributes.sub,
          })
        )
        if (userDB.data.getUser) {
          console.log("user alredy there")
          return;
        }
        // if no user in DB then create one
        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: 'Hey, I am using WhatsApp',
        }

        await API.graphql(graphqlOperation(createUser, { input: newUser }))


      }

    }

    fetchUser()

  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App)