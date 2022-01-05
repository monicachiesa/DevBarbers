import React from 'react';
import MainStack from './src/stacks/MainStack'
import UserContextProvider from './src/contexts/UserContext';

//configuração do navigation
import { NavigationContainer } from '@react-navigation/native'

export default () => {
  return (
    <UserContextProvider>{/* Aplicativo recebe as infos do usuário */}
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
    </UserContextProvider>
  );
}