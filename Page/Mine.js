import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";



type Props = {};
export default  class  Mine extends Component<Props>{
    static navigationOptions = {
        title: 'Mine',
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
                <Text>我的界面</Text>
            </View>
        );
    }
}

const StackMine = createStackNavigator({
    质量:Mine,
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = StackMine;