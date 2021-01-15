/**
 * Created by lingxue on 2017/4/17.
 */
import React, { Component } from 'react'
import { Text, Linking, StyleSheet, View, TouchableOpacity,InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Container, Content, Icon, Left, Body, Right, List, ListItem, Thumbnail, Separator } from 'native-base'
import ConfirmModal from '../../components/ConfirmModal'
import * as LoginAction from '../login/LoginAction'
import globalStyles, { styleColor } from '../../GlobalStyles'
import * as android_app from '../../../android_app.json'
import FoundationIcon from 'react-native-vector-icons/dist/Foundation'
import sysNotification from "../sysNotification/SysNotification";
import * as SysNotificationAction from "../sysNotification/SysNotificationAction";


class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmModalVisible: false
        }
        this.exitApp = this.exitApp.bind(this)
        this.onPressOk = this.onPressOk.bind(this)
        this.onPressCancel = this.onPressCancel.bind(this)
    }


    exitApp() {
        this.setState({ confirmModalVisible: true })
    }

    onPressOk() {
       this.setState({ confirmModalVisible: false })
        this.props.cleanLogin()
    }

    onPressCancel() {
        this.setState({ confirmModalVisible: false })
    }


    render() {
        const { version } = this.props.InitializationReducer.data
        const { loginReducer: { data: { user: { avatar_image, real_name, mobile } } } } = this.props
        const { communicationSettingReducer: { data: { file_host } } ,getSysNotificationListWaiting,getSysNotificationAll} = this.props

        return (
            <Container>
                <Content style={globalStyles.container}>
                    <List style={styles.list}>
                        <Separator style={globalStyles.separator} />
                        <ListItem last onPress={Actions.personalCenter}>
                            <View style={styles.avatarContainer}>
                                <Thumbnail source={avatar_image ? { uri: `${file_host}/image/${avatar_image}` } : { uri: `personalicon` }} />
                                <View style={styles.userContainer}>
                                    <Text style={globalStyles.midText}>{real_name ? `${real_name}` : ''}</Text>
                                    <Text style={globalStyles.midText}>{mobile ? `${mobile}` : ''}</Text>
                                </View>
                            </View>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon last onPress={()=>{
                           getSysNotificationListWaiting()
                            Actions.sysNotification()
                             InteractionManager.runAfterInteractions(getSysNotificationAll())
                        }}>
                            <Left>
                                <Icon name="ios-notifications-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>系统消息</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon onPress={Actions.updatePassword}>
                            <Left>
                                <Icon name="ios-unlock-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>修改密码</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon onPress={Actions.changeMobileNo}>
                            <Left>
                                <Icon name="ios-repeat" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>换绑手机</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>


                        <ListItem icon last>
                            <Left>
                                <Icon name="ios-cube-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>版本信息：v{android_app.version}{`(${android_app.stageList.find(item => item.id == android_app.stage).value})`}</Text>
                            </Body>
                            <Right >
                                {version.force_update != 0 && <TouchableOpacity onPress={() => {
                                    console.log('url', version.url)
                                    if (version.url) {
                                        Linking.canOpenURL(version.url)
                                            .then(supported => {
                                                if (!supported) {
                                                    console.log('Can\'t handle url: ' + version.url)
                                                } else {
                                                    return Linking.openURL(version.url)
                                                }
                                            })
                                            .catch(err => console.error('An error occurred', err))
                                    }
                                }}>
                                    <FoundationIcon name="burst-new" size={30} color={'#ff0000'} />
                                </TouchableOpacity>}
                            </Right>
                        </ListItem>
                    </List>
                    <Button full style={[styles.button, globalStyles.styleBackgroundColor]} onPress={this.exitApp}>
                        <Text style={[globalStyles.midText, styles.buttonTitle]}>退出</Text>
                    </Button>
                </Content>
                <ConfirmModal
                    title='确认退出应用？'
                    isVisible={this.state.confirmModalVisible}
                    onPressOk={this.onPressOk}
                    onPressCancel={this.onPressCancel}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userContainer: {
        marginLeft: 10
    },
    button: {
        margin: 15,
        marginTop: 40
    },
    buttonTitle: {
        color: '#fff'
    }
})

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        InitializationReducer: state.initializationReducer,
        communicationSettingReducer: state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    cleanLogin: () => {
        dispatch(LoginAction.cleanLogin())
    },
    getSysNotificationAll: () => {
        dispatch(SysNotificationAction.getSysNotificationAll())
    },
    getSysNotificationListWaiting: () => {
        dispatch(SysNotificationAction.getSysNotificationListWaiting())

    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Setting)
