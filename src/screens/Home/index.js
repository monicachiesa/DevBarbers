import React, { useState, useEffect } from 'react'

//import Geolocation from '@react-native-community/geolocation'
import * as Location from 'expo-location'
import { Platform, RefreshControl } from 'react-native'
import Api from '../../Api'


import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,

    ListArea
} from './styles'

import { Text } from 'react-native'
import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import { useNavigation } from '@react-navigation/native'

import BarberItem from '../../components/BarberItem'

export default () => {

    const navigation = useNavigation();
    const [locationText, setLocationText] = useState('');
    const [localizacao, setLocalizacao] = useState(null)
    const [coords, setCoords] = useState(null); //coordenadas
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);  //lista de barbeiros
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder = async () => {
        setCoords(null);

        console.log('permissão...')

        //let { status2 } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);

        let { status } = await Location.requestForegroundPermissionsAsync();

        console.log('status', status)

        if (status !== 'granted') {
            console.log('permissão negada')
            message('Atenção', 'Localização não foi liberada')
        } else {
            console.log('permissão concedida')
            setLoading(true);
            setLocationText('');
            setList([]);

            let location = await Location.getCurrentPositionAsync({});

            setLocalizacao(location);
            setCoords(location.coords);
            getBarbers();  //procura pelos barbeiros disponíveis
            console.log("LOCALIZAÇÃOOO", location)

        }
    }

    const getBarbers = async () => {  //pega os barbeiros da localização
        setLoading(true);
        setList([]);

        let lat = null;
        let lng = null;

        if (coords) {
            lat = coords.latitude;  //pega a localização
            lng = coords.longitude; //pega a localização
        }

        let res = await Api.getBarbers(lat, lng, locationText);
        if (res.error == '') {

            if (res.loc) {  //pega a lista de barbeiros de SP
                setLocationText(res.loc);
            }

            setList(res.data);
        } else {
            alert('Erro:', + res.error);
        }

        setLoading(false);
    }

    useEffect(() => {
        getBarbers();
    }, []);

    const onRefresh = () => {  //quando puxar a tela pra baixo, atualiza
        setRefreshing(false);
        getBarbers();
    }

const handleLocationSearch = () => {
    setCoords({});
    getBarbers();

}

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />  //quando puxar a tela pra baixo, atualiza
            }>
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
                        onEndEditing={handleLocationSearch}  //quando der um "enter"
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>
                {loading &&
                    <LoadingIcon size="large" color="#FFF" />
                }

                <ListArea>
                    {list.map((item, k) => (
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    )
}