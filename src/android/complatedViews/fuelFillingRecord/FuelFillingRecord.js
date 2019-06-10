import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    InteractionManager
} from 'react-native'
import { Icon, Button, Container, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import * as FuelFillingRecordAction from './FuelFillingRecordAction'
import moment from 'moment'
import fuelFillingTypeList from '../../../config/fuelFillingType'
import globalStyles, { styleColor } from '../../GlobalStyles'


class FuelFillingRecord extends Component {
    constructor(props) {
        super(props)
        // this.renderExamining = this.renderExamining.bind(this)

        // this.renderRefuse = this.renderRefuse.bind(this)
        // this.renderCommon = this.renderCommon.bind(this)
        this.renderListItem = this.renderListItem.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
    }


    componentDidMount() {
        this.props.getFuelFillingRecordWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getFuelFillingRecord())
    }

    // renderExamining(item, index) {
    //     return (
    //         <View key={index} style={{ backgroundColor: '#fff', marginHorizontal: 10, marginTop: 10, borderWidth: 0.5, borderColor: '#ccc', padding: 10 }}>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderColor: '#ccc', borderBottomWidth: 0.5, alignItems: 'flex-end' }}>
    //                 <Text style={globalStyles.smallText}>{item.refuel_date ? moment(new Date(item.refuel_date)).format('YYYY-MM-DD HH:mm') : ''}</Text>
    //                 <Text style={[globalStyles.midText, { color: '#fa7377', fontWeight: 'bold' }]}>正在审核</Text>
    //             </View>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
    //                 <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    //                     <Text style={[globalStyles.smallText, { borderColor: '#ccc', fontWeight: 'bold' }]}>加油总量：</Text>
    //                     <Text style={[globalStyles.smallText, { color: '#fa7377', paddingLeft: 3 }]}>{item.refuel_volume ? item.refuel_volume : '0'}</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>升</Text>
    //                 </View>
    //                 <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    //                     <Text style={[globalStyles.smallText, { borderColor: '#ccc', fontWeight: 'bold' }]}>加油总额：</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>¥</Text>
    //                     <Text style={[globalStyles.smallText, { color: '#fa7377', paddingLeft: 3 }]}>{item.refuel_money ? item.refuel_money : '0'}</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>元</Text>
    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
    //                 <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    //                     <Text style={[globalStyles.smallText, { fontWeight: 'bold' }]}>关联路线：</Text>
    //                     <Text style={[globalStyles.smallText, { color: styleColor }]}>{item.route_start ? item.route_start : ''}</Text>
    //                     {item.route_start && <MaterialCommunityIcons name='ray-start-arrow' size={15} style={{ color: '#8c989f', paddingLeft: 3 }} />}
    //                     <Text style={[globalStyles.smallText, { color: styleColor, paddingLeft: 3 }]}>{item.route_end ? item.route_end : ''}</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>{item.dp_route_task_id ? `(${item.dp_route_task_id})` : ''}</Text>
    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row' }}>
    //                 <Text style={[globalStyles.smallText, { fontWeight: 'bold' }]}>加油地：
    //                 <Text style={[globalStyles.smallText, { fontWeight: '100' }]}>
    //                         {item.refuel_address ? item.refuel_address : ''}
    //                         <Text style={[globalStyles.smallText, { color: styleColor, paddingLeft: 3 }]}>{item.refuel_address_type ? `(${fuelFillingTypeList.find(typeItem => typeItem.id == item.refuel_address_type).value})` : ''}</Text>
    //                     </Text></Text>
    //             </View>
    //         </View>
    //     )
    // }

    // renderRefuse(item, index) {
    //     return (
    //         <View key={index} style={{ backgroundColor: '#fff', marginHorizontal: 10, marginTop: 10, borderWidth: 0.5, borderColor: '#ccc', padding: 10 }}>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderColor: '#ccc', borderBottomWidth: 0.5, alignItems: 'flex-end' }}>
    //                 <Text style={globalStyles.smallText}>{item.refuel_date ? moment(new Date(item.refuel_date)).format('YYYY-MM-DD HH:mm') : ''}</Text>
    //                 <Text style={globalStyles.smallText}>审核人：{item.check_user_name ? item.check_user_name : ''}</Text>
    //                 <Text style={[globalStyles.midText, { color: '#fa7377', fontWeight: 'bold' }]}>已拒绝</Text>
    //             </View>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
    //                 <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    //                     <Text style={[globalStyles.smallText, { borderColor: '#ccc', fontWeight: 'bold' }]}>加油总量：</Text>
    //                     <Text style={[globalStyles.smallText, { color: '#fa7377', paddingLeft: 3 }]}>{item.refuel_volume ? item.refuel_volume : '0'}</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>升</Text>
    //                 </View>
    //                 <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    //                     <Text style={[globalStyles.smallText, { borderColor: '#ccc', fontWeight: 'bold' }]}>加油总额：</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>¥</Text>
    //                     <Text style={[globalStyles.smallText, { color: '#fa7377', paddingLeft: 3 }]}>{item.refuel_money ? item.refuel_money : '0'}</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>元</Text>
    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
    //                 <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    //                     <Text style={[globalStyles.smallText, { fontWeight: 'bold' }]}>关联路线：</Text>
    //                     <Text style={[globalStyles.smallText, { color: styleColor }]}>{item.route_start ? item.route_start : ''}</Text>
    //                     {item.route_start && <MaterialCommunityIcons name='ray-start-arrow' size={15} style={{ color: '#8c989f', paddingLeft: 3 }} />}
    //                     <Text style={[globalStyles.smallText, { color: styleColor, paddingLeft: 3 }]}>{item.route_end ? item.route_end : ''}</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>{item.dp_route_task_id ? `(${item.dp_route_task_id})` : ''}</Text>
    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row' }}>
    //                 <Text style={[globalStyles.smallText, { fontWeight: 'bold' }]}>加油地：
    //                 <Text style={[globalStyles.smallText, { fontWeight: '100' }]}>
    //                         {item.refuel_address ? item.refuel_address : ''}
    //                         <Text style={[globalStyles.smallText, { color: styleColor, paddingLeft: 3 }]}>{item.refuel_address_type ? `(${fuelFillingTypeList.find(typeItem => typeItem.id == item.refuel_address_type).value})` : ''}</Text>
    //                     </Text></Text>
    //             </View>
    //             <View style={{ flexDirection: 'row' }}>
    //                 <Text>
    //                     <Text style={[globalStyles.smallText, { fontWeight: 'bold' }]}>拒绝原因：<Text style={{ paddingLeft: 3 }}>{item.check_reason ? item.check_reason : ''}</Text></Text>
    //                 </Text>
    //             </View>
    //         </View>
    //     )
    // }

    // renderCommon(item, index) {
    //     return (
    //         <View key={index} style={{ backgroundColor: '#fff', marginHorizontal: 10, marginTop: 10, borderWidth: 0.5, borderColor: '#ccc', padding: 10 }}>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderColor: '#ccc', borderBottomWidth: 0.5, alignItems: 'flex-end' }}>
    //                 <Text style={globalStyles.smallText}>{item.refuel_date ? moment(new Date(item.refuel_date)).format('YYYY-MM-DD HH:mm') : ''}</Text>
    //                 <Text style={globalStyles.smallText}>审核人：{item.check_user_name ? item.check_user_name : ''}</Text>
    //             </View>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
    //                 <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    //                     <Text style={[globalStyles.smallText, { borderColor: '#ccc', fontWeight: 'bold' }]}>加油总量：</Text>
    //                     <Text style={[globalStyles.smallText, { color: '#fa7377', paddingLeft: 3 }]}>{item.refuel_volume ? item.refuel_volume : '0'}</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>升</Text>
    //                 </View>
    //                 <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    //                     <Text style={[globalStyles.smallText, { borderColor: '#ccc', fontWeight: 'bold' }]}>加油总额：</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>¥</Text>
    //                     <Text style={[globalStyles.smallText, { color: '#fa7377', paddingLeft: 3 }]}>{item.refuel_money ? item.refuel_money : '0'}</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>元</Text>
    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
    //                 <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    //                     <Text style={[globalStyles.smallText, { fontWeight: 'bold' }]}>关联路线：</Text>
    //                     <Text style={[globalStyles.smallText, { color: styleColor }]}>{item.route_start ? item.route_start : ''}</Text>
    //                     {item.route_start && <MaterialCommunityIcons name='ray-start-arrow' size={15} style={{ color: '#8c989f', paddingLeft: 3 }} />}
    //                     <Text style={[globalStyles.smallText, { color: styleColor, paddingLeft: 3 }]}>{item.route_end ? item.route_end : ''}</Text>
    //                     <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>{item.dp_route_task_id ? `(${item.dp_route_task_id})` : ''}</Text>
    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row' }}>
    //                 <Text style={[globalStyles.smallText, { fontWeight: 'bold' }]}>加油地：
    //                 <Text style={[globalStyles.smallText, { fontWeight: '100' }]}>
    //                         {item.refuel_address ? item.refuel_address : ''}
    //                         <Text style={[globalStyles.smallText, { color: styleColor, paddingLeft: 3 }]}>{item.refuel_address_type ? `(${fuelFillingTypeList.find(typeItem => typeItem.id == item.refuel_address_type).value})` : ''}</Text>
    //                     </Text></Text>
    //             </View>
    //         </View>
    //     )
    // }


    renderListItem(item, index) {
        return (
            <View key={index} style={{ backgroundColor: '#fff', marginHorizontal: 10, marginTop: 10, borderWidth: 0.5, borderColor: '#ccc', padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderColor: '#ccc', borderBottomWidth: 0.5, alignItems: 'flex-end' }}>
                    <Text style={globalStyles.smallText}>{item.date_id ? moment(`${item.date_id}`).format('YYYY-MM-DD') : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={[globalStyles.smallText, { borderColor: '#ccc', fontWeight: 'bold' }]}>加油量：</Text>
                        <Text style={[globalStyles.smallText, { color: '#fa7377', paddingLeft: 3 }]}>{item.oil ? item.oil : '0'}</Text>
                        <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>升</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={[globalStyles.smallText, { borderColor: '#ccc', fontWeight: 'bold' }]}>加尿素量：</Text>
                        <Text style={[globalStyles.smallText, { color: '#fa7377', paddingLeft: 3 }]}>{item.urea ? item.urea : '0'}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[globalStyles.smallText, { fontWeight: 'bold' }]}>加油地：
                    <Text style={[globalStyles.smallText, { fontWeight: '100' }]}>
                            {item.oil_address ? item.oil_address : ''}
                            <Text style={[globalStyles.smallText, { color: styleColor, paddingLeft: 3 }]}>{item.oil_address_type ? `(${fuelFillingTypeList.find(typeItem => typeItem.id == item.oil_address_type).value})` : ''}</Text>
                        </Text></Text>
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
                        color={styleColor}
                        size="small"
                    />
                </View>
            )
        } else {
            return <View style={{ height: 10 }} />
        }

    }

    render() {
        const { form: { fuelFillingSearch }, fuelFillingRecordReducer: { getFuelFillingRecord } } = this.props
        if (getFuelFillingRecord.isResultStatus == 1) {
            return (
                <Container style={{ backgroundColor: '#edf1f4' }}>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container style={{ backgroundColor: '#edf1f4' }}>
                    <FlatList
                        ref='fuelFillingFlatList'
                        keyExtractor={(item, index) => index}
                        data={this.props.fuelFillingRecordReducer.data.fuelFillingRecordList}
                        renderItem={({ item, index }) => {
                            return this.renderListItem(item, index)
                            // if (item.check_status == 1) {
                            //     return this.renderExamining(item, index)
                            // } else if (item.check_status == 3) {
                            //     return this.renderRefuse(item, index)
                            // } else {
                            //     return this.renderCommon(item, index)
                            // }
                        }}
                        onEndReachedThreshold={1}
                        onEndReached={this.props.getFuelFillingRecordMore}
                        ListFooterComponent={this.renderFooter()}
                        ListHeaderComponent={<Header fuelFillingRecordReducer={this.props.fuelFillingRecordReducer} fuelFillingSearch={fuelFillingSearch} />}
                    />
                </Container>
            )
        }
    }
}


const Header = props => {
    const { fuelFillingRecordReducer: { data: { total: { oilDateStart, oilDateEnd, oil_money, urea_money } } }, fuelFillingRecordReducer } = props
    console.log('props', props)
    return (
        <View>
            {/* <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                <View>
                    <Button small rounded onPress={Actions.fuelFillingApply} style={{ backgroundColor: styleColor, justifyContent: 'space-around', paddingHorizontal: 10 }}>
                        <MaterialCommunityIcons name='gas-station' size={20} color='#fff' />
                        <Text style={[globalStyles.midText, { color: '#fff', paddingLeft: 5 }]}>加油申报</Text>
                    </Button>
                </View>
                <View>
                    <Button small rounded
                        onPress={() => Actions.fuelFillingSearch({
                            initParam: {
                                refuelDateStart,
                                refuelDateEnd,
                                refuelAddressType,
                                checkStatus
                            }
                        })}
                        style={{ backgroundColor: '#fa7377', justifyContent: 'space-between' }}>
                        <Icon name='ios-search' style={{ fontSize: 20 }} />
                        <Text style={[globalStyles.midText, { color: '#fff', paddingRight: 10 }]}>搜索</Text>
                    </Button>
                </View>
            </View> */}
            <View style={{ backgroundColor: '#f1f8f9', borderWidth: 0.5, borderColor: '#fff', marginHorizontal: 10, padding: 10, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', paddingBottom: 10 }}>
                    <View>
                        <Text style={[globalStyles.smallText, globalStyles.styleColor]}>{oilDateStart}</Text>
                    </View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={[globalStyles.smallText]}>至</Text>
                    </View>
                    <View>
                        <Text style={[globalStyles.smallText, globalStyles.styleColor]}>{oilDateEnd}</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={globalStyles.smallText}>加油总额：</Text>
                            <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>¥</Text>
                            <Text style={[globalStyles.smallText, { color: '#fa7377', paddingLeft: 3 }]}>{oil_money ? oil_money : '0'}</Text>
                            <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>元</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={globalStyles.smallText}>加尿素总额：</Text>
                            <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>¥</Text>
                            <Text style={[globalStyles.smallText, { color: '#fa7377', paddingLeft: 3 }]}>{urea_money ? urea_money : '0'}</Text>
                            <Text style={[globalStyles.smallText, { paddingLeft: 3 }]}>元</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}



const mapStateToProps = (state) => {
    return {
        fuelFillingRecordReducer: state.fuelFillingRecordReducer,
        form: state.form
    }
}

const mapDispatchToProps = (dispatch) => ({
    getFuelFillingRecord: (param) => {
        dispatch(FuelFillingRecordAction.getFuelFillingRecord(param))
    },
    getFuelFillingRecordWaiting: () => {
        dispatch(FuelFillingRecordAction.getFuelFillingRecordWaiting())
    },
    getFuelFillingRecordMore: () => {
        dispatch(FuelFillingRecordAction.getFuelFillingRecordMore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FuelFillingRecord)