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
            refuelAddressType: 99,
            checkStatus: 99
        }
        this.onSearch = this.onSearch.bind(this)
    }

    componentWillMount() {
        this.setState({
            refuelDateStart: this.props.initParam.refuelDateStart,
            refuelDateEnd: this.props.initParam.refuelDateEnd,
            refuelAddressType: this.props.initParam.refuelAddressType,
            checkStatus: this.props.initParam.checkStatus
        })
    }

    onSearch() {
        Actions.pop()
        this.props.initParam.onSearch({...this.state})
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
                            value={this.state.refuelAddressType ? fuelFillingTypeList.find(item => item.id == this.state.refuelAddressType).value : ''}
                            itemList={fuelFillingTypeList}
                            onCheck={(param) => this.setState({ refuelAddressType: param.id })}
                        />
                        <CheckBox
                            title='审核结果：'
                            listTitle='审核结果'
                            value={this.state.checkStatus ? fuelFillingCheckStatusList.find(item => item.id == this.state.checkStatus).value : ''}
                            itemList={fuelFillingCheckStatusList}
                            onCheck={(param) => this.setState({ checkStatus: param.id })} />
                        <View style={{ padding: 10 }}>
                            <Button onPress={this.onSearch} full style={{ backgroundColor: '#00cade' }}>
                                <Text style={{ color: '#fff' }}>搜索</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
