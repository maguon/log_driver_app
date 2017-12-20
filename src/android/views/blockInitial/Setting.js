/**
 * Created by lingxue on 2017/4/17.
 */
import React, { Component, PropTypes } from 'react'
import { View, Picker, Modal, StyleSheet, Text, Linking, Image } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { file_host } from '../../../config/Host'
import ReduxThunk from 'redux-thunk'
import reducers from '../../../reducers/index'
import localStorageKey from '../../../util/LocalStorageKey'
import { Actions } from 'react-native-router-flux'
import localStorage from '../../../util/LocalStorage'
import { Button, Container, Content, Header, Icon, Left, Body, Right, Title, List, ListItem, Thumbnail, Toast, Separator } from 'native-base'
import ConfirmModal from '../../components/ConfirmModal'
import * as app from '../../../android_app.json'
import * as LoginAction from '../../../actions/LoginAction'
import * as SettingAction from '../../../actions/SettingAction'


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

    componentDidMount() {
        const { user } = this.props.userReducer.data
        this.props.getPersonalInfo({
            getDriverId: {
                requiredParam: {
                    userId: user.userId
                }
            }
        })
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
        const { user } = this.props.userReducer.data
        this.setState({ confirmModalVisible: false })
        localStorage.save({
            key: localStorageKey.USER,
            data: { mobile: user.mobile }
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
        const { personalInfo } = this.props.settingReducer.data
        //console.log(this.props.InitializationReducer)
        console.log('this.props', this.props)
        return (
            <Container style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <List>
                        <Separator bordered />
                        <ListItem avatar onPress={Actions.personalInfo}>
                            <Left>
                                <Thumbnail source={personalInfo.avatar_image ? { uri: `${file_host}/image/${personalInfo.avatar_image}` } : { uri: `personalicon` }} />
                            </Left>
                            <Body style={{ borderBottomWidth: 0 }}>
                                <Text>{personalInfo.real_name ? personalInfo.real_name : ''}</Text>
                                <Text>{personalInfo.mobile ? personalInfo.mobile : ''}</Text>
                            </Body>
                            <Right style={{ borderBottomWidth: 0 }}>

                            </Right>
                        </ListItem>
                        <Separator bordered />
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
                        <ListItem style={{ justifyContent: 'space-between' }} style={{ borderBottomWidth: 0 }}>
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
                    <Separator bordered style={{ flex: 1, paddingLeft: 0, marginLeft: 0 }}>
                        <Button light full style={{ marginTop: 80, marginHorizontal: 15, backgroundColor: '#00cade' }} onPress={this.exitApp.bind(this)}>
                            <Text style={{ color: '#fff' }}>退出登录</Text>
                        </Button>
                    </Separator>
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
        InitializationReducer: state.initializationReducer,
        settingReducer: state.settingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    cleanLogin: () => {
        dispatch(LoginAction.cleanLogin())
    },
    getPersonalInfo: (param) => {
        dispatch(SettingAction.getPersonalInfo(param))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Setting)