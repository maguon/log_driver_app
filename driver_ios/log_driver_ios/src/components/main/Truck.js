import React, {Component} from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {ListItem, Left, Thumbnail, Body, Right, Content, Container, Icon} from 'native-base'
import globalStyles, {styleColor} from '../utils/GlobalStyles'
import {connect} from 'react-redux'
import FontTag from '../utils/FontTag'
// import * as accidentListAction from '../../../complatedViews/accidentList/AccidentListAction'
// import * as cleanRelListAction from '../../../complatedViews/cleanRelList/CleanRelListAction'
// import * as demageListAction from '../../../notUsed/demageList/DemageListAction'
// import * as accidentResponsibilityListAction from '../../../complatedViews/accidentResponsibilityList/AccidentResponsibilityListAction'
// import * as demageResponsibilityListAction from '../../../complatedViews/demageResponsibilityList/DemageResponsibilityListAction'
// import * as taskLoanListAction from '../../../complatedViews/taskLoanList/taskLoanListAction'
import * as actions from '../../actions/index'


const window = Dimensions.get('window')

class Truck extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getDriverInfo()
    }

    render() {

        const {
            truckReducer: {data: {driverInfo: {company_name, operate_type}}},
            loginReducer: {data: {user: {avatar_image, real_name, mobile}}, url: {file_host}},
            getAccidentList,
            getAccidentListWaiting,
            // getAccidentResponsibilityList,
            // getAccidentListResponsibilityWaiting,
            // getCleanRelList,
            // getCleanRelListWaiting,
            // getDemageResponsibilityList,
            // getDemageResponsibilityListWaiting,
            // getTaskLoanList,
            // getTaskLoanListWaiting,
            // getOveruseDieselOilList,
            // getOveruseDieselOilListWaiting,
            // getPeccancyListWaiting,
            // getPeccancyList,
            // getNotSettleListWaiting,
            // getNotSettleList,
            // getSalaryListWaiting,
            // getSalaryList,
            // getRouteTaskFeeListWaiting,
            // getRouteTaskFeeList
        } = this.props
        console.log("props========" + JSON.stringify(this.props))
        return (
            <Container>
                <View style={{
                    backgroundColor: styleColor,
                    flexDirection: 'row',
                    borderColor: '#76b92c',
                    paddingHorizontal: 30,
                    paddingVertical: 10
                }}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={Actions.truckInfo}>
                        <MaterialCommunityIcons name='truck' size={30} color='#fff'/>
                        <Text style={[globalStyles.smallText, {color: '#fff'}]}>车头资料</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={Actions.trailerInfo}>
                        <MaterialCommunityIcons name='truck-trailer' size={30} color='#fff'/>
                        <Text style={[globalStyles.smallText, {color: '#fff'}]}>挂车资料</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={Actions.driverInfo}>
                        <MaterialCommunityIcons name='account' size={30} color='#fff'/>
                        <Text style={[globalStyles.smallText, {color: '#fff'}]}>个人资料</Text>
                    </TouchableOpacity>
                </View>
                <Content showsVerticalScrollIndicator={false} style={styles.Items}>
                    <ListItem avatar style={{
                        marginLeft: 0,
                        padding: 15,
                        backgroundColor: "#fff",
                        borderBottomWidth: 0.3,
                        borderBottomColor: '#ddd'
                    }}>
                        <Left>
                            <Thumbnail
                                source={{uri: avatar_image ? `${file_host}/image/${avatar_image}` : `personalicon`}}/>
                        </Left>
                        <Body style={{borderBottomWidth: 0}}>
                        <View>
                            <Text style={globalStyles.midText}>{real_name ? `${real_name}` : ''}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text
                                style={globalStyles.midText}>{company_name ? `${company_name}` : ''} {mobile ? `${mobile}` : ''}</Text>
                        </View>
                        </Body>
                        <Right style={{borderBottomWidth: 0}}>
                            {operate_type == 1 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff'/>}
                            {operate_type == 2 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff'/>}
                            {operate_type == 3 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff'/>}
                            {operate_type == 4 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff'/>}
                        </Right>
                    </ListItem>
                    <View>
                        <View style={styles.itemGroup}>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getAccidentListWaiting()
                                Actions.accidentList()
                                InteractionManager.runAfterInteractions(getAccidentList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='truck' size={20} color={'#76b92c'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>货车事故申报</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon}/>
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
                                    <MaterialCommunityIcons name='car-sports' size={20} color={'#76b92c'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>商品车责任</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon}/>
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getAccidentListResponsibilityWaiting()
                                Actions.accidentResponsibilityList()
                                InteractionManager.runAfterInteractions(getAccidentResponsibilityList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='truck' size={20} color={'#76b92c'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>货车责任</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon}/>
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
                                    <AntDesign name='form' size={20} color={'#76b92c'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>违章扣款</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon}/>
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getOveruseDieselOilListWaiting()
                                Actions.overuseDieselOilList()
                                InteractionManager.runAfterInteractions(getOveruseDieselOilList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <AntDesign name='dashboard' size={20} color={'#76b92c'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>超油扣款</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon}/>
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
                                    <MaterialCommunityIcons name='clipboard-alert' size={20} color={'#76b92c'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>未返还交接单</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon}/>
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={Actions.fuelFillingRecord}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='gas-station' size={20} color={'#76b92c'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>加油</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon}/>
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getCleanRelListWaiting()
                                Actions.cleanRelList()
                                InteractionManager.runAfterInteractions(getCleanRelList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='car-wash' size={20} color={'#76b92c'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>洗车费</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon}/>
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                getRouteTaskFeeListWaiting()
                                Actions.routeTaskFee()
                                InteractionManager.runAfterInteractions(getRouteTaskFeeList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <AntDesign name='pay-circle-o1' size={20} color={'#76b92c'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>出车款</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon}/>
                                </Right>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.item} onPress={() => {
                                getSalaryListWaiting()
                                Actions.salaryList()
                                InteractionManager.runAfterInteractions(getSalaryList)
                            }}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='currency-cny' size={20} color={'#76b92c'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>工资</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon}/>
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
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverInfo: () => {
        dispatch(actions.truckAction.getDriverInfo())
    },
    getAccidentList: () => {
        dispatch(actions.accidentListAction.getAccidentList())
        dispatch(actions.accidentListAction.getAccidentList())
    },
    getAccidentListWaiting: () => {
        dispatch(actions.accidentListAction.getAccidentListWaiting())
    },
//     getAccidentResponsibilityList: () => {
//         dispatch(actions.accidentResponsibilityListAction.getAccidentResponsibilityList())
//     },
//     getAccidentListResponsibilityWaiting: () => {
//         dispatch(actions.accidentResponsibilityListAction.getAccidentListResponsibilityWaiting())
//     },
//     getCleanRelListWaiting: () => {
//         dispatch(actions.cleanRelListAction.getCleanRelListWaiting())
//     },
//     getCleanRelList: () => {
//         dispatch(actions.cleanRelListAction.getCleanRelList())
//     },
//     getDemageList: () => {
//         dispatch(actions.demageListAction.getDemageList())
//     },
//     getDemageListWaiting: () => {
//         dispatch(actions.demageListAction.getDemageListWaiting())
//     },
//     getDemageResponsibilityList: () => {
//         dispatch(actions.demageResponsibilityListAction.getDemageResponsibilityList())
//     },
//     getDemageResponsibilityListWaiting: () => {
//         dispatch(actions.demageResponsibilityListAction.getDemageResponsibilityListWaiting())
//     },
//     getTaskLoanList: () => {
//         dispatch(actions.taskLoanListAction.getTaskLoanList())
//     },
//     getTaskLoanListWaiting: () => {
//         dispatch(actions.taskLoanListAction.getTaskLoanListWaiting())
//     },
//     getOveruseDieselOilList: () => {
//         dispatch(actions.overuseDieselOilList.getOveruseDieselOilList())
//     },
//     getOveruseDieselOilListWaiting: () => {
//         dispatch(actions.overuseDieselOilList.getOveruseDieselOilListWaiting())
//     },
//     getPeccancyList: () => {
//         dispatch(actions.peccancyList.getPeccancyList())
//     },
//     getPeccancyListWaiting: () => {
//         dispatch(actions.peccancyList.getPeccancyListWaiting())
//     },
//     getNotSettleListWaiting: () => {
//         dispatch(actions.notSettleList.getNotSettleListWaiting())
//     },
//     getNotSettleList: () => {
//         dispatch(actions.notSettleList.getNotSettleList())
//     },
//     getSalaryList: () => {
//         dispatch(actions.salaryList.getSalaryList())
//     },
//     getSalaryListWaiting: () => {
//         dispatch(actions.salaryList.getSalaryListWaiting())
//     },
//     getRouteTaskFeeList: () => {
//         dispatch(actions.routeTaskFee.getRouteTaskFeeList())
//     },
//     getRouteTaskFeeListWaiting: () => {
//         dispatch(actions.routeTaskFee.getRouteTaskFeeListWaiting())
//     }
})

export default connect(mapStateToProps, mapDispatchToProps)(Truck)

const styles = StyleSheet.create({
    Items: {
        backgroundColor: "#f3f3f3",
    },
    item: {
        width: window.width,
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#ddd',
        paddingLeft: 10,

    },

    itemGroup: {
        marginTop: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        color: '#bbb',
        fontSize: 20,
        paddingRight: 10
    },
    itemTitle: {
        paddingLeft: 10
    }
})
