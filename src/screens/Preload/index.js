import React, { useEffect, useContext } from 'react'
import { Container, LoadingIcon } from './styles'
import BarberLogo from '../../assets/barber.svg' //importa a imagem da barbearia
import { useNavigation } from '@react-navigation/native'
import Api from '../../Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../../contexts/UserContext'

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token) { //valida token, se encontrou
            let res = await Api.checkToken(token);
            if(res.token) {
                await AsyncStorage.setItem('token', res.token);    // salvar o token no async storage
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: res.data.avatar    //salva no context
                    }
                });
    
               navigation.reset({
               routes:[{name:'MainTab'}]  //leva para a tela inicial
               });
            } else {
                navigation.navigate('SignIn')  //se não deu certo vai para a tela de login
            }
            } else {
              navigation.navigate('SignIn')  //vai pra tela de login
            }
        }
        checkToken(); //vai tentar pegar o token salvo no aplicativo
    }, []);

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    )
}