import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Preload from '../screens/Preload'; //importando as telas
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from '../stacks/MainTab';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload" //* Define a primeira tela a ser carregada
        screenOptions={{
            headerShown: false
        }}

    >
        <Stack.Screen name="Preload" component={Preload} />{/* tela de carregamento inicial */}
        <Stack.Screen name="SignIn" component={SignIn} />{/* tela de login */}
        <Stack.Screen name="SignUp" component={SignUp} />{/* tela de cadastro */}
        <Stack.Screen name="MainTab" component={MainTab} />{/* tela de MainTab */}
    </Stack.Navigator>
);
