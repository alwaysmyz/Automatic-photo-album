import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TextInput,Button,Alert} from 'react-native';
import api from "./Api";

import {Dimensions} from 'react-native'
var {height,width} =  Dimensions.get('window');

const onButtonPress = () => {
    Alert.alert('注册成功');
};

type Props = {};
export default class RegisterView extends Component<Props> {
    static navigationOptions = {
        title:'注册'
    };
    constructor(props){
        super(props);
        this.state={
            inputedName:'',
            inputedPW:'',
            inputedPW2:''
        };
        this.updatePW=this.updatePW.bind(this);
    }

    updateName(newText){
        this.setState((state)=>{
            return{
                inputedName:newText,
            };
        });
    }
    updatePW(newText){
        this.setState(()=>{
            return{
                inputedPW:newText,
            };
        });
    }
    updatePW2(newText){
        this.setState(()=>{
            return{
                inputedPW2:newText,
            };
        });
    }
    signup = () => {
        if (this.state.inputedName === "") {
            alert("请输入用户名!!");
        } else if (this.state.inputedPW === "") {
            alert("请输入密码 !!");
        } else if (this.state.inputedPW2 === "") {
            alert("请再次输入密码!!");
        } else {
            if (this.state.inputedPW === this.state.inputedPW2) {
                api.createUser(this.state.inputedName, this.state.inputedPW).then(res => {
                    if (JSON.parse(res._bodyText).code==1) {
                        alert("成功注册!!");
                    } else {
                        alert(JSON.parse(res._bodyText).msg);
                        console.log(JSON.parse(res._bodyText));
                    }

                });
            } else {
                alert("两次密码不一致!!");
            }
        }
    };
    render() {
        return (
            <View style={styles.container}>
                {/*用户名*/}
                <View style={styles.settingStyle}>
                    <Text style={styles.textStyle}>用户名</Text>
                    <TextInput
                        placeholder={'请输入用户名'}
                        style={styles.textInputStyle}
                        onChangeText={(newText)=>this.updateName(newText)}
                    />
                </View>
                {/*<Text>输入的用户名是：{this.state.inputedName}</Text>*/}
                <View style={styles.settingStyle2}>
                    <Text style={styles.textStyle}>密码</Text>
                    <TextInput
                        placeholder={'请输入密码'}
                        style={styles.textInputStyle}
                        secureTextEntry={true}
                        onChangeText={(newText)=>this.updatePW(newText)}
                    />
                </View>
                {/*<Text>输入的密码是：{this.state.inputedPW}</Text>*/}
                <View style={styles.settingStyle2}>
                    <Text style={styles.textStyle}>确认密码</Text>
                    <TextInput
                        placeholder={'请确认密码'}
                        style={styles.textInputStyle}
                        secureTextEntry={true}
                        onChangeText={(newText)=>this.updatePW2(newText)}
                    />
                </View>
                {/*<Text>输入的密码是：{this.state.inputedPW2}</Text>*/}
                <View style={styles.loginBtnStyle}>
                    <Button
                        color={'#1E90FF'}
                        title={'注册'}
                        onPress={()=>this.signup()}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a7dcff',
        //设置侧轴的对齐方式
        alignItems: 'center',
        width:width
    },
    textInputStyle:{
        height:38,
        backgroundColor: 'white',
        marginBottom:1,
        textAlign:'center',
        width:width-80,
        fontSize: 15
    },
    loginBtnStyle:{
        height:35,
        backgroundColor:'#1E90FF',
        marginTop: 20,
        marginBottom:20,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight:'bold',
        width:width
    },
    settingStyle:{
        marginTop:120,
        //设置主轴方向
        flexDirection: 'row',
        width:width,
        alignItems:'center',
        justifyContent:'space-between'
    },
    settingStyle2:{
        marginTop:5,
        //设置主轴方向
        flexDirection: 'row',
        width:width,
        alignItems:'center',
        justifyContent:'space-between'
    },
    textStyle:{
        width:80,
        color:'#1E90FF',
        fontSize:18,
    }
});



module.exports=RegisterView;