import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import * as actionTypes from '../../actionTypes/index'
import Spinkit from 'react-native-spinkit'
import {
    Linking,
    ImageBackground,
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar
} from 'react-native'
import { Button } from 'native-base'

const window01 = Dimensions.get('window')
const ImageWidth = window01.width
const ImageHeight = window01.height

class Initialization extends Component {
    constructor(props) {
        super(props)
        this.linkDownload = this.linkDownload.bind(this)
    }
    componentDidMount() {
        this.props.start()
    }
    //
    // componentDidMount() {
    //     this.props.start()
    //     // Add listener for push notifications
    //     PushNotificationIOS.addEventListener('notification', this._onNotification);
    //     // Add listener for local notifications
    //     PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);
    //     // Add listener for deviceToken registered
    //     PushNotificationIOS.addEventListener('register', this._register);
    // }
    //
    //
    // //界面即将消失时 注销监听事件
    // componentWillUnmount() {
    //     // Remove listener for notifications
    //     PushNotificationIOS.removeEventListener('notification', this._onNotification);
    //     PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification);
    //     PushNotificationIOS.removeEventListener('register', this._register);
    // }
    //
    //
    //
    // //receive remote notification
    // _onNotification(notification) {
    //
    // }
    // //receive local notification
    // _onLocalNotification(notification){
    //
    // }
    // //获取device token
    // _register(deviceToken) {
    //     //使用window保存下devicetoken
    //     window.iOSDeviceToken = deviceToken;
    //     console.log("deviceToken",deviceToken)
    // }


    linkDownload(url) {
        if(url){
            Linking.canOpenURL(url).then(supported => {
                // console.log('supported',supported)
                if (!supported) {
                    // console.log('Can\'t handle url: ' + url)
                } else {
                    return Linking.openURL(url)
                }
            }).catch(err => console.log('An error occurred', err))
        }
    }

    render() {
        // console.log('this.props', this.props)
        const { initializationReducer: { data, initAPP } } = this.props
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <ImageBackground source={require('../../images/init_back.png')} style={styles.image}>
                    {initAPP.isResultStatus == 1 && <Spinkit type={'Wave'}
                                                             color='rgba(255,255,255,0.5)'
                                                             size={70}
                                                             style={{ marginBottom: 50, alignSelf: 'center' }}
                                                             isVisible={initAPP.isResultStatus == 1} />}
                    {((initAPP.isResultStatus == 4 || initAPP.isResultStatus == 3) && initAPP.currentStep == 2) &&
                    <Button block onPress={()=>this.props.validateVersion(data)} style={styles.button}>
                        <Text style={styles.buttonTiltle}>重新获取版本号</Text>
                    </Button>}
                    {((initAPP.isResultStatus == 2) && data.version.force_update == 1) &&
                    <Button block onPress={() => this.linkDownload(data.version.url)} style={styles.button}>
                        <Text style={styles.buttonTiltle}>立即更新</Text>
                    </Button>}
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: ImageWidth,
        height: ImageHeight,
        justifyContent: "flex-end"
    },
    buttonTiltle: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.4)'
    },
    button: {
        marginBottom: 30,
        width: window01.width / 4 * 3,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 25,
        alignSelf: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        initializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    validateVersion: param => {
        dispatch({type:actionTypes.initializationType.init_app_waiting})
        dispatch(actions.initializationAction.validateVersion(param))
    },
    loadUniqueID: () => {
        dispatch(actions.initializationAction.loadUniqueID())
    },
    start: () => {
        dispatch(actions.initializationAction.start())

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Initialization)
