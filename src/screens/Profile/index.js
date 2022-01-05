import React from 'react';
import { Container } from './styles';
import { Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Api from '../../Api'

export default () => {

    const navigation = useNavigation();

    const handleLogoutClick = async () => {
        await Api.logout(); //desvalida token
        navigation.reset({
            routes: [{ name: 'SignIn' }] //envia para a tela de login
        });
    }

    return (
        <Container>
            <Text>Profile</Text>
            <Button title="Sair" onPress={handleLogoutClick} />
        </Container>
    )
}