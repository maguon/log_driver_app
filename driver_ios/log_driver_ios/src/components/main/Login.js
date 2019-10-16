import React, {Component} from 'react'
import {Dimensions, Image, Linking, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import {Button, Icon, Item, Text, Input, Container, Root, Body, Content} from 'native-base'
import {Actions} from 'react-native-router-flux'
import {Field, reduxForm} from 'redux-form'
import * as actions from '../../actions/index'
import globalStyles from '../utils/GlobalStyles'
import * as ios_app from '../../ios_app.json'


const window = Dimensions.get('window')

const TextBox = props => {
    const {iconName, placeholderText, input: {onChange, ...restProps}, secureTextEntry = false} = props
    // console.log('props', props)
    return (
        <Item rounded style={styles.item}>
            <Icon active name={iconName} style={styles.itemIcon}/>
            <Input placeholder={placeholderText}
                   placeholderTextColor='rgba(255,255,255,0.4)'
                   selectionColor='rgba(255,255,255,0.4)'
                   style={[globalStyles.largeText, styles.input]}
                   onChangeText={onChange}
                   secureTextEntry={secureTextEntry}
                   {...restProps} />
        </Item>
    )
}

class Login extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {handleSubmit, initializationReducer: {data: {version: {force_update, url}}}} = this.props
        // console.log('ios_app', ios_app)
        // console.log('force_update', force_update)
        return (
            <Root>
                <Container style={styles.container}>
                    <StatusBar hidden={true}/>

                    <Content showsVerticalScrollIndicator={false}>
                    <ImageBackground
                        source={require('../../images/login_back.png')}
                        style={styles.backgroundImage}>

                        <View style={{position: 'absolute', top: window.height / 10}}>
                            <View style={styles.logoContainer}>
                                <Image
                                    source={require('../../images/logo.png')}
                                    style={styles.logo}/>
                            </View>
                            <View>
                                <Image
                                    source={require('../../images/app_name.png')}
                                    style={styles.appName}/>
                            </View>
                        </View>
                        <Text style={[globalStyles.smallText, {
                            color: 'rgba(255,255,255,0.5)',
                            position: 'absolute',
                            top: 5,
                            right: 15
                        }]}>{ios_app.version}</Text>

                        {force_update != 1 && <View style={styles.formContainer}>
                            <Field
                                name='server'
                                iconName='md-globe'
                                placeholderText='请输入服务器域名'
                                component={TextBox}/>

                            <Field
                                name='mobile'
                                iconName='md-person'
                                placeholderText='请输入用户名'
                                component={TextBox}/>
                            <Field
                                name='password'
                                secureTextEntry={true}
                                iconName='md-lock'
                                placeholderText='请输入密码'
                                component={TextBox}/>
                            <Button style={[styles.itemButton, {backgroundColor: '#00cade'}]}
                                    onPress={handleSubmit}>
                                <Text style={[globalStyles.midText, styles.buttonTittle]}>登录</Text>
                            </Button>
                            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                                <TouchableOpacity style={styles.linkButton} onPress={() => Actions.retrievePassword()}>
                                    <Text style={[globalStyles.midText, styles.linkButtonTittle]}>忘记密码</Text>
                                </TouchableOpacity>
                            </View>

                        </View>}
                        {force_update == 1 && <View style={styles.formContainer}>
                            <Button style={[globalStyles.styleBackgroundColor, {marginTop: 50}]} onPress={() => {
                                if (url) {
                                    Linking.canOpenURL(url)
                                        .then(supported => {
                                            if (!supported) {
                                                console.log('Can\'t handle url: ' + url)
                                            } else {
                                                return Linking.openURL(url)
                                            }
                                        })
                                        .catch(err => console.error('An error occurred', err))
                                }
                            }}>
                                <Text style={[globalStyles.midText, styles.buttonTittle]}>请下载最新版本</Text>
                            </Button>
                        </View>}
                    </ImageBackground>
                    </Content>
                </Container>
            </Root>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: window.width,
        height: window.height,
        alignItems: 'center'
    },
    item: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        width: window.width / 4 * 3,
        borderWidth: 0,
        marginTop: 20
    },
    itemIcon: {
        color: 'rgba(255,255,255,0.7)',
        marginLeft: 10
    },
    itemButton: {
        marginTop: 50,
        width: window.width / 4 * 3,
        borderRadius: 25,
        justifyContent: 'center'
    },
    input: {
        color: 'rgba(255,255,255,0.7)'
    },
    buttonTittle: {
        color: '#fff'
    },
    linkButton: {
        alignSelf: 'flex-end',
        paddingTop: 10,
        paddingRight: 10
    },
    linkButtonTittle: {
        color: 'rgba(255,255,255,0.5)'
    },
    logoContainer: {
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,1)',
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: 20,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80
    },
    appName: {
        width: 125,
        height: 38,
        marginTop: 20
    },
    formContainer: {
        marginTop: 30,
        position: 'absolute',
        top: window.height / 3
    }
})


const mapStateToProps = (state) => {
    return {
        initialValues: {
            mobile: state.loginReducer.data.user.mobile,
            server: state.communicationSettingReducer.data.host
        },
        initializationReducer: state.initializationReducer
    }
}

export default connect(mapStateToProps)(
    reduxForm({
        form: 'loginForm',
        destroyOnUnmount: false,
        enableReinitialize: true,
        onSubmit: (values, dispatch, props) => {
            // console.log('onSubmitprops', props)
            const { initializationReducer: { initAPP: {  currentStep } } } = props
            if (currentStep < 3) {
                // console.log('validateVersionForLogin')
                dispatch(actions.loginAction.validateVersionForLogin(values))
            } else {
                // console.log('login')
                dispatch(actions.loginAction.login(values))
            }
        }
    })(Login))

