import React, { useEffect, useState } from 'react'
import Stars from '../../components/Stars'
import FavoriteIcon from '../../assets/favorite.svg';

import {
    Container,
    Scroller,
    FakeSwiper,
    PageBody,
    UserInfoArea,
    ServiceArea,
    TestimonialArea,
    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton

} from './styles'
import { Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import Api from '../../Api';
import Swiper from 'react-native-swiper'

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getBarberInfo = async () => {
            setLoading(true);

            let json = await Api.getBarber(userInfo.id);  //envia o id do barbeiro para pegar as infos dele
            if (json.error == '') {
                setUserInfo(json.data); //preenche as infos do barbeiro
            } else {
                alert('Json error: ' + json.error)
            }
            setLoading(false);
        }
        getBarberInfo();
    }, []);

    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper style={{ height: 240 }}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                        autoplay={true}
                    >
                        {userInfo.photos.map((item, key) => (
                            <SwipeItem key={key}>
                                <SwipeImage source={{ uri: item.url }} resizeMode="cover"/>
                            </SwipeItem>
                        ))}
                    </Swiper>
                    :
                    <FakeSwiper></FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                  <UserAvatar source={{ uri: userInfo.avatar }} />
                  <UserInfo>
                      <UserInfoName>{userInfo.name}</UserInfoName>
                      <Stars stars={userInfo.Stars} showNumber={true}/>
                  </UserInfo>
                  <UserFavButton>
                      <FavoriteIcon width="24" height="24" fill = "#FF000"/>
                  </UserFavButton>
                    </UserInfoArea>
                    <ServiceArea>

                    </ServiceArea>
                    <TestimonialArea>

                    </TestimonialArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}