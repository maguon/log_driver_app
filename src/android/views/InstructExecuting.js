import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import { Icon, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'
import * as instructExecutingAction from '../../actions/InstructExecutingAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import StepIndicator from '../components/StepIndicator'

class InstructExecuting extends Component {
    constructor(props) {
        super(props)
        this.changeLoadTaskStatus = this.changeLoadTaskStatus.bind(this)
        this.renderLoadTaskItem = this.renderLoadTaskItem.bind(this)
        this.initView=this.initView.bind(this)
    }

    componentDidMount() {
        //console.log('this.props.initParam', this.props.initParam)
        this.props.setGetLoadTaskListWaiting()
        this.initView()

    }


    componentWillMount() {
        this.props.setTaskInfo(this.props.initParam.taskInfo)
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps)
        const { isPopRefresh } = nextProps
        //console.log('isPopRefresh',isPopRefresh)
        if (isPopRefresh) {
            this.initView()
            Actions.refresh({ isPopRefresh: !isPopRefresh })
        }
    }

    changeLoadTaskStatus(param) {
        const { user } = this.props.userReducer.data
        const { taskInfo } = this.props.instructExecutingReducer.data
        //console.log
        this.props.changeLoadTaskStatus({
            requiredParam: {
                userId: user.userId,
                taskId: taskInfo.id,
                taskStatus: param
            }
        })
    }

    getStepIndicatorCurrent(index) {
        if (index <= 1) {
            return 0
        } else if (index <= 2) {
            return 1
        } else if (index <= 3) {
            return 2
        } else if (index <= 4) {
            return 3
        } else if (index <= 9) {
            return 4
        }
    }

    initView(){
        InteractionManager.runAfterInteractions(() => this.props.getLoadTaskList({
            OptionalParam: {
                dpRouteTaskId: this.props.initParam.taskInfo.id
            }
        }))
    }

    renderLoadTaskItem(item, key) {
        if (item.load_task_status != 1) {
            return <TouchableOpacity key={key} onPress={() => Actions.branchInstructExecuting({ initParam: { loadTaskInfo: item } })}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', padding: 10, alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>{item.addr_name ? item.addr_name : ''} --> {item.city_name ? item.city_name : ''} - {item.short_name ? item.short_name : ''}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'left', flex: 1 }}>计划运送：{item.plan_count ? item.plan_count : '0'}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>实际运送：<Text style={{ color: '#00cade' }}>{item.car_count ? item.car_count : '0'}</Text></Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>异常：<Text style={{ color: '#d69aa5' }}>{item.car_exception_count ? `${item.car_exception_count}` : '0'}</Text></Text>
                            </View> */}
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>
                                    {item.load_task_status == 1 && '未装车'}
                                    {item.load_task_status == 3 && '已装车'}
                                    {item.load_task_status == 7 && '已到达'}
                                    {item.load_task_status == 8 && '取消任务'}
                                    {item.load_task_status == 9 && '已完成'}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <EvilIcons name='chevron-right' size={40} color='#8b959b' />
                    </View>
                </View>
            </TouchableOpacity>
        }
        else {
            return <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>{item.addr_name ? item.addr_name : ''} --> {item.city_name ? item.city_name : ''} - {item.short_name ? item.short_name : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'left', flex: 1 }}>计划运送：{item.plan_count ? item.plan_count : '0'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>实际运送：<Text style={{ color: '#00cade' }}>{item.car_count ? item.car_count : '0'}</Text></Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>异常：<Text style={{ color: '#d69aa5' }}>{item.car_exception_count ? `${item.car_exception_count}` : '0'}</Text></Text>
                    </View> */}
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>
                            {item.load_task_status == 1 && '未装车'}
                            {item.load_task_status == 3 && '已装车'}
                            {item.load_task_status == 7 && '已到达'}
                            {item.load_task_status == 8 && '取消任务'}
                            {item.load_task_status == 9 && '已完成'}
                        </Text>
                    </View>
                </View>
            </View>
        }
    }


    render() {
        const { taskInfo, loadTaskList } = this.props.instructExecutingReducer.data
       // console.log(taskInfo)
        const { getLoadTaskList } = this.props.instructExecutingReducer
        if (getLoadTaskList.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getLoadTaskList.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <StepIndicator
                        stepList={[{ step: '1', title: '下达' }
                            , { step: '2', title: '接受' }
                            , { step: '3', title: '装车' }
                            , { step: '4', title: '在途' }
                            , { step: '5', title: '完成' }]}
                        current={this.getStepIndicatorCurrent(taskInfo.task_status)} />
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
                                {taskInfo.task_status == 3 && <Button small rounded disabled style={{ backgroundColor: '#c4c4c4' }}>
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
                                <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指令执行时间：{taskInfo.task_plan_date ? moment(new Date(taskInfo.task_plan_date)).format('YYYY-MM-DD') : ''}</Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row' }}>
                                <Icon name='ios-person' style={{ fontSize: 15, color: '#8b959b' }} />
                                <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指令调度：{taskInfo.route_op_name ? taskInfo.route_op_name : ''}</Text>
                            </View> */}
                        </View>
                        <View style={{ flexDirection: 'row', paddingBottom:10, justifyContent: 'space-between' }}>
                            {/* <View style={{ flexDirection: 'row' }}>
                                <Icon name='ios-clock-outline' style={{ fontSize: 15, color: '#8b959b' }} />
                                <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指令执行时间：{taskInfo.task_plan_date ? moment(new Date(taskInfo.task_plan_date)).format('YYYY-MM-DD') : ''}</Text>
                            </View> */}
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='ios-person' style={{ fontSize: 15, color: '#8b959b' }} />
                                <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指令调度：{taskInfo.route_op_name ? taskInfo.route_op_name : ''}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                                <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>计划运送：{`${loadTaskList.reduce((sum, value) => sum + (value.plan_count ? value.plan_count : 0), 0)}`}</Text>
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
                    <FlatList
                        data={loadTaskList}
                        renderItem={({ item, index }) => this.renderLoadTaskItem(item, index)} />
                </View>
            )
        }
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
    },
    getLoadTaskList: (param) => {
        dispatch(instructExecutingAction.getLoadTaskList(param))
    },
    setGetLoadTaskListWaiting: () => {
        dispatch(instructExecutingAction.setGetLoadTaskListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructExecuting)
