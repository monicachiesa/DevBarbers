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
import LockIcon from '../../assets/lock.svg';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../../contexts/UserContext'

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignUp' }] //leva para a tela de cadastro
        });
    }

    const handleSignClick = async () => {
        if (emailField != '' && passwordField != '') {

            let json = await Api.signIn(emailField, passwordField);
            if (json.token) {  //quando tem o token          
             await AsyncStorage.setItem('token', json.token);    // salvar o token no async storage
             userDispatch({
                 type: 'setAvatar',
                 payload: {
                     avatar: json.data.avatar    //salva no context
                 }
             });

            navigation.reset({
            routes:[{name:'MainTab'}]  //leva para a tela inicial
            });

            } else {
                alert('E-mail ou senha incorretos!')
            }

        } else {
            alert('Preencha os campos!');
        }
    }


    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <InputArea>
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
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    )
}