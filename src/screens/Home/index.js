import React, {useState } from 'react'

//import Geolocation from '@react-native-community/geolocation'
import * as Location from 'expo-location'
import { Platform } from 'react-native'

import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder
} from './styles'

import { Text } from 'react-native'
import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import { useNavigation } from '@react-navigation/native'

export default () => {

    const navigation = useNavigation();
    const [locationText, setLocationText] = useState('');
    const [localizacao, setLocalizacao] = useState (null)
    const [coords, setCoords] = useState(null); //coordenadas

    const handleLocationFinder = async () => {
        

       
            console.log('permissao...')

            //let { status2 } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);

            let { status } = await Location.requestForegroundPermissionsAsync();

            console.log('status', status)

            if (status !== 'granted') {
                console.log('permissão negada')
                message('Atenção', 'Localização não foi liberada')
            } else {
                console.log('permissão concedida')
                //this.setState({ hasLocationPermissions: true });
            }

            let location = await Location.getCurrentPositionAsync({});
            //console.log('location', JSON.stringify(location))
            //setLocalizacao(JSON.stringify(location));
            setLocalizacao(location);
            console.log("LOCALIZAÇÃOOO", location)
    } 

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>
                        Encontre o seu barbeiro favorito
                    </HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>


                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFF"
                        value={locationText}
                        onChangeText={t => setLocationText(t)} //pega o valor que for digitado
                    /> 
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>



            </Scroller>
        </Container>
    )
}