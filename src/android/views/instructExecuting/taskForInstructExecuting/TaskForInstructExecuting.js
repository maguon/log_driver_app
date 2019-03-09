import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator,
    TouchableOpacity,
    ToastAndroid,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import StepIndicator from '../../../components/StepIndicator'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Icon, Button } from 'native-base'
import moment from 'moment'
import ConfirmModal from '../../../components/ConfirmModal'
import * as reduxActionTypes from '../../../../actions/index'


const getStepIndicatorCurrent = (index) => {
    if (index <= 1) {
        return 0
    } else if (index <= 2) {
        return 1
    } else if (index <= 3) {
        return 2
    } else if (index <= 4) {
        return 3
    } else if (index <= 10) {
        return 4
    }
}

const getNextStepName = (status) => {
    if (status == 1) {
        return '接受任务'
    } else if (status == 2) {
        return '执行任务'
    } else if (status == 3) {
        return '发车'
    } else if (status == 4) {
        return '完成任务'
    }
}


const getNextStepIndex = (status) => {
    if (status == 1) {
        return 2
    } else if (status == 2) {
        return 3
    } else if (status == 3) {
        return 4
    } else if (status == 4) {
        return 9
    }
}

class TaskForInstructExecuting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmModalVisible: false
        }
        this.onPressOk = this.onPressOk.bind(this)
        this.onPressCancel = this.onPressCancel.bind(this)
        this.changeLoadTaskStatus = this.changeLoadTaskStatus.bind(this)
    }

    onPressOk() {
        this.setState({ confirmModalVisible: false })
        const { taskInfo,
            routeTaskListForHomeReducer: { data: { routeTaskList } } } = this.props
        const nextStepIndex = getNextStepIndex(taskInfo.task_status)
        if (nextStepIndex == 9) {
            const loadTaskListIsFinished = routeTaskList.every(item => {
                if (item.transfer_flag == 1) {
                    if (item.route_end_id == taskInfo.transfer_city_id) {
                        if (item.load_task_status != 3) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
                } else {
                    if (item.route_end_id == taskInfo.route_end_id) {
                        if (item.load_task_status != 3) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
                }
            })
            if (loadTaskListIsFinished) {
                this.props.changeTaskStatus({
                    taskId: taskInfo.id,
                    taskStatus: nextStepIndex
                })
            } else {
                ToastAndroid.show('有未卸车任务，请先车再完成路线！', 10)
            }
        } else {
            this.props.changeTaskStatus({
                taskId: taskInfo.id,
                taskStatus: nextStepIndex
            })
        }
    }

    onPressCancel() {
        this.setState({ confirmModalVisible: false })
    }
    changeLoadTaskStatus() {
        this.setState({ confirmModalVisible: true })
    }


    render() {
        const { taskInfo, routeTaskList } = this.props
        const nextStepName = getNextStepName(taskInfo.task_status)
        return (
            <View>
                <StepIndicator
                    stepList={[{ step: '1', title: '下达' }
                        , { step: '2', title: '接受' }
                        , { step: '3', title: '装车' }
                        , { step: '4', title: '在途' }
                        , { step: '5', title: '完成' }]}
                    current={getStepIndicatorCurrent(taskInfo.task_status)} />
                <View style={{ backgroundColor: '#eff3f5', padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <View>
                        <Text style={[globalStyles.smallText, { color: '#8b959b' }]}>
                            指令编号：{taskInfo.id ? `${taskInfo.id}` : ''}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', paddingTop: 10, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name='truck' size={20} color={styleColor} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                                <Text style={[globalStyles.midText, { color: '#8b959b', fontWeight: 'bold' }]}>{taskInfo.city_route_start ? taskInfo.city_route_start : ''} </Text>
                                <MaterialCommunityIcons name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#8c989f' }} />
                                <Text style={[globalStyles.midText, { color: '#8b959b', fontWeight: 'bold', paddingLeft: 5 }]}> {taskInfo.city_route_end ? taskInfo.city_route_end : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                <Text style={[globalStyles.midText, { color: '#8b959b', fontWeight: 'bold' }]}><Text style={{ color: '#d69aa5' }}>{taskInfo.distance ? `${taskInfo.distance}` : '0'}</Text>公里</Text>
                            </View>
                        </View>
                        <View>
                            {taskInfo.task_status == 1 && <Button small rounded style={{ backgroundColor: styleColor }} onPress={() => this.changeLoadTaskStatus(2)}>
                                <Text style={[globalStyles.smallText, { color: '#fff', padding: 5 }]}>接受</Text>
                            </Button>}
                            {taskInfo.task_status == 2 && <Button small rounded style={{ backgroundColor: styleColor }} onPress={() => this.changeLoadTaskStatus(3)}>
                                <Text style={[globalStyles.smallText, { color: '#fff', padding: 5 }]}>执行</Text>
                            </Button>}
                            {taskInfo.task_status == 3 && routeTaskList.length == 0 && < Button small rounded style={{ backgroundColor: styleColor }} onPress={() => this.changeLoadTaskStatus(4)}>
                                <Text style={[globalStyles.smallText, { color: '#fff', padding: 5 }]}>发车</Text>
                            </Button>}
                            {taskInfo.task_status == 3 && routeTaskList.length > 0 && < Button small rounded disabled >
                                <Text style={[globalStyles.smallText, { color: '#fff', padding: 5 }]}>等待装车</Text>
                            </Button>}
                            {taskInfo.task_status == 4 && <Button small rounded style={{ backgroundColor: styleColor }} onPress={() => this.changeLoadTaskStatus(9)}>
                                <Text style={[globalStyles.smallText, { color: '#fff', padding: 5 }]}>完成</Text>
                            </Button>}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='ios-clock-outline' style={{ fontSize: 15, color: '#8b959b' }} />
                            <Text style={[globalStyles.smallText, { paddingLeft: 5, color: '#8b959b' }]}>指令执行时间：{taskInfo.task_plan_date ? moment(new Date(taskInfo.task_plan_date)).format('YYYY-MM-DD') : ''}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingBottom: 10, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='ios-person' style={{ fontSize: 15, color: '#8b959b' }} />
                            <Text style={[globalStyles.smallText, { paddingLeft: 5, color: '#8b959b' }]}>指令调度：{taskInfo.route_op_name ? taskInfo.route_op_name : ''}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                            <Text style={[globalStyles.smallText, { paddingLeft: 5, color: '#8b959b' }]}>计划运送：{`${routeTaskList.reduce((sum, value) => sum + (value.plan_count ? value.plan_count : 0), 0)}`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[globalStyles.smallText, { color: '#8b959b' }]}>当前状态：
                                <Text style={{ color: styleColor }}>
                                    {taskInfo.task_status == 1 && '未接受'}
                                    {taskInfo.task_status == 2 && '已接受'}
                                    {taskInfo.task_status == 3 && '已执行'}
                                    {taskInfo.task_status == 4 && '在途'}
                                    {taskInfo.task_status == 8 && '取消安排'}
                                    {taskInfo.task_status == 9 && '已完成'}
                                    {taskInfo.task_status == 10 && '已完成'}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <ConfirmModal
                    title={`确认要${nextStepName}吗？`}
                    isVisible={this.state.confirmModalVisible}
                    onPressOk={this.onPressOk}
                    onPressCancel={this.onPressCancel}
                />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { taskId } = ownProps
    return {
        routeTaskListForHomeReducer: state.routeTaskListForHomeReducer,
        routeTaskList: state.routeTaskListForHomeReducer.data.routeTaskList.filter(item => item.dp_route_task_id == taskId),
        taskInfo: state.taskListForHomeReducer.data.taskList.find(item => item.id == taskId)
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeTaskStatus: (reqParam) => {
        dispatch(reduxActionTypes.taskForInstructExecuting.changeTaskStatus(reqParam))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskForInstructExecuting)