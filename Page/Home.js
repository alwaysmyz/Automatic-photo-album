import React, {Component} from 'react';
import {Platform,
    View, Text, StyleSheet, ScrollView, Alert,
    Image, TouchableOpacity, NativeModules, Button
} from 'react-native';
import {createStackNavigator, createAppContainer } from "react-navigation";
import {TfImageRecognition} from 'react-native-tensorflow';
import constants from '../constants';
import Swiper from 'react-native-swiper'
import  {DeviceEventEmitter} from 'react-native';
import api from "../Api";
var Dimensions=require('Dimensions');
var screenWidth=Dimensions.get('window').width;
var screenHeight=Dimensions.get('window').height;
var cols=3;
var cellWH=120;
var vMargin=(screenWidth-cellWH*cols)/(cols+1);
var hMargin=15;
var ImagePicker = NativeModules.ImageCropPicker;
type Props = {};
var id=[];
export default  class  Home extends Component<Props> {
    constructor() {
        super();
        /* this.image=require('../assets/dumbbell.jpg');*/
        this.state = {
            image: null,
            images: null,
            photos: null,
            result:""
        };
        /*try{
            this.classifier=new TfImageRecognition({
                model:require('../assets/tensorflow_inception_graph.pb'),
                labels:require('../assets/tensorflow_labels.txt')
            })
        }catch (err) {
            alert(err)

        }*/

    }
    static navigationOptions = ({navigation}) => {
        return {
            tabBarLabel: '照片',
            headerRight: (
                <Button
                    onPress={
                        navigation.getParam('pickMultiple')
                    }
                    title={"相册导入"}
                    backgroundColor="#fff"
                />
            ),
            headerLeft: (
                <Button
                    onPress={navigation.getParam('pickSingleWithCamera')
                    }
                    title={"相机导入"}
                    backgroundColor="#fff"
                />
            ),

        };
    };



    componentDidMount() {
        this.props.navigation.setParams({pickMultiple: this._pickMultiple});
        this.props.navigation.setParams({pickSingleWithCamera: this._pickSingleWithCamera});
        this.props.navigation.setParams({startEmit: this._startEmit});
        /*this.recognizeImage()*/
        // this.starTimer=setInterval(()=>{
        //    this._upload()
        //     console.log('1')
        //     console.log(constants.data)
        // },1000);
    }
    _upload=()=>{
        api.upload(constants.userName,constants.photo.length,constants.count,constants.data).then(res=>{
            //     api.upload(constants.userName,constants.photo.length,constants.count).then(res=>{
            console.log(constants.data)
            console.log(JSON.parse(res._bodyText).code)
            if(JSON.parse(res._bodyText).code==0){
                alert(JSON.parse(res._bodyText).msg)
            }
        })
    }
    async recognizeImage(imagePath){
        const text='tensorflow_labels.txt'
        const graph='tensorflow_inception_graph.pb'
        try {
            const tfImageRecognition=new TfImageRecognition({
                // model:require('../assets/tensorflow_inception_graph.pb'),
                // labels:require('../assets/tensorflow_labels.txt')
                model: graph,
                labels:text,
            })
            const results=await tfImageRecognition.recognize({
                image:imagePath
            })
            // name.push(`Name:${results[0].name}-Confidence:${results[0].confidence}`)
            constants.name.push(`${results[0].name}`)
            this.setState({name:constants.name})
            await tfImageRecognition.close()
        }catch (err) {
        }
    }
    /*async classifyImage(imagePath){
        try{
            const result =await this.classifier.recognize({
                image:imagePath,

            })
            const resultObj={
                name:'Name:'+result[0].name,
                confidence:'Confidence'+result[0].confidence
            }
            this.setState(resultObj)
           /!* this.setState({
                name:'Name:'+result[0].name,
                confidence:'Confidence'+result[0].confidence
            })*!/
            await this.classifier.close()
        }catch (err) {
            alert(err)

        }
    }*/
    /*componentWillUnmount(){
        this.classifier.close()
    }*/
    _pickSingleWithCamera=()=> {
        ImagePicker.openCamera({
            width: 500,
            height: 500,
            includeExif: true,
        }).then(image => {
            constants.photo.push(image.path)
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height},
                images: null,
                photos:constants.photo,

            })
            this.recognizeImage(image.path)
        }).catch(e => alert(e));
    }
    _startEmit=()=> {
        //准备值，发监听
        const message = '监听';
        DeviceEventEmitter.emit('changeResult', message);
    }
    _pickMultiple = () => {
        // var photo=[];
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 3000,
        }).then(images => {
            this.setState({
                image: null,
                images: images.map(i => {
                    var identity=(Platform.OS=='ios')?i.localIdentifier:i.path
                    for(var m=0;m<constants.photo.length;m++) {
                        if (id[m] == identity) {
                            alert('repeat')
                            break;
                        }
                    }
                    if(m>=constants.photo.length){
                        constants.photo.push(i.path)
                        id.push(identity)
                        this.recognizeImage(i.path)
                    }
                    // constants.photo.push(i.path)
                    // id.push(identity)
                    // this.recognizeImage(i.path)


                    return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                }),

            });
            this.setState({
                    photos: constants.photo
                }
            )
            this._upload()
        }).catch(e => alert(e));
    }
    PressButton(data){
        var key=data
        this.props.navigation.navigate('放大',{m:key})

    }
    render() {

        const {navigate} = this.props.navigation;
        var photos = this.state.photos || [];
        var photosView = [];
        var testView = [];
        var names=this.state.name||[]
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
                    </TouchableOpacity>
                </View>
            )
            if(constants.middle1[i]!=0) {
                constants.data[constants.count]=[constants.name[i],constants.middle1[i]]
                // constants.data[constants.count]=constants.name[i]
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
        this._upload()
        this._startEmit()
        return (

            <ScrollView>
                <View style={styles.container}>
                    {testView}
                </View>
            </ScrollView>

        );
    }
}

class  Max extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '放大',
            title: 'Max',
            headerRight: (
                <Button
                    onPress={navigation.getParam('play1')}
                    title={"播放"}
                    backgroundColor="#fff"
                />
            ),
        };
    };

    componentDidMount() {
        const {navigation}=this.props;
        const k=navigation.getParam('m')
        this.props.navigation.setParams({play1: this._play.bind(this,k)});
    }

    _play = (x) => {
        var l=x;
        this.props.navigation.navigate('循环播放1',{m1:l});
    }

    render(){
        var groupView = [];
        const {navigation}=this.props;
        const u=navigation.getParam('m')
        for(var i = 0; i < constants.photo.length; i++){
            if(i==u) {
                groupView.push(<View style={styles.style3}>
                    <Image
                        style={styles.style2}
                        source={{uri: constants.photo[i]}}
                    />
                </View>)

            }
        }
        return(
            <ScrollView>
                <View style={styles.style1}>
                    {groupView}
                </View>
            </ScrollView>


        )
    }

}
class  Play1 extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '播放',
            title: 'Play1',
        };
    };
    render(){
        var playView = [];
        const {navigation}=this.props;
        const u=navigation.getParam('m1')
        var j=0;
        for(var i = u; ; i++){
            if(j<constants.photo.length) {
                if(i==constants.photo.length) {i=0}
                playView.push(
                    <View style={styles.style3}>
                        <Image
                            style={styles.style2}
                            source={{uri: constants.photo[i]}}
                        />
                    </View>
                )
            }
            else{
                break;
            }
            j++;
        }
        return(
            <View style={styles.style1}>
                <Swiper style={styles.wrapper}  horizontal={false} >
                    {playView}
                </Swiper>
            </View>
        )
    }


}

const HomeStack = createStackNavigator({
    照片:Home,
    循环播放1:Play1,
    放大:Max,
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
        height:cellWH*3.5,
        alignItems: 'center',
    },
    style3:{
        width:screenWidth*0.9,
        height:screenHeight*0.9,
        alignItems: 'center',
        justifyContent:'center'
    }
});

module.exports = HomeStack;