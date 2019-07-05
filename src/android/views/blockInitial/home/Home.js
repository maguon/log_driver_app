import React, { Component } from 'react'
import {
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Tab, Tabs,  } from 'native-base'
import globalStyles from '../../../GlobalStyles'
import * as  instructExecutingAction from '../../instructExecuting/InstructExecutingAction'
import * as actions from '../../../../actions/index'
import MileageInfo from './mileageInfo/MileageInfo'
import TaskListForHome from './taskListForHome/TaskListForHome'
import RouteTaskListForHome from './routeTaskListForHome/RouteTaskListForHome'

class Home extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.getMileageInfoWaiting()
        this.props.getTaskListForHomeWaiting()
        this.props.getRouteTaskListForHomeWaiting()
        
        InteractionManager.runAfterInteractions(() => {
            this.props.getMileageInfo()
            this.props.getTaskListForHome()
            this.props.getRouteTaskListForHome()
        })
    }

    render() {
        // console.log('this.props',this.props)
        return (
            <Container style={globalStyles.listBackgroundColor}>
                <MileageInfo />
                <Tabs>
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
        loginReducer: state.loginReducer,
        initializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
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