import React from 'react'
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
flex: 1;
background-color: #FFFFFF;
`;

export const Scroller = styled.ScrollView`
flex: 1; 

`;

export const SwipeDot = styled.View`
width: 10px;
height: 10px;
background-color: #FFFFFF;
border-radius: 5px;
margin: 3px;
`;

export const SwipeDotActive = styled.View`
width: 10px;
height: 10px;
background-color: #000000;
border-radius: 5px;
margin: 3px;

`;

export const SwipeItem = styled.View`
flex: 1;
background-color: #63c2D1;
`;

export const SwipeImage = styled.Image`
width: 100%;
height: 240px;

`;

export const FakeSwiper = styled.View`

`;

export const PageBody = styled.View`
background-color: #FFF;
border-top-left-radius: 50px;
margin-top: -50px;
`;

export const UserInfoArea = styled.View`
flex-direction: row;

`;

export const UserAvatar = styled.Image`
width: 110px;
height: 110px;
border-radius: 20px;
margin-left: 30px;
margin-right: 20px;
border-width: 4px;
border-color: #FFFFFF;
`;

export const UserInfoName = styled.Text`
color: #FFF;
font-size: 18px;
font-weight: bold;
margin-bottom: 10px;
`;

export const UserFavButton = styled.TouchableOpacity`
width: 40px;
height: 40px;
background-color: #FFF;
border: 2px solid #999999;
border-radius: 20px;
justify-content: center;
align-items: center;
`;

export const ServiceArea = styled.View`

`;

export const TestimonialArea = styled.View`

`;

