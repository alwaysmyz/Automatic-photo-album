import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";



type Props = {};
export default  class  Quality extends Component<Props>{
    static navigationOptions = {
        title: 'Quality',
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
                <Text>照片质量界面</Text>
            </View>
        );
    }
}

const StackQuality = createStackNavigator({
    质量:Quality,
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = StackQuality;