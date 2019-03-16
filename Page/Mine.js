import React, {Component} from 'react';
import {Button, Dimensions, Platform, StyleSheet, Text, View,ScrollView} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import constants from '../constants';
import  {DeviceEventEmitter} from 'react-native';
var {height,width} =  Dimensions.get('window');

type Props = {};
export default  class  Mine extends Component<Props>{
    static navigationOptions =({navigation})=> {
        return {
            title:'Mine',
            tabBarLabel: '照片',
            headerRight: (
                <Button
                    onPress={navigation.getParam('userExit')}
                    title={"退出登录"}
                    backgroundColor="#fff"
                />
            ),}
    };
    componentDidMount() {
        this.props.navigation.setParams({userExit: this._userExit});
        this.listener = DeviceEventEmitter.addListener('changeResult', (message) => {
            this.setState({
            })
        });
    }
    componentWillUnmount(){
        DeviceEventEmitter.remove();
    };
    _userExit = () => {
        alert('exit');
        constants.num=0;
        constants.photo=[];
        constants.name=[];
        constants.confidence=[];
        constants.id=[];
        constants.userName='';
        this.props.navigation.navigate('Login')
    };
    render () {
        const { navigate } = this.props.navigation;
        var username = constants.userName
        if(constants.photo!=null&&constants.photo.length!=0) {
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <Text
                            style={styles.textStyle}
                        >用户名：{username}</Text>
                        <Text
                            style={styles.textStyle}
                        >用户共上传了{constants.photo.length}张图片</Text>
                        <Text
                            style={styles.textStyle}
                        >共生成{constants.count}册不同类别的相册</Text>
                    </View>
                </ScrollView>
            );
        }
        else if(constants.photo==null||constants.photo.length==0){
            return (
                <View style={styles.container}>
                    <Text
                        style={styles.textStyle}
                    >用户名：{username}</Text>
                    <Text
                        style={styles.textStyle}
                    >用户当前未上传图片</Text>
                </View>
            );
        }
    }
}

const StackMine = createStackNavigator({
    质量:Mine,
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    textStyle:{
        fontSize:25,
        height:32,
        backgroundColor: '#dddddd',
        marginBottom:2,
        width:width,
        alignItems:'center',
        justifyContent:'center',
        color:'black',
        borderRadius:10,
    }
});

module.exports = StackMine;