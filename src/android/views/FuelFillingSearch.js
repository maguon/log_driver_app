import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import { Button } from 'native-base'
import DateTimePicker from '../components/form/DateTimePicker'
import CheckBox from '../components/form/CheckBox'
import { Actions } from 'react-native-router-flux'
import fuelFillingTypeList from '../../config/fuelFillingType'
import fuelFillingCheckStatusList from '../../config/fuelFillingCheckStatus'

export default class FuelFillingSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refuelDateStart: '',
            refuelDateEnd: '',
            refuelAddressType: '',
            refuelAddressTypeValue: '',
            checkStatus: '',
            checkStatusValue: ''
        }
        this.onSearch = this.onSearch.bind(this)
    }

    onSearch() {
        console.log(this.state)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>
                        <DateTimePicker
                            value={this.state.refuelDateStart ? this.state.refuelDateStart : '请选择'}
                            title='起始时间：'
                            defaultValue={'请选择'}
                            onValueChange={(param) => this.setState({ refuelDateStart: param })}
                        />
                        <DateTimePicker
                            value={this.state.refuelDateEnd ? this.state.refuelDateEnd : '请选择'}
                            title='终止时间：'
                            defaultValue={'请选择'}
                            onValueChange={(param) => this.setState({ refuelDateEnd: param })}
                        />
                        <CheckBox
                            title='加油地：'
                            listTitle='加油地'
                            value={this.state.refuelAddressTypeValue ? this.state.refuelAddressTypeValue : '请选择'}
                            itemList={fuelFillingTypeList}
                            onCheck={(param) => this.setState({ refuelAddressType: param.id, refuelAddressTypeValue: param.value })}
                        />
                        <CheckBox
                            title='审核结果：'
                            listTitle='审核结果'
                            value={this.state.checkStatusValue ? this.state.checkStatusValue : '请选择'}
                            itemList={fuelFillingCheckStatusList}
                            onCheck={(param) => this.setState({ checkStatus: param.id, checkStatusValue: param.value })} />
                        <View style={{ padding: 10 }}>
                            <Button onPress={() => { }} full style={{ backgroundColor: '#00cade' }}>
                                <Text style={{ color: '#fff' }}>搜索</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
