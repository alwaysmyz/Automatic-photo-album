import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer ,createSwitchNavigator} from 'react-navigation';
import api from "./Api";
import {Dimensions} from 'react-native'
import RegisterView from "./RegisterView";
var {height,width} =  Dimensions.get('window');
import TabScreen from './Page/MyNavigators'
import constants from './constants'
var myurl = '';





type Props = {};
class LoginView extends Component<Props> {
    static navigationOptions = {
        header:null,
    };
    constructor(props){
        super(props);
        this.state={
            inputedName:'',
            inputedPW:'',
        };
        this.updatePW=this.updatePW.bind(this);
    }
    login=()=>{
        if(this.state.inputedName===""){
            alert("请输入用户名");
        }else if(this.state.inputedPW===""){
            alert("请输入密码")
        }else {
            api.getUser(this.state.inputedName,this.state.inputedPW).then(res=>{
                if(JSON.parse(res._bodyText).code==1){
                    alert("成功登录");
                    this.onLoginSuccess()
                }else {
                    alert(JSON.parse(res._bodyText).msg)
                    console.log(JSON.parse(res._bodyText));
                }
            })
        }
    }
    onLoginSuccess(){
        constants.userName=this.state.inputedName
        this.props.navigation.navigate('Main')
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
    render() {
        return (
            <View style={styles.container}>
                {/*头像*/}
                <Image source={require('./wx.jpg')} style={styles.iconStyle} />
                {/*账号和密码*/}
                <TextInput placeholder={'请输入用户名'}
                           style={styles.textInputStyle}
                           onChangeText={(newText)=>this.updateName(newText)}/>
                {/*<Text>输入的用户名为：{this.state.inputedName}</Text>*/}
                <TextInput placeholder={'请输入密码'}
                           secureTextEntry={true}
                           style={styles.textInputStyle}
                           onChangeText={(newText)=>this.updatePW(newText)}/>
                {/*<Text>输入的密码为：{this.state.inputedPW}</Text>*/}
                {/*登录按钮*/}
                <View style={styles.loginBtnStyle}>
                    <Button color={'#1E90FF'}
                            title={'登录'}
                        /*onPress={() => this.props.navigation.navigate('Main')*/
                            onPress={() => this.login()}/>
                </View>
                {/*设置*/}
                <View style={styles.settingStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('注册')}>
                        <Text style={styles.textStyle} >新用户</Text>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}

class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };// Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}


const LoginStack = createStackNavigator({
        登录:LoginView,
        注册:RegisterView,
    }
);



const Chu=createAppContainer(createSwitchNavigator(
    {
        Login:LoginStack,
        Main:TabScreen
    },
    {
        initialRouteName:'Login'
    }
));
//const App=createAppContainer(LoginStack);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a7dcff',
        //设置侧轴的对齐方式
        alignItems: 'center',
        width:width
    },
    iconStyle:{
        marginTop:120,
        marginBottom:30,
        width:80,
        height:80,
        borderRadius:40,
        borderWidth: 1,
        borderColor:'white'
    },
    textInputStyle:{
        height:38,
        backgroundColor: 'white',
        marginBottom:1,
        textAlign:'center',
        width:width

    },
    loginBtnStyle:{
        height:35,
        backgroundColor:'#1E90FF',
        marginTop: 20,
        marginBottom:20,
        justifyContent: 'center',
        alignItems: 'center',
        width:width
    },
    settingStyle:{
        //设置主轴方向
        flexDirection: 'row',
        width:width,
        justifyContent:'flex-end',
        color:'purple'
    },
    textStyle:{
        color:'#1E90FF',
    }
});

module.exports=Chu;