import React, { Component, PropTypes } from 'react'
import { View, Image, Dimensions, ToastAndroid, Platform } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../../reducers/index'
import * as LoginAction from '../../actions/LoginAction'
import { Actions } from 'react-native-router-flux'
import LoginLayout from '../components/Login'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import XGPush from 'react-native-xinge-push';

class Login extends Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
        this.state = {
            textUserName: '',
            textPassword: '',
            deviceToken: ''
        }
        this.changPassword = this.changPassword.bind(this)
        this.changUserName = this.changUserName.bind(this)
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
            console.log(deviceToken)
        }

        // 在ios中，register方法是向apns注册，如果要使用信鸽推送，得到deviceToken后还要向信鸽注册
        XGPush.registerForXG(deviceToken)
    }

    componentDidMount() {
        XGPush.addEventListener('register', this._onRegister)
        localStorage.loadKey(localStorageKey.USER, (err, res) => {
            if (err) {
            }
            else {
                this.setState({ textUserName: res.mobile })
            }
        })

        console.log('this.props.initializationReducer', this.props.initializationReducer)
    }

    login(param) {

        this.props.login(
            {
                OptionalParam: {
                    deviceToken: this.state.deviceToken,
                    version: this.props.initializationReducer.getVersion.data.version,
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

    changUserName(userName) {
        this.setState({ textUserName: userName })
    }

    changPassword(password) {
        this.setState({ textPassword: password })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { loginInfo } = nextProps
        /*loginInfo执行状态*/
        if (loginInfo.isExecStatus == 1) {
            //console.log('loginInfo开始执行')
        } else if (loginInfo.isExecStatus == 2) {
            //console.log('loginInfo执行完毕')
            if (loginInfo.isResultStatus == 0) {
                this.props.resetLogin()
            } else if (loginInfo.isResultStatus == 1) {
                //console.log('loginInfo执行失败')
                this.props.resetLogin()
                ToastAndroid.showWithGravity('系统错误，请检查网络并重新进入APP', ToastAndroid.SHORT, ToastAndroid.CENTER)
            } else if (loginInfo.isResultStatus == 2) {
                //console.log('loginInfo执行失败')  
                this.props.resetLogin()
                ToastAndroid.showWithGravity(loginInfo.failedMsg, ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        }

        return true
    }

    render() {

        return <LoginLayout
            login={this.login}
            textUserName={this.state.textUserName}
            textPassword={this.state.textPassword}
            changUserName={this.changUserName}
            changPassword={this.changPassword}
        />
    }

}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.userReducer,
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