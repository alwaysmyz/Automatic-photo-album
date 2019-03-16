import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View,ScrollView,TouchableOpacity,Image} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import constants from '../constants';
import Swiper from 'react-native-swiper'
import  {DeviceEventEmitter} from 'react-native';
var Dimensions=require('Dimensions');
var screenWidth=Dimensions.get('window').width;
var cols=3;
var cellWH=120;
var vMargin=(screenWidth-cellWH*cols)/(cols+1);
var screenHeight=Dimensions.get('window').height;
var hMargin=15;


type Props = {};
export default  class  Album extends Component<Props>{
    static navigationOptions = {
        title: 'Album',
        tabBarLabel: '照片',
    };
    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('changeResult', (message) => {
            //alert(constants.name.length)
            this.setState({

            })
        });
    }
    componentWillUnmount(){
        DeviceEventEmitter.remove();
    };
    PressButton(data){
        var key=data
        this.props.navigation.navigate('展示',{m:key})

    }
    render () {
        const {navigate} = this.props.navigation;
        var photos = constants.photo;
        var photosView = [];
        var testView=[];
        var names=constants.name
        for (var i = 0; i < constants.photo.length; i++){
            constants.middle[i]=i;
        }
        for (var i = 0; i < constants.photo.length; i++){
            constants.middle1[i]=0;
        }
        for (var i = 0; i < constants.photo.length-1; i++){
            for(var j = i+1;j < constants.photo.length; j++){
                if(constants.name[i]==constants.name[j]){
                    constants.middle[j]=constants.middle[i];
                }
            }
        }
        for (var i = 0; i < constants.photo.length; i++){
            constants.middle1[constants.middle[i]]++;
        }
        constants.count=0;
        for (var i = 0; i < photos.length; i++) {
            testView.push(
                <View style={styles.outViewStyle} key={i}>
                    <TouchableOpacity onPress={this.PressButton.bind(this, i)}>
                        <Image
                            resizeMode="stretch"
                            Image style={styles.imageStyle}
                            source={{uri: photos[i]}}
                        />
                        <Text>
                            {names[i]}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
            if(constants.middle1[i]!=0) {
                constants.count++;
                photosView.push(
                    <View style={styles.outViewStyle} key={i}>
                        <TouchableOpacity onPress={this.PressButton.bind(this, i)}>
                            <Image
                                resizeMode="stretch"
                                Image style={styles.imageStyle}
                                source={{uri: photos[i]}}
                            />
                            <Text>
                                {names[i]}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
        return (

            <ScrollView>
                <View style={styles.container}>
                    {photosView}
                </View>
            </ScrollView>

        );
    }
}
class  Show extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Show',
            title: 'Show',
            headerRight: (
                <Button
                    onPress={navigation.getParam('play')}
                    title={"播放"}
                    backgroundColor="#fff"
                />
            ),
        };
    };

    componentDidMount() {
        const {navigation}=this.props;
        const k=navigation.getParam('m')
        this.props.navigation.setParams({play: this._play.bind(this,k)});
    }

    _play = (x) => {
        var l=x;
        this.props.navigation.navigate('循环播放',{m1:l});
    }

    render(){
        var groupView = [];
        const {navigation}=this.props;
        const u=navigation.getParam('m')
        for(var i = 0; i < constants.photo.length; i++){
            if(constants.middle[i]==constants.middle[u]) {
                groupView.push(<View style={styles.outViewStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={{uri: constants.photo[i]}}
                    />
                    <Text>
                        {constants.name[i]}
                    </Text>
                </View>)

            }
        }
        return(
            <ScrollView>
                <View style={styles.container}>
                    {groupView}
                </View>
            </ScrollView>


        )
    }

}class  Play extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Play',
            title: 'Play',
        };
    };
    render(){
        var playView = [];
        const {navigation}=this.props;
        const u=navigation.getParam('m1')
        for(var i = 0; i < constants.photo.length; i++){
            if(constants.middle[i]==constants.middle[u]) {
                playView.push(
                    <View style={styles.style3}>
                        <Image
                            style={styles.style2}
                            source={{uri: constants.photo[i]}}
                        />
                    </View>
                )
            }
        }
        return(
            <View style={styles.style1}>
                <Swiper style={styles.wrapper}  horizontal={false} autoplay>
                    {playView}
                </Swiper>
            </View>
        )
    }


}
const StackAlbum = createStackNavigator({
    相册:Album,
    展示:Show,
    循环播放:Play,
});

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row'
    },
    container: {

        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    outViewStyle:{
        // 设置侧轴对齐方式
        alignItems: 'center',
        width:cellWH,
        height:cellWH,
        marginLeft: vMargin,
        marginTop: hMargin
    },
    imageStyle:{
        width:90,
        height:90
    },
    style1:{
        flex:1,
    },
    style2:{
        width:cellWH*2.2,
        height:cellWH*2.2,
        alignItems: 'center',
    },
    style3:{
        width:screenWidth*0.9,
        height:screenHeight*0.9,
        alignItems: 'center',
        justifyContent:'center'
    }
});

module.exports = StackAlbum;