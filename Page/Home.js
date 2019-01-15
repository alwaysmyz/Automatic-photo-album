import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";


type Props = {};
export default  class  Home extends Component<Props>{
    static navigationOptions = {
        title: 'Photo',
        tabBarLabel: '照片',
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="选择"
                backgroundColor="#fff"
            />
        ),
    };
    render () {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>照片界面</Text>
            </View>
        );
    }
}

const HomeStack = createStackNavigator({
    照片:Home,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = HomeStack;