import React, { Component, PropTypes } from 'react'
import { View, Image, Dimensions, ToastAndroid, Platform, StatusBar, TouchableOpacity } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../../../reducers/index'
import * as LoginAction from './LoginAction'
import { Actions } from 'react-native-router-flux'
import localStorageKey from '../../../util/LocalStorageKey'
import localStorage from '../../../util/LocalStorage'
import XGPush from 'react-native-xinge-push';
import { Button, Icon, Form, Item, Text, Label, Input, Left, Body, Right, Title, List, ListItem } from 'native-base'


const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.width / 9 * 16

class Login extends Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
        this.state = {
            textUserName: '',
            textPassword: '',
            deviceToken: ''
        }
        this._onRegister = this._onRegister.bind(this)
    }

    componentWillUnmount() {
        XGPush.removeEventListener('register', this._onRegister);
    }

    /**
     * 注册成功
     * @param deviceToken
     * @private
     */
    _onRegister(deviceToken) {
        if (this.state.deviceToken != deviceToken) {
            this.setState({ deviceToken })
            //console.log(deviceToken)
        }
        // 在ios中，register方法是向apns注册，如果要使用信鸽推送，得到deviceToken后还要向信鸽注册
        XGPush.registerForXG(deviceToken)
    }

    componentDidMount() {
        XGPush.addEventListener('register', this._onRegister)
        localStorage.load({ key: localStorageKey.USER })
            .then(res => this.setState({ textUserName: res.mobile }))
            .catch(err => console.log(err))
    }

    login(param) {
        this.props.login(
            {
                OptionalParam: {
                    deviceToken: this.state.deviceToken,
                    version: this.props.initializationReducer.data.version.currentVersion,
                    appType: 4,
                    deviceType: 1
                },
                postParam: {
                    mobile: this.state.textUserName,
                    password: this.state.textPassword
                }
            }
        )
    }
    componentWillReceiveProps(nextProps) {
        const { login } = nextProps.userReducer
        if (login.isResultStatus == 4) {
            ToastAndroid.showWithGravity(`${login.failedMsg}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else if (login.isResultStatus == 5) {
            ToastAndroid.showWithGravity(`${login.networkError}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else if (login.isResultStatus == 3) {
            ToastAndroid.showWithGravity(`${login.errorMsg}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }

    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar hidden={true} />
                <Image
                    source={{ uri: 'login_back' }}
                    style={{ width: window.width, height: window.width / 9 * 16 }} />
                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ borderRadius: 60, backgroundColor: 'rgba(255,255,255,1)', borderColor: 'rgba(255,255,255,0.5)', borderWidth: 20, width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'logo' }}
                            style={{ width: 80, height: 80 }} />
                    </View>
                    <View>
                        <Image
                            source={{ uri: 'app_name' }}
                            style={{ width: 125, height: 38, marginTop: 20 }} />
                    </View>
                    <View>
                        <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.15)', width: window.width / 4 * 3, borderWidth: 0, marginTop: 50 }}>
                            <Icon active name='md-person' style={{ color: '#00b9cd', marginLeft: 10 }} />
                            <Input placeholder='请输入用户名'
                                placeholderTextColor='#00b9cd'
                                style={{ color: '#00b9cd' }}
                                onChangeText={(text) => this.setState({ textUserName: text })}
                                value={this.state.textUserName} />
                        </Item>
                        <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.15)', width: window.width / 4 * 3, borderWidth: 0, marginTop: 20 }}>
                            <Icon active name='md-lock' style={{ color: '#00b9cd', marginLeft: 10 }} />
                            <Input placeholder='请输入密码'
                                placeholderTextColor='#00b9cd'
                                style={{ color: '#00b9cd' }}
                                secureTextEntry
                                onChangeText={(text) => this.setState({ textPassword: text })}
                                value={this.state.textPassword} />
                        </Item>
                        <Button style={{ marginTop: 50, width: window.width / 4 * 3, borderRadius: 25, backgroundColor: '#00cade', justifyContent: 'center' }}
                            onPress={this.login}>
                            <Text>登录</Text>
                        </Button>
                    </View>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', paddingTop: 10, paddingRight: 10 }} onPress={() => Actions.retrievePassword()}>
                        <Text style={{ color: '#fff', fontSize: 12 }}>找回密码</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        initializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (param) => {
        dispatch(LoginAction.login(param))
    },
    resetLogin: () => {
        dispatch(LoginAction.resetLogin())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)