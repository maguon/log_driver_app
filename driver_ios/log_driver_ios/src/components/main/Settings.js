/**
 * Created by lingxue on 2017/4/17.
 */
import React, { Component } from 'react'
import { Text, Linking, StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Container, Content, Icon, Left, Body, Right, List, ListItem, Thumbnail, Separator } from 'native-base'
import ConfirmModal from '../modules/ConfirmModal'
import * as actions from '../../actions/index'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import * as ios_app from '../../ios_app.json'
import FoundationIcon from 'react-native-vector-icons/dist/Foundation'


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
        const { loginReducer: { data: { user: { avatar_image, real_name, mobile } }},communicationSettingReducer:{data: { file_host } } } = this.props
        // console.log('this.props',this.props)
        return (
            <Container>
                <Content style={globalStyles.container}>
                    <List style={styles.list}>
                        <Separator style={globalStyles.separator} />
                        <ListItem last onPress={Actions.personalCenter}>
                            <View style={styles.avatarContainer}>
                                <Thumbnail source={avatar_image ? { uri: `${file_host}/image/${avatar_image}` } : { uri: `personalicon` }} />
                                <View style={styles.userContainer}>
                                    <View>
                                    <Text style={globalStyles.largeText}>{real_name ? `${real_name}` : ''}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingTop:5,alignItems:'center'}}>
                                        <FontAwesome name="mobile-phone" size={18} color={'#838485'}/>
                                    <Text style={[globalStyles.midText,{marginLeft:10}]}>{mobile ? `${mobile}` : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon onPress={Actions.updatePassword}>
                            <Left>
                                <Icon name="ios-unlock" style={globalStyles.styleColor} />
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
                                <Icon name="ios-cube" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>版本信息：v{version.currentVersion}{`(${ios_app.stageList.find(item => item.id == ios_app.stage).value})`}</Text>
                            </Body>
                            <Right >
                                {version.force_update != 0 && <TouchableOpacity onPress={() => {
                                    // console.log('url', version.url)
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
        communicationSettingReducer:state.communicationSettingReducer,
        InitializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    cleanLogin: () => {
        dispatch(actions.loginAction.cleanLogin())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Setting)
