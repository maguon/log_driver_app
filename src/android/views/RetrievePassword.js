import React, { Component } from 'react'
import { Text, View, TextInput, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Button } from 'native-base'
import * as RetrievePasswordAction from '../../actions/RetrievePasswordAction'
import { Actions } from 'react-native-router-flux'

class RetrievePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstPassword: '',
            secondPassword: '',
            vCode: '',
            mobile: '',
            countDownTime: 0,
            isStop: false
        }
        this.getVCode = this.getVCode.bind(this)
        this.countDown = this.countDown.bind(this)
        this.retrieve = this.retrieve.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { getVCode, retrieve } = nextProps.retrievePasswordReducer
        if (getVCode.isResultStatus == 2) {
            this.props.resetGetVCode()
        } else if (getVCode.isResultStatus == 3) {
            ToastAndroid.show(`获取验证码失败：${getVCode.errorMsg}`, ToastAndroid.SHORT)
            this.setState({ isStop: true })
            this.props.resetGetVCode()
        } else if (getVCode.isResultStatus == 4) {
            ToastAndroid.show(`获取验证码失败：${getVCode.failedMsg}`, ToastAndroid.SHORT)
            this.setState({ isStop: true })
            this.props.resetGetVCode()
        }


        if (retrieve.isResultStatus == 2) {
            ToastAndroid.show(`密码重置成功！`, ToastAndroid.SHORT)
            this.props.resetRetrieve()
            Actions.pop()
        } else if (retrieve.isResultStatus == 3) {
            ToastAndroid.show(`获取验证码失败：${retrieve.errorMsg}`, ToastAndroid.SHORT)
            this.props.resetRetrieve()
        } else if (retrieve.isResultStatus == 4) {
            ToastAndroid.show(`获取验证码失败：${retrieve.failedMsg}`, ToastAndroid.SHORT)
            this.props.resetRetrieve()
        }
    }

    getVCode() {
        if (this.state.mobile) {
            this.countDown(60)
            this.props.getVCode({
                requiredParam: {
                    mobile: this.state.mobile
                }
            })
        } else {
            ToastAndroid.show('请输入手机号', ToastAndroid.SHORT)
        }
    }

    retrieve() {
        if (this.state.firstPassword === this.state.secondPassword) {
            this.props.retrieve({
                requiredParam: {
                    mobile: this.state.mobile
                },
                putParam: {
                    captcha: this.state.vCode,
                    password: this.state.firstPassword
                }
            })
        } else {
            ToastAndroid.show('两次输入的密码不同，请重新输入', ToastAndroid.SHORT)
        }

    }

    countDown(time) {
        if (!this.state.isStop) {
            this.setState({ countDownTime: time })
            if (time > 0) {
                setTimeout(() => {
                    this.countDown(time - 1)

                }, 1000)
            }
        } else {
            this.setState({ isStop: false, countDownTime: 0 })
            return
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' }}>
                        <Icon name='ios-phone-portrait' style={{ color: '#00cade', fontSize: 14 }} />
                        <Text style={{ fontSize: 11, marginLeft: 5 }}>手机号：</Text>
                        <TextInput
                            style={{ flex: 1, fontSize: 11, marginLeft: 5, color: '#888' }}
                            onChangeText={(text) => this.setState({ mobile: text })}
                            value={this.state.mobile}
                            placeholder='请输入手机号'
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#ccc' />
                        <Button small disabled={this.state.countDownTime > 0} style={this.state.countDownTime > 0 ? { alignSelf: 'center', marginLeft: 5, paddingHorizontal: 10 } : { alignSelf: 'center', marginLeft: 5, backgroundColor: '#00cade', paddingHorizontal: 10 }} onPress={this.getVCode}>
                            <Text style={{ color: '#fff', fontSize: 11 }}>发送验证码 {this.state.countDownTime ? `(${this.state.countDownTime})` : ''}</Text>
                        </Button>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' }}>
                        <Icon name='ios-key' style={{ color: '#00cade', fontSize: 14 }} />
                        <Text style={{ fontSize: 11, marginLeft: 5 }}>验证码：</Text>
                        <TextInput
                            style={{ flex: 1, fontSize: 11, marginLeft: 5, color: '#888' }}
                            onChangeText={(text) => this.setState({ vCode: text })}
                            value={this.state.vCode}
                            placeholder='请输入验证码'
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#ccc' />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' }}>
                        <Icon name='ios-lock' style={{ color: '#00cade', fontSize: 14 }} />
                        <Text style={{ fontSize: 11, marginLeft: 5 }}>新密码：</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={{ flex: 1, fontSize: 11, marginLeft: 5, color: '#888' }}
                            onChangeText={(text) => this.setState({ firstPassword: text })}
                            value={this.state.firstPassword}
                            placeholder='请输入新密码'
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#ccc' />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' }}>
                        <Icon name='ios-lock' style={{ color: '#00cade', fontSize: 14 }} />
                        <Text style={{ fontSize: 11, marginLeft: 5 }}>确认密码：</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={{ flex: 1, fontSize: 11, marginLeft: 5, color: '#888' }}
                            onChangeText={(text) => this.setState({ secondPassword: text })}
                            value={this.state.secondPassword}
                            placeholder='请再次输入新密码'
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#ccc' />
                    </View>
                </View>
                <View>
                    <Button
                        full
                        disabled={!(this.state.firstPassword && this.state.secondPassword && this.state.vCode && this.state.mobile)}
                        style={this.state.firstPassword && this.state.secondPassword && this.state.vCode && this.state.mobile ? { backgroundColor: '#00cade' } : {}} onPress={this.retrieve}>
                        <Text style={{ color: '#fff' }}>确认</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        retrievePasswordReducer: state.retrievePasswordReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getVCode: (param) => {
        dispatch(RetrievePasswordAction.getVCode(param))
    },
    retrieve: (param) => {
        dispatch(RetrievePasswordAction.retrieve(param))
    },
    resetGetVCode: () => {
        dispatch(RetrievePasswordAction.resetGetVCode())
    },
    resetRetrieve: () => {
        dispatch(RetrievePasswordAction.resetRetrieve())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RetrievePassword)