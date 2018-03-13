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
import * as FuelFillingRecordAction from '../../actions/FuelFillingRecordAction'
import { connect } from 'react-redux'
import { styleColor } from '../GlobalStyles'
class FuelFillingSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refuelDateStart: null,
            refuelDateEnd: null,
            refuelAddressType: null,
            checkStatus: null
        }
        this.onSearch = this.onSearch.bind(this)
    }

    componentWillMount() {
        const { refuelDateStart, refuelDateEnd, refuelAddressType, checkStatus } = this.props.fuelFillingRecordReducer.data.total
        this.setState({ refuelDateStart, refuelDateEnd, refuelAddressType, checkStatus })
    }

    onSearch() {
        this.props.changeSearchField({ ...this.state })
        Actions.pop()
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
                            value={fuelFillingTypeList.find(item => item.id == this.state.refuelAddressType) ?
                                fuelFillingTypeList.find(item => item.id == this.state.refuelAddressType).value :
                                '全部'}
                            itemList={[{ id: 99, value: '全部' }, ...fuelFillingTypeList]}
                            onCheck={(param) => this.setState({ refuelAddressType: param.id != 99 ? param.id : null })}
                        />
                        <CheckBox
                            title='审核结果：'
                            listTitle='审核结果'
                            value={fuelFillingCheckStatusList.find(item => item.id == this.state.checkStatus) ?
                                fuelFillingCheckStatusList.find(item => item.id == this.state.checkStatus).value :
                                '全部'}
                            itemList={[{ id: 99, value: '全部' }, ...fuelFillingCheckStatusList]}
                            onCheck={(param) => this.setState({ checkStatus: param.id != 99 ? param.id : null })} />
                        <View style={{ padding: 10 }}>
                            <Button onPress={this.onSearch} full style={{ backgroundColor: styleColor }}>
                                <Text style={{ color: '#fff' }}>搜索</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        fuelFillingRecordReducer: state.fuelFillingRecordReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeSearchField: (param) => {
        dispatch(FuelFillingRecordAction.changeSearchField(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FuelFillingSearch)
