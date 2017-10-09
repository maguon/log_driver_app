import React, { Component, PropTypes } from 'react'
import { StatusBar, View, Navigator, ToastAndroid } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../../reducers/index'
import * as passwordAction from '../../actions/PasswordAction'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import { Actions } from 'react-native-router-flux'
import { Button, Container, Content, Header, Icon, Form, Item, Text, Label, Input, Left, Body, Right, Title, List, ListItem, Toast } from 'native-base'
import * as LoginAction from '../../actions/LoginAction'

class Password extends Component {

    constructor(props) {
        super(props)
        this.changePassword = this.changePassword.bind(this)
        this.state = {
            originPassword: '',
            newPassword: '',
            againPassword: ''
        }
    }

    changePassword() {
        if (this.state.newPassword == this.state.againPassword) {
            this.props.changePassword({
                requiredParam: {
                    userId: this.props.user.userId
                },
                putParam: {
                    originPassword: this.state.originPassword,
                    newPassword: this.state.newPassword
                }
            })
        } else {
            ToastAndroid.showWithGravity('两次输入的新密码不同', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }



    shouldComponentUpdate(nextProps, nextState) {
        let { isResult, isSuccess } = nextProps.password
        if (isResult) {
            if (isSuccess) {
                ToastAndroid.showWithGravity('修改成功，请重新登录', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetPassword()
                localStorage.saveKey(localStorageKey.USER, { mobile: this.props.user.mobile })
                this.props.cleanLogin()
                Actions.login()
            }
            else {
                ToastAndroid.showWithGravity('修改失败，请检查密码是否正确', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetPassword()
            }
            return false
        }
        return true
    }

    render() {
        return (
            <Container>
                <Body style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <Form style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Item floatingLabel  >
                            <Label>原密码</Label>
                            <Input secureTextEntry value={this.state.originPassword} onChangeText={(text) => this.setState({ originPassword: text })} />
                        </Item>
                        <Item floatingLabel  >
                            <Label>新密码</Label>
                            <Input secureTextEntry value={this.state.newPassword} onChangeText={(text) => this.setState({ newPassword: text })} />
                        </Item>
                        <Item floatingLabel  >
                            <Label>再次输入新密码</Label>
                            <Input secureTextEntry value={this.state.againPassword} onChangeText={(text) => this.setState({ againPassword: text })} />
                        </Item>
                        <Button full style={{ marginHorizontal: 20, marginTop: 20, backgroundColor: '#00cade' }} onPress={this.changePassword}>
                            <Text>确定</Text>
                        </Button>
                    </Form>
                </Body>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        password: state.PasswordReducer,
        user: state.userReducer.user

    }
}

const mapDispatchToProps = (dispatch) => ({
    changePassword: (param) => {
        dispatch(passwordAction.changePassword(param))
    },
    resetPassword: () => {
        dispatch(passwordAction.resetPassword())
    },
    cleanLogin: () => {
        dispatch(LoginAction.cleanLogin())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Password)