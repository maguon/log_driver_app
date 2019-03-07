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
import { Icon, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'
import * as instructExecutingAction from './InstructExecutingAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import StepIndicator from '../../components/StepIndicator'
import globalStyles, { styleColor } from '../../GlobalStyles'
import ConfirmModal from '../../components/ConfirmModal'

class InstructExecuting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            confirmModalVisible: false
        }
        this.onPressOk = this.onPressOk.bind(this)
        this.onPressCancel = this.onPressCancel.bind(this)
        this.changeLoadTaskStatus = this.changeLoadTaskStatus.bind(this)
        this.renderLoadTaskItem = this.renderLoadTaskItem.bind(this)
        this.initView = this.initView.bind(this)
    }

    componentDidMount() {
        this.props.setGetLoadTaskListWaiting()
        this.initView()

    }

    onPressOk() {
        this.setState({ confirmModalVisible: false })
        const { user } = this.props.loginReducer.data
        const { taskInfo, loadTaskList } = this.props.instructExecutingReducer.data
        let op
        if (taskInfo.task_status == 1) {
            op = 2
        } else if (taskInfo.task_status == 2) {
            op = 3
        } else if (taskInfo.task_status == 3) {
            op = 4
        } else if (taskInfo.task_status == 4) {
            op = 9
        }

        if (op == 9) {
            const loadTaskListIsFinished = loadTaskList.every(item => {
                if (item.transfer_flag == 1) {
                    if (item.route_end_id == taskInfo.transfer_city_id) {
                        if (item.load_task_status == 7) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
                } else {
                    if (item.route_end_id == taskInfo.route_end_id) {
                        if (item.load_task_status == 7) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
                }
            })
            if(loadTaskListIsFinished){
                this.props.changeLoadTaskStatus({
                    requiredParam: {
                        userId: user.uid,
                        taskId: taskInfo.id,
                        taskStatus: op
                    }
                })
            }else{
                ToastAndroid.show('有未卸车任务，请先车再完成路线！',10)
            }
        } else {
            this.props.changeLoadTaskStatus({
                requiredParam: {
                    userId: user.uid,
                    taskId: taskInfo.id,
                    taskStatus: op
                }
            })
        }





    }

    onPressCancel() {
        this.setState({ confirmModalVisible: false })
    }
    changeLoadTaskStatus() {
        this.setState({ confirmModalVisible: true })
        // let op = ''
        // if (param == 2) {
        //     op = '接受任务'
        // } else if (param == 3) {
        //     op = '执行任务'
        // } else if (param == 4) {
        //     op = '发车'
        // } else if (param == 9) {
        //     op = '完成任务'
        // }
        // Alert.alert(
        //     '提示',
        //     `确认${op}吗？`,
        //     [
        //         { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        //         {
        //             text: '确定', onPress: () => {
        // const { user } = this.props.loginReducer.data
        // const { taskInfo } = this.props.instructExecutingReducer.data
        // this.props.changeLoadTaskStatus({
        //     requiredParam: {
        //         userId: user.uid,
        //         taskId: taskInfo.id,
        //         taskStatus: param
        //     }
        // })
        //             }
        //         },
        //     ],
        //     { cancelable: false }
        // )
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
        } else if (index <= 10) {
            return 4
        }
    }

    initView() {
        InteractionManager.runAfterInteractions(() => this.props.getLoadTaskList({
            OptionalParam: {
                dpRouteTaskId: this.props.instructExecutingReducer.data.taskInfo.id
            }
        }))
    }

    renderLoadTaskItem(item, key, task_status) {
        const { taskInfo } = this.props.instructExecutingReducer.data
        // console.log('item', item)
        if (item.load_task_status != 1) {
            return <TouchableOpacity key={key} onPress={() => Actions.branchInstructExecuting({ initParam: { loadTaskInfo: item, task_status } })}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', padding: 10, alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[globalStyles.midText, { color: '#8b959b', fontWeight: 'bold' }]}>
                                    {item.addr_name ? item.addr_name : ''}{item.load_task_type == 2 && <Text style={{ color: 'red' }}>(转)</Text>} -->
                                    {item.transfer_flag == 0 && item.city_name ? ` ${item.city_name}` : ''}{item.transfer_flag == 0 && ' - '}{item.transfer_flag == 0 && item.short_name ? item.short_name : ''}
                                    {item.transfer_flag == 1 && item.transfer_city_name ? ` ${item.transfer_city_name}` : ''}{item.transfer_flag == 1 && ' - '}{item.transfer_flag == 1 && item.transfer_addr_name ? item.transfer_addr_name : ''}
                                    {item.transfer_flag == 1 && <Text style={{ color: 'red' }}>(转)</Text>}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'left', flex: 1 }]}>计划运送：{item.plan_count ? item.plan_count : '0'}</Text>
                            <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'center', flex: 1 }]}>实际运送：<Text style={{ color: styleColor }}>{item.car_count ? item.car_count : '0'}</Text></Text>
                            <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'right', flex: 1 }]}>
                                {item.load_task_status == 3 && '已装车'}
                                {item.load_task_status == 7 && '已到达'}
                                {item.load_task_status == 8 && '取消任务'}
                                {item.load_task_status == 9 && '已完成'}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <EvilIcons name='chevron-right' size={40} color='#8b959b' />
                    </View>
                </View>
            </TouchableOpacity>
        }
        else {
            return (
                <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[globalStyles.midText, { color: '#8b959b', fontWeight: 'bold' }]}>
                                {item.addr_name ? item.addr_name : ''}{item.load_task_type == 2 && <Text style={{ color: 'red' }}>(转)</Text>} -->
                                    {item.transfer_flag == 0 && item.city_name ? ` ${item.city_name}` : ''}{item.transfer_flag == 0 && ' - '}{item.transfer_flag == 0 && item.short_name ? item.short_name : ''}
                                {item.transfer_flag == 1 && item.transfer_city_name ? ` ${item.transfer_city_name}` : ''}{item.transfer_flag == 1 && ' - '}{item.transfer_flag == 1 && item.transfer_addr_name ? item.transfer_addr_name : ''}
                                {item.transfer_flag == 1 && <Text style={{ color: 'red' }}>(转)</Text>}
                            </Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'left', flex: 1 }]}>计划运送：{item.plan_count ? item.plan_count : '0'}</Text>
                        <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'left', flex: 1 }]}>实际运送：<Text style={{ color: styleColor }}>{item.car_count ? item.car_count : '0'}</Text></Text>
                        {(taskInfo.task_status == 2 || taskInfo.task_status == 1) && <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'right', flex: 1 }]}>
                            {item.load_task_status == 1 && '未达到装车条件'}
                        </Text>}
                        {taskInfo.task_status >= 3 && item.load_task_status == 1 && <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Button small rounded style={{ height: 20, backgroundColor: styleColor, alignSelf: 'flex-end' }} onPress={() => {
                                Actions.cars({ initParam: { commandInfo: item } })
                            }}>
                                <Text style={[globalStyles.smallText, { color: '#fff', padding: 5 }]}>装车</Text>
                            </Button>
                        </View>}
                    </View>
                </View>
            )
        }
    }


    render() {
        const { taskInfo, loadTaskList } = this.props.instructExecutingReducer.data
        console.log('loadTaskList', loadTaskList)
        console.log('taskInfo', taskInfo)
        const { getLoadTaskList } = this.props.instructExecutingReducer
        let op = ''
        if (taskInfo.task_status == 1) {
            op = '接受任务'
        } else if (taskInfo.task_status == 2) {
            op = '执行任务'
        } else if (taskInfo.task_status == 3) {
            op = '发车'
        } else if (taskInfo.task_status == 4) {
            op = '完成任务'
        }
        // console.log(this.props)
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
                                {taskInfo.task_status == 3 && loadTaskList.length == 0 && < Button small rounded style={{ backgroundColor: styleColor }} onPress={() => this.changeLoadTaskStatus(4)}>
                                    <Text style={[globalStyles.smallText, { color: '#fff', padding: 5 }]}>发车</Text>
                                </Button>}
                                {taskInfo.task_status == 3 && loadTaskList.length > 0 && < Button small rounded disabled >
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
                                <Text style={[globalStyles.smallText, { paddingLeft: 5, color: '#8b959b' }]}>计划运送：{`${loadTaskList.reduce((sum, value) => sum + (value.plan_count ? value.plan_count : 0), 0)}`}</Text>
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
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={loadTaskList}
                        renderItem={({ item, index }) => this.renderLoadTaskItem(item, index, taskInfo.task_status)} />
                    <ConfirmModal
                        title={`确认要${op}吗？`}
                        isVisible={this.state.confirmModalVisible}
                        onPressOk={this.onPressOk}
                        onPressCancel={this.onPressCancel}
                    />
                </View >
            )
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        instructExecutingReducer: state.instructExecutingReducer,
        loginReducer: state.loginReducer
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
