import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'
import { Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import * as FuelFillingRecordAction from '../../actions/FuelFillingRecordAction'
import moment from 'moment'

class FuelFillingRecord extends Component {
    constructor(props) {
        super(props)
        this.renderExamining = this.renderExamining.bind(this)
        this.renderRefuse = this.renderRefuse.bind(this)
        this.renderCommon = this.renderCommon.bind(this)
    }

    componentDidMount() {
        this.props.getFuelFillingRecord({
            OptionalParam: {
                driveId: 1,
                refuelDateStart: '2017-9-1',
                refuelDateEnd: '2017-9-30'
            }
        })
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
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>2569</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>ml</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总额：</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>¥</Text>
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>2569</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>元</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>关联路线：</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>No.1234567</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>大连</Text>
                        <Text style={{ fontSize: 11, paddingHorizontal: 10 }}>--></Text>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>沈阳</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>加油地：</Text>
                    <Text style={{ color: '#00cade', fontSize: 11, paddingLeft: 3 }}>内部加油</Text>
                    <Text style={{ fontSize: 11, paddingHorizontal: 5 }}>-</Text>
                    <Text style={{ fontSize: 11 }}>辽宁大连市甘井子区</Text>
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
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>2569</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>ml</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总额：</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>¥</Text>
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>2569</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>元</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>关联路线：</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>No.1234567</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>大连</Text>
                        <Text style={{ fontSize: 11, paddingHorizontal: 10 }}>--></Text>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>沈阳</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>加油地：</Text>
                    <Text style={{ color: '#00cade', fontSize: 11, paddingLeft: 3 }}>内部加油</Text>
                    <Text style={{ fontSize: 11, paddingHorizontal: 5 }}>-</Text>
                    <Text style={{ fontSize: 11 }}>辽宁大连市甘井子区</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>拒绝原因：</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>辽宁大连市甘井子区辽宁大连市甘井子区辽宁大连市甘井子区辽宁大连市甘井子区辽宁大连市甘井子区辽宁大连市甘井子区辽宁大连市甘井子区辽宁大连市甘井子区辽宁大连市甘井子区</Text>
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
                    <Text style={{ fontSize: 11 }}>审核人：张某某</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总量：</Text>
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>2569</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>ml</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总额：</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>¥</Text>
                        <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>2569</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>元</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>关联路线：</Text>
                        <Text style={{ fontSize: 11, paddingLeft: 3 }}>No.1234567</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>大连</Text>
                        <Text style={{ fontSize: 11, paddingHorizontal: 10 }}>--></Text>
                        <Text style={{ fontSize: 11, color: '#00cade' }}>沈阳</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>加油地：</Text>
                    <Text style={{ color: '#00cade', fontSize: 11, paddingLeft: 3 }}>内部加油</Text>
                    <Text style={{ fontSize: 11, paddingHorizontal: 5 }}>-</Text>
                    <Text style={{ fontSize: 11 }}>辽宁大连市甘井子区</Text>
                </View>
            </View>
        )
    }

    render() {
        console.log(this.props.fuelFillingRecordReducer)
        return (
            <View style={{ flex: 1, backgroundColor: '#edf1f4' }}>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <View>
                        <Button small rounded onPress={Actions.fuelFillingApply} style={{ backgroundColor: '#00cade' }}>
                            <MaterialCommunityIcons name='gas-station' size={20} color='#fff' />
                            <Text style={{ color: '#fff', paddingLeft: 5 }}>加油申报</Text>
                        </Button>
                    </View>
                    <View>
                        <Button small rounded onPress={() => { }} style={{ backgroundColor: '#fa7377' }}>
                            <Icon name='ios-search' style={{ fontSize: 20 }} />
                            <Text style={{ color: '#fff', paddingLeft: 5 }}>搜索</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ backgroundColor: '#f1f8f9', borderWidth: 0.5, borderColor: '#fff', marginHorizontal: 10, padding: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', paddingBottom: 10 }}>
                        <View>
                            <Text style={{ color: '#00cade', fontSize: 13 }}>2017-08-01</Text>
                        </View>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#a1a4a5' }}>至</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#00cade', fontSize: 13 }}>2017-08-30</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总量：</Text>
                                <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>2569</Text>
                                <Text style={{ fontSize: 11, paddingLeft: 3 }}>ml</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 11, borderColor: '#ccc', fontWeight: 'bold' }}>加油总额：</Text>
                                <Text style={{ fontSize: 11, paddingLeft: 3 }}>¥</Text>
                                <Text style={{ fontSize: 13, color: '#fa7377', paddingLeft: 3 }}>2569</Text>
                                <Text style={{ fontSize: 11, paddingLeft: 3 }}>元</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
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
                />
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
    getFuelFillingRecord: (param) => {
        dispatch(FuelFillingRecordAction.getFuelFillingRecord(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FuelFillingRecord)