import React from 'react';
import {Platform, Button, AlertIOS, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator, createAppContainer,createStackNavigator} from 'react-navigation';

import Tab from './MyNavigators'

export default class MyTab extends Component<Props>{
    static navigationOptions = {
        header:null,
    };
    render() {
        return (
            <Tab />
        );
    }
}
