import React from 'react';
import {Platform, Button, AlertIOS, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator, createAppContainer,createStackNavigator} from 'react-navigation';

import HomeScreen from './Home';
import AlbumScreen from './Album';

import MineScreen from './Mine';

const TabNavigator = createBottomTabNavigator({
    照片:HomeScreen,
    相册:AlbumScreen,
    我的:MineScreen
});

export default createAppContainer(TabNavigator);