import React, { Component } from 'react'
import { Toast, Container } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import RouteTaskListForHome from '../modules/RouteTaskListForHome'
import TaskForInstructExecuting from './TaskForInstructExecuting'


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

    onPressOk() {
        this.setState({ confirmModalVisible: false })
        const { user } = this.props.loginReducer.data
        const { taskInfo} = this.props.instructExecutingReducer.data
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
                Toast.show({text:'有未卸车任务，请先车再完成路线！'})
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
        const { taskInfo} = this.props.instructExecutingReducer.data
        return (
            <Container>
                <TaskForInstructExecuting taskId={taskInfo.id} />
                <RouteTaskListForHome taskId={taskInfo.id} taskInfo={taskInfo}/>
            </Container>
        )
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
        dispatch(actions.instructExecutingAction.changeLoadTaskStatus(param))
    },
    setChangeLoadTaskStatusWaiting: () => {
        dispatch(actions.instructExecutingAction.setChangeLoadTaskStatusWaiting())
    },
    setTaskInfo: (param) => {
        dispatch(actions.instructExecutingAction.setTaskInfo(param))
    },
    getLoadTaskList: (param) => {
        dispatch(actions.instructExecutingAction.getLoadTaskList(param))
    },
    setGetLoadTaskListWaiting: () => {
        dispatch(actions.instructExecutingAction.setGetLoadTaskListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructExecuting)
