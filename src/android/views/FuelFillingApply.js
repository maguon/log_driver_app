import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import { Button, Icon } from 'native-base'
import DateTimePicker from '../components/form/DateTimePicker'
import TimePicker from '../components/form/TimePicker'
import TextBox from '../components/form/TextBox'
import Select from '../components/form/Select'
import moment from 'moment'
import fuelFillingTypeList from '../../config/fuelFillingType'
import CheckBox from '../components/form/CheckBox'
import { Actions } from 'react-native-router-flux'
import AMapLocation from 'react-native-amap-location'
import { connect } from 'react-redux'
import * as fuelFillingApplyAction from '../../actions/FuelFillingApplyAction'

class FuelFillingApply extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fuelFillingInfo: {
                refuelDate: moment().format('YYYY-MM-DD'),
                refuelTime: moment().format('HH:mm'),
                refuelVolume: 0,
                dpRouteTaskId: 0,
                refuelAddressType: 0,
                refuelAddress: '',
                lng: 0,
                lat: 0,
                refuelMoney: 0
            },
            validate: {
                refuelDateValidate: false,
                refuelVolumeValidate: false,
                refuelMoneyValidate: false,
                refuelTimeValidate: false,
                refuelAddressTypeValidate: false
            }
        }
        this.onPressPosition = this.onPressPosition.bind(this)
        this.onCreateRefuel = this.onCreateRefuel.bind(this)
    }

    componentDidMount() {
        this.onPressPosition()
    }



    //isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
    componentWillReceiveProps(nextProps) {
        const { createFuelFillingApply } = nextProps.fuelFillingApplyReducer
        /*createFuelFillingApply*/
        if (createFuelFillingApply.isResultStatus == 2) {
            ToastAndroid.show('添加成功', ToastAndroid.SHORT)
            //console.log('createFuelFillingApply', '执行成功')
            this.props.resetCreateFuelFillingApply()
            Actions.pop({ refresh: { isRefresh: true, refreshType: 'create' } })
        }
        else if (createFuelFillingApply.isResultStatus == 3) {
            ToastAndroid.show(`执行失败，${createFuelFillingApply.errorMsg}！`, ToastAndroid.SHORT)
            this.props.resetCreateFuelFillingApply()
            //console.log('createFuelFillingApply异常', createFuelFillingApply.errorMsg)
        }
        else if (createFuelFillingApply.isResultStatus == 4) {
            ToastAndroid.show(`执行失败，${createFuelFillingApply.failedMsg}！`, ToastAndroid.SHORT)
            this.props.resetCreateFuelFillingApply()
            //console.log('createFuelFillingApply执行失败', createFuelFillingApply.failedMsg)
        }
        else if (createFuelFillingApply.isResultStatus == 5) {
            ToastAndroid.show(`执行失败，${createFuelFillingApply.serviceFailedMsg}！`, ToastAndroid.SHORT)
            this.props.resetCreateFuelFillingApply()
            //console.log('createFuelFillingApply服务器异常', createFuelFillingApply.serviceFailedMsg)
        }
        /************************************ */
    }

    onCreateRefuel() {
        const { user } = this.props.userReducer.data
        let param = { ...this.state.fuelFillingInfo }
        for (key in param) {
            if (!param[key]) {
                delete param[key]
            }
        }
        param.refuelDate = `${param.refuelDate} ${param.refuelTime}`
        this.props.createFuelFillingApply({
            requiredParam: { userId: user.userId },
            postParam: {
                ...param
            }
        })
    }

    onPressPosition() {
        let listener = AMapLocation.addEventListener((data) => {
            this.setState((prevState, props) => {
                return ({
                    fuelFillingInfo: {
                        ...prevState.fuelFillingInfo,
                        refuelAddress: data.address,
                        lng: data.longitude,
                        lat: data.latitude
                    }
                })
            })
            AMapLocation.stopLocation()
            listener.remove()
        })
        AMapLocation.startLocation({
            accuracy: 'HighAccuracy',
            killProcess: true,
            needDetail: true,
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        {/* <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd', padding: 10 }}>
                            <Text style={{ fontSize: 12 }}><Text style={{ fontWeight: 'bold' }}>申报时间：</Text>{moment().format('YYYY-MM-DD HH:mm')}</Text>
                        </View> */}
                        <DateTimePicker
                            isRequire={true}
                            value={this.state.fuelFillingInfo.refuelDate ? this.state.fuelFillingInfo.refuelDate : '请选择'}
                            title='加油日期：'
                            defaultValue={'请选择'}
                            onValueChange={(param) => this.setState((prevState, props) => {
                                return ({
                                    fuelFillingInfo: { ...prevState.fuelFillingInfo, refuelDate: param }
                                })
                            })}
                            onRequire={(flag) => this.setState((prevState, props) => {
                                return ({
                                    validate: { ...prevState.validate, refuelDateValidate: flag }
                                })
                            })}
                        />
                        <TimePicker
                            isRequire={true}
                            value={this.state.fuelFillingInfo.refuelTime ? this.state.fuelFillingInfo.refuelTime : '请选择'}
                            title='加油时间：'
                            defaultValue={'请选择'}
                            onValueChange={(param) => this.setState((prevState, props) => {
                                return ({
                                    fuelFillingInfo: { ...prevState.fuelFillingInfo, refuelTime: param }
                                })
                            })}
                            onRequire={(flag) => this.setState((prevState, props) => {
                                return ({
                                    validate: { ...prevState.validate, refuelTimeValidate: flag }
                                })
                            })}
                        />
                        <TextBox
                            isRequire={true}
                            title='加油量：'
                            value={this.state.fuelFillingInfo.refuelVolume ? this.state.fuelFillingInfo.refuelVolume : ''}
                            onValueChange={(param) => this.setState((prevState, props) => {
                                return ({
                                    fuelFillingInfo: { ...prevState.fuelFillingInfo, refuelVolume: param }
                                })
                            })}
                            onRequire={(flag) => this.setState((prevState, props) => {
                                return ({
                                    validate: { ...prevState.validate, refuelVolumeValidate: flag }
                                })
                            })}
                            placeholder='请输入加油量'
                        />
                        <Select
                            title='指令编号：'
                            isRequire={false}
                            value={this.state.fuelFillingInfo.dpRouteTaskId ? this.state.fuelFillingInfo.dpRouteTaskId : '请选择'}
                            showList={Actions.cityRouteList}
                            onValueChange={(param) => this.setState((prevState, props) => {
                                return ({
                                    fuelFillingInfo: { ...prevState.fuelFillingInfo, dpRouteTaskId: param }
                                })
                            })}
                            defaultValue={'请选择'}
                        />
                        <CheckBox
                            isRequire={true}
                            title='加油地：'
                            listTitle='加油地'
                            defaultValue={'请选择'}
                            value={this.state.fuelFillingInfo.refuelAddressType ? fuelFillingTypeList.find(item => item.id == this.state.fuelFillingInfo.refuelAddressType).value : '请选择'}
                            itemList={fuelFillingTypeList}
                            onCheck={(param) => this.setState((prevState, props) => {
                                return ({
                                    fuelFillingInfo: { ...prevState.fuelFillingInfo, refuelAddressType: param.id }
                                })
                            })}
                            onRequire={(flag) => this.setState((prevState, props) => {
                                return ({
                                    validate: { ...prevState.validate, refuelAddressTypeValidate: flag }
                                })
                            })}
                        />
                        <TouchableOpacity
                            onPress={this.onPressPosition}>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd', padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 12 }}><Text style={{ fontWeight: 'bold' }}>定位：</Text>{this.state.fuelFillingInfo.refuelAddress ? this.state.fuelFillingInfo.refuelAddress : ''}</Text>
                                </View>
                                <View>
                                    <Icon name='ios-pin' style={{ color: '#00cade', fontSize: 16 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TextBox
                            isRequire={true}
                            title='加油金额：'
                            value={this.state.fuelFillingInfo.refuelMoney ? this.state.fuelFillingInfo.refuelMoney : ''}
                            onValueChange={(param) => this.setState((prevState, props) => {
                                return ({
                                    fuelFillingInfo: { ...prevState.fuelFillingInfo, refuelMoney: param }
                                })
                            })}
                            onRequire={(flag) => this.setState((prevState, props) => {
                                return ({
                                    validate: { ...prevState.validate, refuelMoneyValidate: flag }
                                })
                            })}
                            placeholder='请输入加油金额'
                        />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Button full
                            onPress={this.onCreateRefuel}
                            disabled={!(
                                this.state.validate.refuelDateValidate &&
                                this.state.validate.refuelVolumeValidate &&
                                this.state.validate.refuelMoneyValidate &&
                                this.state.validate.refuelAddressTypeValidate &&
                                this.state.validate.refuelTimeValidate
                            )}
                            style={{
                                backgroundColor: (
                                    this.state.validate.refuelDateValidate &&
                                    this.state.validate.refuelVolumeValidate &&
                                    this.state.validate.refuelMoneyValidate &&
                                    this.state.validate.refuelAddressTypeValidate &&
                                    this.state.validate.refuelTimeValidate
                                ) ? '#00cade' : '#888888'
                            }}>
                            <Text style={{ color: '#fff' }}>确定</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        fuelFillingApplyReducer: state.fuelFillingApplyReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    createFuelFillingApply: (param) => {
        dispatch(fuelFillingApplyAction.createFuelFillingApply(param))
    },
    resetCreateFuelFillingApply: () => {
        dispatch(fuelFillingApplyAction.resetCreateFuelFillingApply())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FuelFillingApply)