import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import {} from '@react-navigation/native'


import HomePage from '../pages/home/home';
import EpisodePage from '../pages/episode/episode';
import CharacterPage from '../pages/character/character';


const Stack = createNativeStackNavigator();
export default class NavigationControl extends Component {
    render() {
        return (
            <NavigationContainer >
                <Stack.Navigator >
                    <Stack.Screen name="Rick and Morty" component={HomePage} navigationKey="Home"/> 
                    <Stack.Screen name="Episode" component={EpisodePage} navigationKey="Episode"/>
                    <Stack.Screen name="Character" component={CharacterPage} navigationKey="Character"/>
                </Stack.Navigator>
            </NavigationContainer>

        )
    }
}