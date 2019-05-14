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
import { Icon, Button, Container } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'
import * as instructExecutingAction from './InstructExecutingAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import StepIndicator from '../../components/StepIndicator'
import globalStyles, { styleColor } from '../../GlobalStyles'
import ConfirmModal from '../../components/ConfirmModal'
import RouteTaskListForHome from '../blockInitial/home/routeTaskListForHome/RouteTaskListForHome'
import TaskForInstructExecuting from './taskForInstructExecuting/TaskForInstructExecuting'

class InstructExecuting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            confirmModalVisible: false
        }
        this.onPressOk = this.onPressOk.bind(this)
        this.onPressCancel = this.onPressCancel.bind(this)
        this.changeLoadTaskStatus = this.changeLoadTaskStatus.bind(this)

    }

    componentDidMount() {
        // this.props.setGetLoadTaskListWaiting()
        // InteractionManager.runAfterInteractions(() => this.props.getLoadTaskList({
        //     OptionalParam: {
        //         dpRouteTaskId: this.props.instructExecutingReducer.data.taskInfo.id
        //     }
        // }))
    }

    onPressOk() {
        this.setState({ confirmModalVisible: false })
        const { user } = this.props.loginReducer.data
        const { taskInfo, loadTaskList } = this.props.instructExecutingReducer.data
        const { routeTaskListForHomeReducer: { data: { routeTaskList } } } = this.props
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
            const loadTaskListIsFinished = routeTaskList.every(item => {
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
            if (loadTaskListIsFinished) {
                this.props.changeLoadTaskStatus({
                    requiredParam: {
                        userId: user.uid,
                        taskId: taskInfo.id,
                        taskStatus: op
                    }
                })
            } else {
                ToastAndroid.show('有未卸车任务，请先车再完成路线！', 10)
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
    }

    render() {
        const { taskInfo, loadTaskList } = this.props.instructExecutingReducer.data

        const { getLoadTaskList } = this.props.instructExecutingReducer

        // console.log(this.props)
        // if (getLoadTaskList.isResultStatus == 1) {
        //     return (
        //         <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //             <ActivityIndicator
        //                 animating={getLoadTaskList.isResultStatus == 1}
        //                 style={{ height: 80 }}
        //                 size="large"
        //             />
        //         </View>
        //     )
        // } else {
        return (
            <Container>
                <TaskForInstructExecuting taskId={taskInfo.id} />
                <RouteTaskListForHome taskId={taskInfo.id} taskInfo={taskInfo}/>
            </Container>
        )
        // }
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        instructExecutingReducer: state.instructExecutingReducer,
        routeTaskListForHomeReducer: state.routeTaskListForHomeReducer,
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
