import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    InteractionManager,
    ToastAndroid
} from 'react-native'
import { Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import * as FuelFillingRecordAction from '../../actions/FuelFillingRecordAction'
import moment from 'moment'
import fuelFillingTypeList from '../../config/fuelFillingType'

class FuelFillingRecord extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     refuelDateStart: moment().format('YYYY-MM-01'),
        //     refuelDateEnd: moment().format('YYYY-MM-DD'),
        // }
        this.renderExamining = this.renderExamining.bind(this)
        this.renderRefuse = this.renderRefuse.bind(this)
        this.renderCommon = this.renderCommon.bind(this)
        this._onEndReached = this._onEndReached.bind(this)
        this.renderHeader = this.renderHeader.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
    }

    componentWillMount() {
        this.props.changeSearchField({ refuelDateStart: moment().format('YYYY-MM-01'), refuelDateEnd: moment().format('YYYY-MM-DD') })
    }

    componentDidMount() {
        const { user } = this.props.userReducer.data
        this.props.setGetFuelFillingRecordWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getFuelFillingRecord({
            getDriverId: {
                requiredParam: {
                    userId: user.userId
                }
            },
            getFuelFillingRecord: {
                OptionalParam: {
                    refuelDateStart: this.props.fuelFillingRecordReducer.data.total.refuelDateStart,
                    refuelDateEnd: this.props.fuelFillingRecordReducer.data.total.refuelDateEnd,
                }
            },
            start: 0,
            size: 12
        }))
    }

    componentWillReceiveProps(nextProps) {
        const nextPropsTotal = nextProps.fuelFillingRecordReducer.data.total
        const propsTotal = this.props.fuelFillingRecordReducer.data.total
        const { user } = nextProps.userReducer.data
        if (nextPropsTotal.refuelDateStart != propsTotal.refuelDateStart
            || nextPropsTotal.refuelDateEnd != propsTotal.refuelDateEnd
            || nextPropsTotal.refuelAddressType != propsTotal.refuelAddressType
            || nextPropsTotal.checkStatus != propsTotal.checkStatus) {
            this.props.setGetFuelFillingRecordWaiting()
            let param = { ...nextProps.fuelFillingRecordReducer.data.total }
            for (key in param) {
                if (!param[key]) {
                    delete param[key]
                }
            }
            delete param.refuel_volume
            delete param.refuel_money
            InteractionManager.runAfterInteractions(() => this.props.getFuelFillingRecord({
                getDriverId: {
                    requiredParam: {
                        userId: user.userId
                    }
                },
                getFuelFillingRecord: {
                    OptionalParam: {
                        ...param
                    }
                },
                start: 0,
                size: 12
            }))
        }

        if (nextProps.isRefresh) {
            if (nextProps.refreshType == 'create') {
                if (propsTotal.refuelDateStart == moment().format('YYYY-MM-01')
                    && propsTotal.refuelDateEnd == moment().format('YYYY-MM-DD')
                    && propsTotal.refuelAddressType == null
                    && propsTotal.checkStatus == null) {
                    this.props.setGetFuelFillingRecordWaiting()
                    InteractionManager.runAfterInteractions(() => this.props.getFuelFillingRecord({
                        getDriverId: {
                            requiredParam: {
                                userId: user.userId
                            }
                        },
                        getFuelFillingRecord: {
                            OptionalParam: {
                                refuelDateStart: propsTotal.refuelDateStart,
                                refuelDateEnd: propsTotal.refuelDateEnd
                            }
                        },
                        start: 0,
                        size: 12
                    }))
                    Actions.refresh({ isRefresh: false, refreshType: null })
                }
                else {
                    this.props.changeSearchField({ refuelDateStart: moment().format('YYYY-MM-01'), refuelDateEnd: moment().format('YYYY-MM-DD'), refuelAddressType: null, checkStatus: null })
                }
            }
        }
    }

    _onEndReached(info) {

        const { user } = this.props.userReducer.data

        if (!this.props.fuelFillingRecordReducer.data.isComplete && this.props.fuelFillingRecordReducer.getFuelFillingRecordMore.isResultStatus != 1) {
            const { total } = this.props.fuelFillingRecordReducer.data
            let param = { ...total }
            delete param.refuel_volume
            delete param.refuel_money
            this.props.getFuelFillingRecordMore({
                getDriverId: {
                    requiredParam: {
                        userId: user.userId
                    }
                },
                getFuelFillingRecord: {
                    OptionalParam: {
                        ...param
                    }
                },
                start: this.props.fuelFillingRecordReducer.data.fuelFillingRecordList.length,
                size: 12
            })
        }

        if (this.props.fuelFillingRecordReducer.data.isComplete) {
            ToastAndroid.show('全部数据已加载完毕', ToastAndroid.SHORT);
        }
    }


    renderExamining(item, index) {
        return (
            <View key={index} style={{ backgroundColor: '#fff', marginHorizontal: 10, marginTop: 10, borderWidth: 0.5, borderColor: '#ccc', padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderColor: '#ccc', borderBottomWidth: 0.5, alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 11 }}>{item.refuel_date ? moment(new Date(item.refuel_date)).format('YYYY-MM-DD HH:mm') : ''}</Text>
                    <Text style={{ color: '#fa7377', fontSize: 13, fontWeight: 'bold' }}>正在审核</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总量：</Text>
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>{item.refuel_volume ? item.refuel_volume : ''}</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>ml</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总额：</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>¥</Text>
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>{item.refuel_money ? item.refuel_money : ''}</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>元</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>关联路线：</Text>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>{item.route_start ? item.route_start : ''}</Text>
                        <Text style={{ fontSize: 11, paddingHorizontal: 10 }}>{item.route_start ? '-->' : '无'}</Text>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>{item.route_end ? item.route_end : ''}</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>({item.dp_route_task_id ? item.dp_route_task_id : ''})</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>加油地：
                    <Text style={{ fontSize: 11, fontWeight: '100' }}>
                            {item.refuel_address ? item.refuel_address : ''}
                            <Text style={{ color: '#00cade', fontSize: 11, paddingLeft: 3 }}>{item.refuel_address_type ? `(${fuelFillingTypeList.find(typeItem => typeItem.id == item.refuel_address_type).value})` : ''}</Text>
                        </Text></Text>
                </View>
            </View>
        )
    }

    renderRefuse(item, index) {
        return (
            <View key={index} style={{ backgroundColor: '#fff', marginHorizontal: 10, marginTop: 10, borderWidth: 0.5, borderColor: '#ccc', padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderColor: '#ccc', borderBottomWidth: 0.5, alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 11 }}>{item.refuel_date ? moment(new Date(item.refuel_date)).format('YYYY-MM-DD HH:mm') : ''}</Text>
                    <Text style={{ fontSize: 11 }}>审核人：{item.check_user_name ? item.check_user_name : ''}</Text>
                    <Text style={{ color: '#fa7377', fontSize: 13, fontWeight: 'bold' }}>已拒绝</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总量：</Text>
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>{item.refuel_volume ? item.refuel_volume : ''}</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>ml</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总额：</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>¥</Text>
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>{item.refuel_money ? item.refuel_money : ''}</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>元</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>关联路线：</Text>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>{item.route_start ? item.route_start : ''}</Text>
                        <Text style={{ fontSize: 11, paddingHorizontal: 10 }}>{item.route_start ? '-->' : '无'}</Text>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>{item.route_end ? item.route_end : ''}</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>({item.dp_route_task_id ? item.dp_route_task_id : ''})</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>加油地：
                    <Text style={{ fontSize: 11, fontWeight: '100' }}>
                            {item.refuel_address ? item.refuel_address : ''}
                            <Text style={{ color: '#00cade', fontSize: 11, paddingLeft: 3 }}>{item.refuel_address_type ? `(${fuelFillingTypeList.find(typeItem => typeItem.id == item.refuel_address_type).value})` : ''}</Text>
                        </Text></Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>拒绝原因：<Text style={{ fontSize: 11, paddingLeft: 3 }}>{item.check_reason ? item.check_reason : ''}</Text></Text>
                    </Text>
                </View>
            </View>
        )
    }

    renderCommon(item, index) {
        return (
            <View key={index} style={{ backgroundColor: '#fff', marginHorizontal: 10, marginTop: 10, borderWidth: 0.5, borderColor: '#ccc', padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderColor: '#ccc', borderBottomWidth: 0.5, alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 11 }}>{item.refuel_date ? moment(new Date(item.refuel_date)).format('YYYY-MM-DD HH:mm') : ''}</Text>
                    <Text style={{ fontSize: 11 }}>审核人：{item.check_user_name ? item.check_user_name : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总量：</Text>
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>{item.refuel_volume ? item.refuel_volume : ''}</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>ml</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总额：</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>¥</Text>
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>{item.refuel_money ? item.refuel_money : ''}</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>元</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>关联路线：</Text>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>{item.route_start ? item.route_start : ''}</Text>
                        <Text style={{ fontSize: 11, paddingHorizontal: 10 }}>{item.route_start ? '-->' : '无'}</Text>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>{item.route_end ? item.route_end : ''}</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>({item.dp_route_task_id ? item.dp_route_task_id : ''})</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>加油地：
                    <Text style={{ fontSize: 11, fontWeight: '100' }}>
                            {item.refuel_address ? item.refuel_address : ''}
                            <Text style={{ color: '#00cade', fontSize: 11, paddingLeft: 3 }}>{item.refuel_address_type ? `(${fuelFillingTypeList.find(typeItem => typeItem.id == item.refuel_address_type).value})` : ''}</Text>
                        </Text></Text>
                </View>
            </View>
        )
    }

    renderHeader() {
        return (
            <View>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <View>
                        <Button small rounded onPress={Actions.fuelFillingApply} style={{ backgroundColor: '#00cade', justifyContent: 'space-around', paddingHorizontal: 10 }}>
                            <MaterialCommunityIcons name='gas-station' size={20} color='#fff' />
                            <Text style={{ color: '#fff', paddingLeft: 5 }}>加油申报</Text>
                        </Button>
                    </View>
                    <View>
                        <Button small rounded
                            onPress={Actions.fuelFillingSearch}
                            style={{ backgroundColor: '#fa7377', justifyContent: 'space-between' }}>
                            <Icon name='ios-search' style={{ fontSize: 20 }} />
                            <Text style={{ color: '#fff', paddingRight: 10 }}>搜索</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ backgroundColor: '#f1f8f9', borderWidth: 0.5, borderColor: '#fff', marginHorizontal: 10, padding: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', paddingBottom: 10 }}>
                        <View>
                            <Text style={{ color: '#00cade', fontSize: 13 }}>{this.props.fuelFillingRecordReducer.data.total.refuelDateStart ? this.props.fuelFillingRecordReducer.data.total.refuelDateStart : ''}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#a1a4a5' }}>至</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#00cade', fontSize: 13 }}>{this.props.fuelFillingRecordReducer.data.total.refuelDateEnd ? this.props.fuelFillingRecordReducer.data.total.refuelDateEnd : ''}</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总量：</Text>
                                <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>{this.props.fuelFillingRecordReducer.data.total.refuel_volume ? this.props.fuelFillingRecordReducer.data.total.refuel_volume : '0'}</Text>
                                <Text style={{ fontSize: 11, paddingLeft: 3 }}>ml</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总额：</Text>
                                <Text style={{ fontSize: 11, paddingLeft: 3 }}>¥</Text>
                                <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>{this.props.fuelFillingRecordReducer.data.total.refuel_money ? this.props.fuelFillingRecordReducer.data.total.refuel_money : '0'}</Text>
                                <Text style={{ fontSize: 11, paddingLeft: 3 }}>元</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        )
    }

    renderFooter() {
        if (this.props.fuelFillingRecordReducer.getFuelFillingRecordMore.isResultStatus == 1) {
            return (
                <View>
                    <ActivityIndicator
                        animating={this.props.fuelFillingRecordReducer.getFuelFillingRecordMore.isResultStatus == 1}
                        style={{ height: 40 }}
                        size="small"
                    />
                </View>
            )
        } else {
            return <View style={{ height: 10 }} />
        }

    }

    render() {
        const { getFuelFillingRecord } = this.props.fuelFillingRecordReducer
        console.log('this.props.fuelFillingRecordReducer', this.props.fuelFillingRecordReducer)
        if (getFuelFillingRecord.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#edf1f4', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getFuelFillingRecord.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#edf1f4' }}>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            ref='fuelFillingFlatList'
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={this.renderHeader}
                            data={this.props.fuelFillingRecordReducer.data.fuelFillingRecordList}
                            renderItem={({ item, index }) => {
                                if (item.check_status == 1) {
                                    return this.renderExamining(item, index)
                                } else if (item.check_status == 3) {
                                    return this.renderRefuse(item, index)
                                } else {
                                    return this.renderCommon(item, index)
                                }
                            }}
                            onEndReachedThreshold={1}
                            onEndReached={this._onEndReached}
                            ListFooterComponent={this.renderFooter()}
                        />
                    </View>
                </View>
            )
        }
    }
}



const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        fuelFillingRecordReducer: state.fuelFillingRecordReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getFuelFillingRecord: (param) => {
        dispatch(FuelFillingRecordAction.getFuelFillingRecord(param))
    },
    setGetFuelFillingRecordWaiting: () => {
        dispatch(FuelFillingRecordAction.setGetFuelFillingRecordWaiting())
    },
    getFuelFillingRecordMore: (param) => {
        dispatch(FuelFillingRecordAction.getFuelFillingRecordMore(param))
    },
    setGetFuelFillingRecordMoreWaiting: () => {
        dispatch(FuelFillingRecordAction.setGetFuelFillingRecordMoreWaiting())
    },
    changeSearchField: (param) => {
        dispatch(FuelFillingRecordAction.changeSearchField(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FuelFillingRecord)