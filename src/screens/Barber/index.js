import React, { useEffect, useState } from "react";
import Stars from "../../components/Stars";
import FavoriteIcon from "../../assets/favorite.svg";
import BackIcon from "../../assets/back.svg";
import NavPrevIcon from "../../assets/nav_prev.svg";
import NavNextIcon from "../../assets/nav_next.svg";
import FavoriteFullIcon from "../../assets/favorite_full.svg";
import BarberModal from "../../components/BarberModal";

import {
  Container,
  Scroller,
  FakeSwiper,
  PageBody,
  UserInfoArea,
  ServiceArea,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
  BackButton,
  LoadingIcon,
  ServiceInfo,
  ServiceItem,
  ServiceName,
  ServicePrice,
  ServiceChooseBtnText,
  ServiceChooseButton,
  ServicesTitle,
  TestimonialArea,
  TestimonialBody,
  TestimonialInfo,
  TestimonialItem,
  TestimonialName,
} from "./styles";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Api from "../../Api";
import Swiper from "react-native-swiper";

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
  });

  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);

      let json = await Api.getBarber(userInfo.id); //envia o id do barbeiro para pegar as infos dele
      if (json.error == '') {
        setUserInfo(json.data); //preenche as infos do barbeiro
        setFavorited(json.data.favorited); //vê se é favorito ou não

// console.log(json.data.available) imprime um array com datas e horários disponíveis na data 
      } else {
        alert("Json error: " + json.error);
      }
      setLoading(false);
    };
    getBarberInfo();
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleFavClick = () => {
    setFavorited(!favorited);

    Api.setFavorite(userInfo.id);
  };

  const handleServiceChoose = (key) => {
    setSelectedService(key); //seleciona o serviço
    setShowModal(true); //mostra o modal
  };

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? (
          <Swiper
            style={{ height: 240 }}
            dot={<SwipeDot />}
            activeDot={<SwipeDotActive />}
            paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
            autoplay={true}
          >
            {userInfo.photos.map((item, key) => (
              <SwipeItem key={key}>
                <SwipeImage source={{ uri: item.url }} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper></FakeSwiper>
        )}
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{ uri: userInfo.avatar }} />
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber={true} />
            </UserInfo>
            <UserFavButton onPress={handleFavClick}>
              {favorited ? (
                <FavoriteFullIcon width="24" height="24" fill="red" />
              ) : (
                <FavoriteIcon width="24" height="24" fill="red" />
              )}
            </UserFavButton>
          </UserInfoArea>
          {loading && <LoadingIcon size="large" color="#000" />}
          {userInfo.services && (
            <ServiceArea>
              <ServicesTitle>Lista de Serviços</ServicesTitle>
              {userInfo.services.map((item, key) => (
                <ServiceItem key={key}>
                  <ServiceInfo>
                    <ServiceName>{item.name}</ServiceName>
                    <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                  </ServiceInfo>
                  <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
                    <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                  </ServiceChooseButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          )}
          {userInfo.testimonials && userInfo.testimonials.length > 0 && (
            <TestimonialArea>
              <Swiper
                style={{ height: 110 }}
                showsPagination={false}
                showsButtons={true}
                prevButton={<NavPrevIcon with="35" height="35" fill="#000" />}
                nextButton={<NavNextIcon with="35" height="35" fill="#000" />}
              >
                {userInfo.testimonials.map((item, key) => (
                  <TestimonialItem key={key}>
                    <TestimonialInfo>
                      <TestimonialName>{item.name}</TestimonialName>
                      <Stars stars={item.rate} showNumber={false} />
                    </TestimonialInfo>
                    <TestimonialBody>{item.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          )}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#FFFFFF" />
      </BackButton>
      <BarberModal show={showModal}
      setShowModal={setShowModal}
      user={userInfo}
      service={selectedService}
      />
    </Container>
  );
};
