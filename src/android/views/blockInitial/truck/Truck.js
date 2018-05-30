import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { ListItem, Left, Thumbnail, Body, Right, Content, Container, Separator, Icon } from 'native-base'
import globalStyles from '../../../GlobalStyles'
import { connect } from 'react-redux'
import * as truckAction from './TruckAction'
import FontTag from '../../../components/FontTag'
import * as accidentListAction from '../../accidentList/AccidentListAction'
import * as cleanRelListAction from '../../cleanRelList/CleanRelListAction'
import * as demageListAction from '../../demageList/DemageListAction'
import * as accidentResponsibilityListAction from '../../accidentResponsibilityList/AccidentResponsibilityListAction'
import * as demageResponsibilityListAction from '../../demageResponsibilityList/DemageResponsibilityListAction'
import { styleColor } from '../../../GlobalStyles'
import { file_host } from '../../../../config/Host'
import * as taskLoanListAction from '../../taskLoanList/taskLoanListAction'

class Truck extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getDriverInfo()
    }

    render() {
        const { truckReducer: { data: { personalInfo: { avatar_image, real_name, mobile },
            driverInfo: { company_name, operate_type } } }, getAccidentList, getAccidentListWaiting,
            getAccidentResponsibilityList, getAccidentListResponsibilityWaiting, getCleanRelList, getCleanRelListWaiting,
            getDemageList, getDemageListWaiting, getDemageResponsibilityList, getDemageResponsibilityListWaiting,
            getTaskLoanList, getTaskLoanListWaiting } = this.props
        return (
            <Container>
                <View style={{ backgroundColor: styleColor, flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10 }}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.truckInfo}>
                        <MaterialCommunityIcons name='truck' size={30} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 11 }}>车头资料</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.trailerInfo}>
                        <MaterialCommunityIcons name='truck-trailer' size={30} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 11 }}>挂车资料</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.driverInfo}>
                        <MaterialCommunityIcons name='account' size={30} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 11 }}>个人资料</Text>
                    </TouchableOpacity>
                </View>
                <Content showsVerticalScrollIndicator={false} >
                    <ListItem avatar style={{ marginLeft: 0, padding: 15, borderBottomWidth: 0.3, borderBottomColor: '#ddd' }}>
                        <Left>
                            <Thumbnail source={{ uri: avatar_image ? `${file_host}/image/${avatar_image}` : `personalicon` }} />
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }}>
                            <View>
                                <Text>{real_name ? `${real_name}` : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{company_name ? `${company_name}` : ''} {mobile ? `${mobile}` : ''}</Text>
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
                                    <MaterialCommunityIcons name='truck' size={14} color={'#bbb'} />
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
        truckReducer: state.truckReducer
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
    getTaskLoanList: () => {
        dispatch(taskLoanListAction.getTaskLoanList())
    },
    getTaskLoanListWaiting: () => {
        dispatch(taskLoanListAction.getTaskLoanListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Truck)

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 0.3,
        borderColor: '#ddd'
    },

    itemGroup: {
        margin: 5,
        borderWidth: 0.3,
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