import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native'

import { Button, Icon } from 'native-base'
import DateTimePicker from '../components/form/DateTimePicker'
import TextBox from '../components/form/TextBox'
import Select from '../components/form/Select'
import moment from 'moment'
import fuelFillingTypeList from '../../config/fuelFillingType'
import CheckBox from '../components/form/CheckBox'
import { Actions } from 'react-native-router-flux'
import AMapLocation from 'react-native-amap-location'

export default class FuelFillingApply extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fuelFillingInfo: {
                refuelDate: '',
                refuelVolume: 0,
                cityRouteId: 0,
                refuelAddressType: 0,
                refuelAddress: '',
                lng: 0,
                lat: 0,
                refuelMoney: 0
            },
            validate: {
                refuelDateValidate: false,
                refuelVolumeValidate: false,
                refuelMoneyValidate: false
            }
        }
        this.onPressPosition = this.onPressPosition.bind(this)
        this.onCreateRefuel = this.onCreateRefuel.bind(this)
    }

    onCreateRefuel() {
        let param = { ...this.state.fuelFillingInfo }
        for(key in param){
            if(!param[key]){
                
            }
        }
    }

    onPressPosition() {
        let listener = AMapLocation.addEventListener((data) => {
            console.log('daaddressta', data)
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
        //{this.state.refuelAddress ? this.state.refuelAddress : ''}
        console.log('onPressPosition')
    }

    render() {
        console.log(this.state)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd', padding: 10 }}>
                            <Text style={{ fontSize: 12 }}><Text style={{ fontWeight: 'bold' }}>申报时间：</Text>{moment().format('YYYY-MM-DD HH:mm')}</Text>
                        </View>
                        <DateTimePicker
                            isRequire={true}
                            value={this.state.fuelFillingInfo.refuelDate ? this.state.fuelFillingInfo.refuelDate : '请选择'}
                            title='加油时间：'
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
                            value={this.state.fuelFillingInfo.cityRouteId ? this.state.fuelFillingInfo.cityRouteId : '请选择'}
                            showList={Actions.cityRouteList}
                            onValueChange={(param) => this.setState((prevState, props) => {
                                return ({
                                    fuelFillingInfo: { ...prevState.fuelFillingInfo, cityRouteId: param }
                                })
                            })}
                            defaultValue={'请选择'}
                        />
                        <CheckBox
                            title='加油地：'
                            listTitle='加油地'
                            value={this.state.fuelFillingInfo.refuelAddressType ? fuelFillingTypeList.find(item => item.id == this.state.fuelFillingInfo.refuelAddressType).value : ''}
                            itemList={fuelFillingTypeList.filter(item => item.id != 99)}
                            onCheck={(param) => this.setState((prevState, props) => {
                                return ({
                                    fuelFillingInfo: { ...prevState.fuelFillingInfo, refuelAddressType: param.id }
                                })
                            })}
                        />
                        <TouchableNativeFeedback
                            onPress={this.onPressPosition}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd', padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 12 }}><Text style={{ fontWeight: 'bold' }}>定位：</Text>辽宁省大连市金州区金马路靠近中国建设银行(大连经济技术开发区分行)</Text>
                                </View>
                                <View>
                                    <Icon name='ios-pin' style={{ color: '#00cade', fontSize: 16 }} />
                                </View>
                            </View>
                        </TouchableNativeFeedback>
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
                            onPress={() => { }}
                            disabled={!(
                                this.state.validate.refuelDateValidate &&
                                this.state.validate.refuelVolumeValidate &&
                                this.state.validate.refuelMoneyValidate
                            )}
                            style={{
                                backgroundColor: (
                                    this.state.validate.refuelDateValidate &&
                                    this.state.validate.refuelVolumeValidate &&
                                    this.state.validate.refuelMoneyValidate
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
