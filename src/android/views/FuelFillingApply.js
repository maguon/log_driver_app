import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'

import { Button } from 'native-base'
import DateTimePicker from '../components/form/DateTimePicker'
import TextBox from '../components/form/TextBox'
import Select from '../components/form/Select'
import moment from 'moment'
import fuelFillingTypeList from '../../config/fuelFillingType'
import CheckBox from '../components/form/CheckBox'

export default class FuelFillingApply extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refuelDate: '',
            refuelVolume: 0,
            cityRouteId: 0,
            refuelAddressType: 0,
            refuelAddress: "string",
            lng: 0,
            lat: 0,
            refuelMoney: 0
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd', padding: 10 }}>
                            <Text style={{ fontSize: 12 }}><Text style={{ fontWeight: 'bold' }}>申报时间：</Text>{moment().format('YYYY-MM-DD HH:mm')}</Text>
                        </View>
                        <DateTimePicker
                            isRequire={true}
                            value={this.state.refuelDate ? this.state.refuelDate : '请选择'}
                            title='加油时间：'
                            defaultValue={'请选择'}
                            onRequire={(flag) => { }}
                            onValueChange={(param) => this.setState({ refuelDate: param })}
                        />
                        <TextBox
                            isRequire={true}
                            title='加油量：'
                            value={this.state.refuelVolume ? this.state.refuelVolume : ''}
                            onValueChange={(param) => this.setState({ refuelVolume: param })}
                            onRequire={(flag) => { }}
                            placeholder='请输入加油量'
                        />
                        <Select
                            title='指令编号：'
                            isRequire={false}
                            value={'请选择'}
                            onValueChange={(param) => { }}
                            onRequire={(flag) => { }}
                            defaultValue={'请选择'}
                        />
                        <CheckBox
                            title='加油地：'
                            listTitle='加油地'
                            value={this.state.refuelAddressType ? fuelFillingTypeList.find(item => item.id == this.state.refuelAddressType).value : ''}
                            itemList={fuelFillingTypeList}
                            onCheck={(param) => this.setState({ refuelAddressType: param.id })}
                        />
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd', padding: 10 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>定位</Text>
                        </View>
                        <TextBox
                            isRequire={true}
                            title='加油金额：'
                            value={this.state.refuelMoney ? this.state.refuelMoney : ''}
                            onValueChange={(param) => this.setState({ refuelMoney: param })}
                            onRequire={(flag) => { }}
                            placeholder='请输入加油金额'
                        />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Button onPress={() => { }} full style={{ backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>确定</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
