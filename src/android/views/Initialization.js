import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as InitializationAction from '../../actions/InitializationAction'
import { Actions } from 'react-native-router-flux'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import {
    Linking,
    ToastAndroid,
    Platform,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    StatusBar
} from 'react-native'
import XGPush from 'react-native-xinge-push';
import { Button } from 'native-base'

const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.width / 9 * 16
class Initialization extends Component {
    constructor(props) {
        super(props)
        this.linkDownload = this.linkDownload.bind(this)
        this.validateToken = this.validateToken.bind(this)
        this.getAppLastVersion = this.getAppLastVersion.bind(this)
        this._getInitialNotification = this._getInitialNotification.bind(this)
        this.initPush()
    }

    async initPush() {
        let accessId;
        let accessKey;
        if (Platform.OS === 'ios') {
            accessId = 2100267013; // 请将1111111111修改为APP的AccessId，10位数字
            accessKey = "A7XR278C4CTR"; // 请将YOUR_ACCESS_KEY修改为APP的AccessKey
        } else {
            accessId = 2100267013;
            accessKey = "A7XR278C4CTR";
        }
        // 初始化
        XGPush.init(accessId, accessKey);

        // 注册
        XGPush.register('jeepeng')
            .then(result => {
                // do something
                // 或者在 onRegister 里处理，效果一样
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        // localStorage.removeKey(localStorageKey.USER)
        XGPush.addEventListener('message', this._onMessage);
        XGPush.addEventListener('notification', this._onNotification);
        this.getAppLastVersion()

    }

    /**
 * 透传消息到达
 * @param message
 * @private
 */
    _onMessage(message) {
        console.log('收到透传消息: ' + message.content);
        // alert('收到透传消息: ' + message.content);
    }

    /**
     * 通知到达
     * @param notification
     * @private
     */
    _onNotification(notification) {
        if (notification.clicked === true) {
            console.log('app处于后台时收到通知' + JSON.stringify(notification));
            alert('app处于后台时收到通知' + JSON.stringify(notification));
        } else {
            console.log('app处于前台时收到通知' + JSON.stringify(notification));
            alert('app处于前台时收到通知' + JSON.stringify(notification));
        }
    }


    /**
   * 获取初始通知（点击通知后）
   * @private
   */
    _getInitialNotification() {
        XGPush.getInitialNotification().then((result) => {
            alert(JSON.stringify(result));
        });
    }


    getAppLastVersion() {
        this.props.initApp({
            optionalParam: {
                app: 0,
                type: 1
            }
        }, 1, 1)
    }

    validateToken() {
        this.props.validateToken()
    }

    linkDownload(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url)
            } else {
                return Linking.openURL(url)
            }
        }).catch(err => console.error('An error occurred', err))
    }

    componentWillReceiveProps(nextProps) {
        const { initAPP, loadLocalStorage, validateToken, validateVersion, getDriverId } = nextProps.InitializationReducer
        if (initAPP.step == 1) {
            if (validateVersion.isResultStatus == 3) {
                ToastAndroid.showWithGravity(`${validateVersion.errorMsg}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            } else if (validateVersion.isResultStatus == 4) {
                Actions.mainRoot()
            } else if (validateVersion.isResultStatus == 5) {
                ToastAndroid.showWithGravity(`${validateVersion.networkError}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        } else if (initAPP.step == 2) {
            if (loadLocalStorage.isResultStatus == 3 || loadLocalStorage.isResultStatus == 4 || loadLocalStorage.isResultStatus == 5) {
                Actions.mainRoot()
            }
        } else if (initAPP.step == 3) {
            if (validateToken.isResultStatus == 2 || validateToken.isResultStatus == 3 || validateToken.isResultStatus == 4) {
                Actions.mainRoot()
            } else if (validateToken.isResultStatus == 5) {
                ToastAndroid.showWithGravity(`${validateToken.networkError}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        }
    }

    render() {
        const { data, initAPP, loadLocalStorage, validateToken, validateVersion } = this.props.InitializationReducer
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Image source={{ uri: 'init_back' }}
                    style={styles.image}
                />
                {(validateVersion.isResultStatus == 3 || validateToken.isResultStatus == 3) && <Button block onPress={() => { }}
                    style={{ position: 'absolute', bottom: 50, width: window.width / 4 * 3, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 25 }}>
                    <Text style={styles.buttonTiltle}>联系管理员</Text>
                </Button>}
                {(validateVersion.isResultStatus == 5 || validateToken.isResultStatus == 5) && <Button block onPress={() => this.initApp()}
                    style={{ position: 'absolute', bottom: 50, width: window.width / 4 * 3, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 25 }}>
                    <Text style={styles.buttonTiltle}>重试</Text>
                </Button>}

                {initAPP.isResultStatus == 2 && data.version.force_update == 1 && <Button block
                    onPress={() => this.linkDownload(data.version.url)}
                    style={{ position: 'absolute', bottom: 50, width: window.width / 4 * 3, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 25 }}>
                    <Text style={styles.buttonTiltle}>立即更新</Text>
                </Button>}
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
        height: ImageHeight
    },
    buttonTiltle: {
        fontSize: 18,
        color: '#0078a7'
    }
})


const mapStateToProps = (state) => {
    return {
        InitializationReducer: state.initializationReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAppLastVersion: (param) => {
        dispatch(InitializationAction.getAppLastVersion(param))
    },
    validateToken: () => {
        dispatch(InitializationAction.validateToken())
    },
    resetInitialization: () => {
        dispatch(InitializationAction.resetInitialization())
    },
    resetGetVersion: () => {
        dispatch(InitializationAction.resetGetVersion())
    },
    initApp: (param, tryCount = 1, currentStep = 1) => {
        dispatch(InitializationAction.initApp(param, tryCount, currentStep))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Initialization)
