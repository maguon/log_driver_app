import React, {Component} from 'react'
import {InteractionManager} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {Container,Tab,Tabs} from 'native-base'
import globalStyles from '../utils/GlobalStyles'
import MileageInfo from '../layout/MileageInfo'
import TaskListForHome from '../layout/TaskListForHome'
import RouteTaskListForHome from '../layout/RouteTaskListForHome'
import {connect }from "react-redux";
 import * as actions from '../../actions/index'


class Home extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.getMileageInfoWaiting()
        this.props.getTaskListForHomeWaiting()
        this.props.getRouteTaskListForHomeWaiting()

        //(交互管理器)在用户交互和动画结束以后执行任务
        InteractionManager.runAfterInteractions(() => {
            //执行耗时的同步任务
            this.props.getMileageInfo()
            this.props.getTaskListForHome()
            this.props.getRouteTaskListForHome()
        })
    }

    render() {

        return (
            <Container style={globalStyles.listBackgroundColor}>
                <MileageInfo />
                <Tabs tabBarUnderlineStyle={{backgroundColor: '#73B52B'}}>
                    <Tab
                        tabStyle={{backgroundColor: 'white'}}
                        activeTabStyle={{backgroundColor: 'white'}}
                        activeTextStyle={[globalStyles.largeText, { color: '#73B52B' }]}
                        textStyle={[globalStyles.largeText, { color: '#73B52B' }]}
                        heading="路线">
                        <Container>
                            <TaskListForHome />
                        </Container>
                    </Tab>
                    <Tab
                        tabStyle={{backgroundColor: 'white'}}
                        activeTabStyle={{backgroundColor: 'white'}}
                        activeTextStyle={[globalStyles.largeText, { color: '#73B52B' }]}
                        textStyle={[globalStyles.largeText, { color: '#73B52B' }]}
                        heading="任务">
                        <Container>
                            <RouteTaskListForHome />
                        </Container>
                    </Tab>

                </Tabs>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer,
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

    // setTaskInfo: (param) => {
    //     dispatch(instructExecutingAction.setTaskInfo(param))
    // },



    getMileageInfo: () => {
        dispatch(actions.mileageInfoAction.getMileageInfo())
    },
    getMileageInfoWaiting: () => {
        dispatch(actions.mileageInfoAction.getMileageInfoWaiting())
    },



    getTaskListForHome: () => {
        dispatch(actions.taskListForHomeAction.getTaskListForHome())
    },
    getTaskListForHomeWaiting: () => {
        dispatch(actions.taskListForHomeAction.getTaskListForHomeWaiting())
    },



    getRouteTaskListForHome: () => {
        dispatch(actions.routeTaskListForHomeAction.getRouteTaskListForHome())
    },
    getRouteTaskListForHomeWaiting: () => {
        dispatch(actions.routeTaskListForHomeAction.getRouteTaskListForHomeWaiting())
    }

})


export default connect(mapStateToProps, mapDispatchToProps)(Home)
