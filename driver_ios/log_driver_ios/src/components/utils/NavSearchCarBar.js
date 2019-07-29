import React, { Component } from 'react'
import { Header, Button, Icon, Right, Left, Body } from 'native-base'
import { View, StatusBar, StyleSheet, TextInput, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from './GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import * as  actions from '../../actions/index'


const { width } = Dimensions.get('window')

const TextBox = props => {
    const { input: { onChange, ...restProps }, getCarList, getCarListWaiting, cleanCarList } = props
    return (
        <View style={styles.inputContainer}>
            <TextInput
                underlineColorAndroid='transparent'
                placeholderTextColor='rgba(255,255,255,0.8)'
                autoFocus={true}
                placeholder='请输入至少6位vin码'
                style={[globalStyles.midText, styles.input]}
                onChangeText={(text) => {
                    onChange(text)
                    if (text.length <= 5) {
                        cleanCarList()
                    } else {
                        getCarListWaiting()
                        getCarList()
                    }
                }}
                {...restProps} />
            <Icon name="ios-search" style={[globalStyles.textColor, styles.inputIcon]} />
        </View>
    )
}

const NavSearchCarBar = props => {
    const { title, getCarListWaiting, getCarList, cleanCarList,initParam:{commandInfo:{load_task_type}} } = props
    // console.log('props', props)
    return (
        <View style={[styles.container]}>
            <StatusBar hidden={false} />
            <Header
                transparent
                style={globalStyles.styleBackgroundColor}>
                <Left style={styles.left}>
                    <Button transparent onPress={Actions.pop}>
                        <Icon name="arrow-back" style={styles.leftIcon} />
                    </Button>
                </Left>
                <Body style={styles.body}>
                    <Field name='vin'
                        component={TextBox}
                        cleanCarList={cleanCarList}

                        getCarList={() =>{
                            if(load_task_type==2){
                                getCarList({
                                    newCurrentCityId: props.initParam.commandInfo.route_start_id,
                                    newCurrentAddrId: props.initParam.commandInfo.base_addr_id
                                })
                            }else{
                                getCarList()
                            }
                        } }
                        getCarListWaiting={getCarListWaiting} />
                </Body>
                <Right>
                    <Button transparent onPress={Actions.vinScanner}>
                        <Icon name="ios-qr-scanner" style={styles.leftIcon} />
                    </Button>
                </Right>
            </Header>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: req => {
        dispatch(actions.searchCarAction.getCarList(req))
    },
    getCarListWaiting: () => {
        dispatch(actions.searchCarAction.getCarListWaiting())
    },
    cleanCarList: () => {
        dispatch(actions.searchCarAction.cleanCarList())
    }
})

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'searchCarForm'
})(NavSearchCarBar))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        width
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        flex: 1
    },
    body: {
        flex: 5
    },
    leftIcon: {
        color: '#fff'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 3
    },
    input: {
        flex: 1,
        paddingVertical: 0,
        color: 'rgba(255,255,255,0.6)'
    },
    inputIcon: {
        paddingHorizontal: 5,
        color: '#fff'
    }
})

