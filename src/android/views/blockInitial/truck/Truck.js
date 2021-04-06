import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { ListItem, Left, Thumbnail, Body, Right, Content, Container, Icon } from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { connect } from 'react-redux'
import * as truckAction from './TruckAction'
import FontTag from '../../../components/FontTag'
import * as accidentListAction from '../../../complatedViews/accidentList/AccidentListAction'
import * as cleanRelListAction from '../../../complatedViews/cleanRelList/CleanRelListAction'
import * as demageListAction from '../../../notUsed/demageList/DemageListAction'
import * as accidentResponsibilityListAction from '../../../complatedViews/accidentResponsibilityList/AccidentResponsibilityListAction'
import * as demageResponsibilityListAction from '../../../complatedViews/demageResponsibilityList/DemageResponsibilityListAction'
import * as massLossListAction from '../../../complatedViews/massLossList/MassLossListAction'
import * as taskLoanListAction from '../../../complatedViews/taskLoanList/taskLoanListAction'
import * as actions from '../../../../actions'

class Truck extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getDriverInfo()
    }

    render() {
        const { communicationSettingReducer: { data: { file_host } } } = this.props
        const { truckReducer: { data: { driverInfo: { company_name, operate_type } } }, loginReducer: { data: { user: { avatar_image, real_name, mobile } } },
            getAccidentList, getAccidentListWaiting, getAccidentResponsibilityList, getAccidentListResponsibilityWaiting, getCleanRelList,
            getCleanRelListWaiting, getDemageResponsibilityList, getDemageResponsibilityListWaiting,getMassLossList, getMassLossListWaiting, getTaskLoanList, getTaskLoanListWaiting,
            getOveruseDieselOilList, getOveruseDieselOilListWaiting, getPeccancyListWaiting, getPeccancyList, getNotSettleListWaiting, getNotSettleList,
            getSalaryListWaiting, getSalaryList, getRouteTaskFeeListWaiting, getRouteTaskFeeList, getCashOilList, getCashOilListWaiting,
            getCashRepairList, getCashRepairListWaiting, getCashTollListWaiting, getCashTollList } = this.props
        return (
            <Container>
                <View style={{ backgroundColor: styleColor, flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10 }}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.truckInfo}>
                        <MaterialCommunityIcons name='truck' size={30} color='#fff' />
                        <Text style={[globalStyles.smallText, { color: '#fff' }]}>车头资料</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.trailerInfo}>
                        <MaterialCommunityIcons name='truck-trailer' size={30} color='#fff' />
                        <Text style={[globalStyles.smallText, { color: '#fff' }]}>挂车资料</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.driverInfo}>
                        <MaterialCommunityIcons name='account' size={30} color='#fff' />
                        <Text style={[globalStyles.smallText, { color: '#fff' }]}>个人资料</Text>
                    </TouchableOpacity>
                </View>
                <Content showsVerticalScrollIndicator={false} >
                    <ListItem avatar style={{ marginLeft: 0, padding: 15, borderBottomWidth: 0.3, borderBottomColor: '#ddd' }}>
                        <Left>
                            <Thumbnail source={{ uri: avatar_image ? `${file_host}/image/${avatar_image}` : `personalicon` }} />
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }}>
                            <View>
                                <Text style={globalStyles.midText}>{real_name ? `${real_name}` : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={globalStyles.midText}>{company_name ? `${company_name}` : ''} {mobile ? `${mobile}` : ''}</Text>
                            </View>
                        </Body>
                        <Right style={{ borderBottomWidth: 0 }}>
                            {operate_type == 1 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />}
                            {operate_type == 2 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff' />}
                            {operate_type == 3 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff' />}
                            {operate_type == 4 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff' />}
                        </Right>
                    </ListItem>
                    <View style={{ padding: 5 }}  >
                        <View style={styles.itemGroup}>
                            {/* <TouchableOpacity style={styles.item} onPress={() => {
                                getDemageListWaiting()
                                Actions.demageList()
                                InteractionManager.runAfterInteractions(getDemageList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='car-sports' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>商品车质损申报</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getAccidentListWaiting()
                                Actions.accidentList()
                                InteractionManager.runAfterInteractions(getAccidentList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <Entypo name='traffic-cone' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>货车事故申报</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemGroup}>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getDemageResponsibilityListWaiting()
                                Actions.demageResponsibilityList()
                                InteractionManager.runAfterInteractions(getDemageResponsibilityList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='car-sports' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>商品车责任</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.item} onPress={() => {
                                getMassLossListWaiting()
                                Actions.massLossList()
                                InteractionManager.runAfterInteractions(getMassLossList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='alert' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>到店质损</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getAccidentListResponsibilityWaiting()
                                Actions.accidentResponsibilityList()
                                InteractionManager.runAfterInteractions(getAccidentResponsibilityList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='truck' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>货车责任</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemGroup}>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getPeccancyListWaiting()
                                Actions.peccancyList()
                                InteractionManager.runAfterInteractions(getPeccancyList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='cash-multiple' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>违章扣款</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getOveruseDieselOilListWaiting()
                                Actions.overuseDieselOilList()
                                InteractionManager.runAfterInteractions(getOveruseDieselOilList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='gas-station' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>超油扣款</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemGroup}>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getNotSettleListWaiting()
                                Actions.notSettleList()
                                InteractionManager.runAfterInteractions(getNotSettleList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='clipboard-alert' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>未返还交接单</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={Actions.fuelFillingRecord}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='gas-station' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>加油</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemGroup}>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getCleanRelListWaiting()
                                Actions.cleanRelList()
                                InteractionManager.runAfterInteractions(getCleanRelList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='car-wash' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>洗车费</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getRouteTaskFeeListWaiting()
                                Actions.routeTaskFee()
                                InteractionManager.runAfterInteractions(getRouteTaskFeeList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='cash-usd' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>出车款</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                            {/*  <TouchableOpacity style={styles.item} onPress={() => {
                                getTaskLoanListWaiting()
                                Actions.taskLoanList()
                                InteractionManager.runAfterInteractions(getTaskLoanList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='car-wash' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>出车款</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getSalaryListWaiting()
                                Actions.salaryList()
                                InteractionManager.runAfterInteractions(getSalaryList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='credit-card' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>工资</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getCashOilListWaiting()
                                getCashRepairListWaiting()
                                getCashTollListWaiting()
                                Actions.cash()
                                InteractionManager.runAfterInteractions(() => {
                                    getCashOilList()
                                    getCashRepairList()
                                    getCashTollList()
                                })
                            }}>
                                <Left style={styles.itemLeft}>
                                    <FontAwesome name='money' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>现金</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        truckReducer: state.truckReducer,
        loginReducer: state.loginReducer,
        communicationSettingReducer: state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverInfo: () => {
        dispatch(truckAction.getDriverInfo())
    },
    getAccidentList: () => {
        dispatch(accidentListAction.getAccidentList())
    },
    getAccidentListWaiting: () => {
        dispatch(accidentListAction.getAccidentListWaiting())
    },
    getAccidentResponsibilityList: () => {
        dispatch(accidentResponsibilityListAction.getAccidentResponsibilityList())
    },
    getAccidentListResponsibilityWaiting: () => {
        dispatch(accidentResponsibilityListAction.getAccidentListResponsibilityWaiting())
    },
    getCleanRelListWaiting: () => {
        dispatch(cleanRelListAction.getCleanRelListWaiting())
    },
    getCleanRelList: () => {
        dispatch(cleanRelListAction.getCleanRelList())
    },
    getDemageList: () => {
        dispatch(demageListAction.getDemageList())
    },
    getDemageListWaiting: () => {
        dispatch(demageListAction.getDemageListWaiting())
    },
    getDemageResponsibilityList: () => {
        dispatch(demageResponsibilityListAction.getDemageResponsibilityList())
    },
    getDemageResponsibilityListWaiting: () => {
        dispatch(demageResponsibilityListAction.getDemageResponsibilityListWaiting())
    },
    getMassLossList: () => {
        dispatch(massLossListAction.getMassLossList())
    },
    getMassLossListWaiting: () => {
        dispatch(massLossListAction.getMassLossListWaiting())
    },
    getTaskLoanList: () => {
        dispatch(taskLoanListAction.getTaskLoanList())
    },
    getTaskLoanListWaiting: () => {
        dispatch(taskLoanListAction.getTaskLoanListWaiting())
    },
    getOveruseDieselOilList: () => {
        dispatch(actions.overuseDieselOilList.getOveruseDieselOilList())
    },
    getOveruseDieselOilListWaiting: () => {
        dispatch(actions.overuseDieselOilList.getOveruseDieselOilListWaiting())
    },
    getPeccancyList: () => {
        dispatch(actions.peccancyList.getPeccancyList())
    },
    getPeccancyListWaiting: () => {
        dispatch(actions.peccancyList.getPeccancyListWaiting())
    },
    getNotSettleListWaiting: () => {
        dispatch(actions.notSettleList.getNotSettleListWaiting())
    },
    getNotSettleList: () => {
        dispatch(actions.notSettleList.getNotSettleList())
    },
    getSalaryList: () => {
        dispatch(actions.salaryList.getSalaryList())
    },
    getSalaryListWaiting: () => {
        dispatch(actions.salaryList.getSalaryListWaiting())
    },
    getRouteTaskFeeList: () => {
        dispatch(actions.routeTaskFee.getRouteTaskFeeList())
    },
    getRouteTaskFeeListWaiting: () => {
        dispatch(actions.routeTaskFee.getRouteTaskFeeListWaiting())
    },
    getCashOilList: () => {
        dispatch(actions.cashOil.getCashOilList())
    },
    getCashOilListWaiting: () => {
        dispatch(actions.cashOil.getCashOilListWaiting())
    },
    getCashRepairList: () => {
        dispatch(actions.cashRepair.getCashRepairList())
    },
    getCashRepairListWaiting: () => {
        dispatch(actions.cashRepair.getCashRepairListWaiting())
    },
    getCashTollListWaiting: () => {
        dispatch(actions.cashToll.getCashTollListWaiting())
    },
    getCashTollList: () => {
        dispatch(actions.cashToll.getCashTollList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Truck)

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#ddd'
    },

    itemGroup: {
        margin: 5,
        borderWidth: 0.5,
        borderColor: '#ddd'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        color: '#bbb',
        fontSize: 20
    },
    itemTitle: {
        paddingLeft: 5
    }
})