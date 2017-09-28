import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Icon, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'
import * as instructExecutingAction from '../../actions/InstructExecutingAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

class InstructExecuting extends Component {
    constructor(props) {
        super(props)
        this.changeLoadTaskStatus = this.changeLoadTaskStatus.bind(this)
    }

    componentDidMount() {

    }

    componentWillMount() {
        this.props.setTaskInfo(this.props.initParam.taskInfo)
    }

    static defaultProps = {
        initParam: {
            taskInfo: {
                id: 10174,
                user_id: 1,
                truck_id: 257,
                drive_id: 161,
                route_start_id: 100,
                route_end_id: 101,
                distance: 5,
                task_plan_date: "2017-09-26T06:33:00.000Z",
                task_start_date: "2017-09-26T06:58:32.000Z",
                task_end_date: "2017-09-26T06:58:41.000Z",
                date_id: 20170926,
                car_count: 0,
                task_status: 4,
                created_on: "2017-09-26T06:33:16.000Z",
                updated_on: "2017-09-26T06:58:40.000Z",
                route_op_name: "超级管理员",
                truck_num: "新123456",
                trail_number: 14,
                drive_name: "测试用户司机",
                tel: "10000000000",
                city_route_start: "大连",
                city_route_end: "沈阳",
                car_exception_count: 0
            }
        }
    }

    changeLoadTaskStatus(param) {
        const { user } = this.props.userReducer
        const { taskInfo } = this.props.instructExecutingReducer.data
        this.props.changeLoadTaskStatus({
            requiredParam: {
                userId: user.userId,
                taskId: taskInfo.id,
                taskStatus: param
            }
        })
    }

    render() {
        console.log(this.props.instructExecutingReducer)
        const { taskInfo } = this.props.instructExecutingReducer.data
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#eff3f5', padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <View>
                        <Text style={{ fontSize: 11, color: '#8b959b' }}>
                            指令编号：{taskInfo.id ? `${taskInfo.id}` : ''}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', paddingTop: 10, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name='truck' size={20} color='#00cade' />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                                <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>{taskInfo.city_route_start ? taskInfo.city_route_start : ''} --> {taskInfo.city_route_end ? taskInfo.city_route_end : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}><Text style={{ color: '#d69aa5' }}>{taskInfo.distance ? `${taskInfo.distance}` : '0'}</Text>公里</Text>
                            </View>
                        </View>
                        <View>
                            {taskInfo.task_status == 1 && <Button small rounded style={{ backgroundColor: '#00cade' }} onPress={() => this.changeLoadTaskStatus(2)}>
                                <Text style={{ color: '#fff' }}>接受</Text>
                            </Button>}
                            {taskInfo.task_status == 2 && <Button small rounded style={{ backgroundColor: '#00cade' }} onPress={() => this.changeLoadTaskStatus(3)}>
                                <Text style={{ color: '#fff' }}>执行</Text>
                            </Button>}
                            {taskInfo.task_status == 3 && <Button small rounded disabled style={{ backgroundColor: '#c4c4c4' }} onPress={() => {}}>
                                <Text style={{ color: '#fff' }}>等待发车</Text>
                            </Button>}
                            {taskInfo.task_status == 4 && <Button small rounded style={{ backgroundColor: '#00cade' }} onPress={() => this.changeLoadTaskStatus(9)}>
                                <Text style={{ color: '#fff' }}>完成</Text>
                            </Button>}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='ios-clock-outline' style={{ fontSize: 15, color: '#8b959b' }} />
                            <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指令执行时间：{taskInfo.task_start_date ? moment(new Date(taskInfo.task_start_date)).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='ios-person' style={{ fontSize: 15, color: '#8b959b' }} />
                            <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指令调度：{taskInfo.route_op_name ? taskInfo.route_op_name : ''}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                            <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>计划运送：14</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 11, color: '#8b959b' }}>当前状态：
                                <Text style={{ color: '#00cade' }}>
                                    {taskInfo.task_status == 1 && '未接受'}
                                    {taskInfo.task_status == 2 && '已接受'}
                                    {taskInfo.task_status == 3 && '已执行'}
                                    {taskInfo.task_status == 4 && '在途'}
                                    {taskInfo.task_status == 8 && '取消安排'}
                                    {taskInfo.task_status == 9 && '已完成'}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        instructExecutingReducer: state.instructExecutingReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeLoadTaskStatus: (param) => {
        dispatch(instructExecutingAction.changeLoadTaskStatus(param))
    },
    setChangeLoadTaskStatusWaiting: () => {
        dispatch(instructExecutingAction.setChangeLoadTaskStatusWaiting())
    },
    setTaskInfo: (param) => {
        dispatch(instructExecutingAction.setTaskInfo(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructExecuting)
