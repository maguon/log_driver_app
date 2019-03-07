import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Tab, Tabs, TabHeading, Icon, ListItem, Spinner } from 'native-base'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as homeAction from './HomeAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { MapView } from 'react-native-amap3d'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import * as  instructExecutingAction from '../../instructExecuting/InstructExecutingAction'
import * as actions from '../../../../actions/index'
import MileageInfo from './mileageInfo/MileageInfo'
import TaskListForHome from './taskListForHome/TaskListForHome'
import RouteTaskListForHome from './routeTaskListForHome/RouteTaskListForHome'

class Home extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     latitude: 0,
        //     longitude: 0
        // }
        // this.renderTaskItem = this.renderTaskItem.bind(this)
        // this.renderListHeader = this.renderListHeader.bind(this)
    }

    componentDidMount() {
        this.props.getMileageInfoWaiting()
        this.props.getTaskListForHomeWaiting()
        InteractionManager.runAfterInteractions(() => {
            this.props.getMileageInfo()
            this.props.getTaskListForHome()
        })
    }

    // renderListHeader() {
    //     const { homeReducer: { data: { mileageInfo, truckDispatch } } } = this.props
    //     // console.log('this.props', this.props)
    //     return (
    //         <MileageInfo />

    //     )
    // }


    // renderTaskItem(item, key) {
    //     const { setTaskInfo } = this.props
    //     return <TouchableOpacity key={key} onPress={() => {
    //         setTaskInfo(item)
    //         Actions.instructExecuting()
    //     }}>
    //         <View style={{ marginVertical: 10, marginHorizontal: 10, borderWidth: 1, borderColor: '#e1e2e6' }}>
    //             <View style={{ flexDirection: 'row', backgroundColor: '#edf1f4', paddingVertical: 5, justifyContent: 'space-between' }}>
    //                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                     <MaterialCommunityIcon name='truck' style={{ color: styleColor, paddingHorizontal: 5 }} size={20} />
    //                     <Text style={[globalStyles.midText, { color: '#8e9fa3', fontWeight: 'bold' }]}>{item.city_route_start ? item.city_route_start : ''}</Text>
    //                     <MaterialCommunityIcon name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#8c989f' }} />
    //                     <Text style={[globalStyles.midText, { color: '#8e9fa3', fontWeight: 'bold', paddingLeft: 5 }]}>{item.city_route_end ? item.city_route_end : ''}</Text>
    //                 </View>
    //                 <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    //                     <Text style={[globalStyles.smallText, { color: '#8e9fa3', paddingRight: 10 }]}>
    //                         {item.task_status == 1 && '未接受'}
    //                         {item.task_status == 2 && '已接受'}
    //                         {item.task_status == 3 && '已执行'}
    //                         {item.task_status == 4 && '在途'}
    //                         {item.task_status == 8 && '取消安排'}
    //                         {item.task_status == 9 && '已完成'}
    //                     </Text>
    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5, backgroundColor: '#fff', justifyContent: 'space-between' }}>
    //                 <View style={{ flexDirection: 'row' }}>
    //                     <Text style={[globalStyles.smallText, { color: '#8e9fa3' }]}>指令时间：{item.task_plan_date ? moment(new Date(item.task_plan_date)).format('YYYY-MM-DD') : ''}</Text>
    //                 </View>
    //                 <View style={{ flexDirection: 'row' }}>
    //                 </View>
    //             </View>
    //         </View>
    //     </TouchableOpacity>
    // }

    render() {
        // const { homeReducer: { data: { taskList }, getHomeMileageInfo } } = this.props
        // if (getHomeMileageInfo.isResultStatus == 1) {
        //     return (
        //         <Container>
        //             <Spinner color={styleColor} />
        //         </Container>
        //     )
        // } else {
        return (
            <Container style={globalStyles.listBackgroundColor}>
                <MileageInfo />
                <Tabs onChangeTab={(param) => {
                    const { i } = param
                    if (i == 0) {
                        this.props.getTaskListForHomeWaiting()
                        InteractionManager.runAfterInteractions(() => {
                            this.props.getTaskListForHome()
                        })

                    } else {
                        this.props.getRouteTaskListForHomeWaiting()
                        InteractionManager.runAfterInteractions(() => {
                            this.props.getRouteTaskListForHome()
                        })
                    }
                }}>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                        heading="路线">
                        <Container>
                            <TaskListForHome />
                        </Container>
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                        heading="任务">
                        <Container>
                            <RouteTaskListForHome />
                        </Container>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
    // }
}

const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer,
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    // getMileageInfo: () => {
    //     dispatch(homeAction.getMileageInfo())
    // },
    // getMileageInfoWaiting: () => {
    //     dispatch(homeAction.getMileageInfoWaiting())
    // },
    setTaskInfo: (param) => {
        dispatch(instructExecutingAction.setTaskInfo(param))
    },
    getMileageInfoWaiting: () => {
        dispatch(actions.mileageInfo.getMileageInfoWaiting())
    },
    getMileageInfo: () => {
        dispatch(actions.mileageInfo.getMileageInfo())
    },
    getTaskListForHome: () => {
        dispatch(actions.taskListForHome.getTaskListForHome())
    },
    getTaskListForHomeWaiting: () => {
        dispatch(actions.taskListForHome.getTaskListForHomeWaiting())
    },
    getRouteTaskListForHome: () => {
        dispatch(actions.routeTaskListForHome.getRouteTaskListForHome())
    },
    getRouteTaskListForHomeWaiting: () => {
        dispatch(actions.routeTaskListForHome.getRouteTaskListForHomeWaiting())
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)