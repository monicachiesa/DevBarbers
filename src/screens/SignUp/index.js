import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles'
import BarberLogo from '../../assets/barber.svg' //importa a imagem da barbearia
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import PersonIcon from '../../assets/person.svg';
import LockIcon from '../../assets/lock.svg';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../../contexts/UserContext'

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignIn' }] //leva para a tela de entrar
        });
    }

    const handleSignClick = async () => {
        if (nameField != '' & emailField != '' & passwordField != '') {
        let res = await Api.signUp(nameField, emailField, passwordField); //passa os dados dos campos
        if (res.token) {
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
            alert('Erro: ' +res.error)
        }
        } else {
            alert('Preencha os campos!')
        }
    }


    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <InputArea>
                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t => setNameField(t)} //pega o texto digitado e joga dentro da variável
                />
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t => setEmailField(t)} //pega o texto digitado e joga dentro da variável
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t => setPasswordField(t)} //pega o texto digitado e joga dentro da variável
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}