/**
 * Created by lingxue on 2017/4/17.
 */
import React, { Component, PropTypes } from 'react'
import { View, Picker, Modal, StyleSheet, Text, Linking } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../../../reducers/index'
import localStorageKey from '../../../util/LocalStorageKey'
import { Actions } from 'react-native-router-flux'
import localStorage from '../../../util/LocalStorage'
import { Button, Container, Content, Header, Icon, Left, Body, Right, Title, List, ListItem, Thumbnail, Toast } from 'native-base'
import ConfirmModal from '../../components/ConfirmModal'
import * as app from '../../../android_app.json'
import * as LoginAction from '../../../actions/LoginAction'


class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmModalVisible: false
        }
        this.onBarcodeReceived = this.onBarcodeReceived.bind(this)
        this.onPressIcon = this.onPressIcon.bind(this)
        this.onPressTextInput = this.onPressTextInput.bind(this)
        this.linkDownload = this.linkDownload.bind(this)
    }

    onBarcodeReceived(param) {
        Actions.searchVinAtSettingBlock({ vin: param })
    }
    onPressIcon() {
        Actions.searchVinAtSettingBlock()
    }
    onPressTextInput() {
        Actions.searchVinAtSettingBlock()
    }

    linkDownload(url) {
        if (url) {
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url)
                } else {
                    return Linking.openURL(url)
                }
            }).catch(err => console.error('An error occurred', err))
        }
    }

    exitApp() {
        this.setState({ confirmModalVisible: true })
    }

    onPressOk() {
        const {user} =this.props.userReducer.data
        this.setState({ confirmModalVisible: false })
        localStorage.save({
            key:localStorageKey.USER,
            data:{ mobile: user.mobile }
        })
        this.props.cleanLogin()
        Actions.login()
    }

    onPressCancel() {
        this.setState({ confirmModalVisible: false })
    }

    render() {
        let viewStyle = { backgroundColor: '#00cade' }
        const { version } = this.props.InitializationReducer.data
        console.log(this.props.InitializationReducer)

        return (
            <Container style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <List>
                        {/* <ListItem onPress={() => { Actions.recordList() }}>
                            <Left>
                                <Icon name="md-person" style={{ color: '#00cade' }} />
                                <Text>工作记录</Text>
                            </Left>
                            <Body></Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem> */}
                        <ListItem onPress={() => { Actions.password() }}>
                            <Left>
                                <Icon name="ios-lock" style={{ color: '#00cade' }} />
                                <Text>修改密码</Text>
                            </Left>
                            <Body></Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem style={{ justifyContent: 'space-between' }}>
                            <Text>版本信息：v{version.currentVersion ? `${version.currentVersion}` : ''} </Text>
                            {version.force_update == 2
                                && <Text
                                    onPress={() => this.linkDownload(version.url)}
                                    style={{
                                        backgroundColor: 'red',
                                        color: '#fff',
                                        borderRadius: 5,
                                        textAlign: 'center',
                                        paddingHorizontal: 4
                                    }}>new </Text>}
                        </ListItem>
                    </List>
                    <Button light full style={{ marginTop: 80, marginHorizontal: 15, backgroundColor: '#00cade' }} onPress={this.exitApp.bind(this)}>
                        <Text style={{ color: '#fff' }}>退出登录</Text>
                    </Button>
                </View>
                <ConfirmModal
                    title='确认退出应用？'
                    isVisible={this.state.confirmModalVisible}
                    onPressOk={this.onPressOk.bind(this)}
                    onPressCancel={this.onPressCancel.bind(this)}
                />

            </Container>

        )
    }
}



const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        InitializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    cleanLogin: () => {
        dispatch(LoginAction.cleanLogin())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Setting)