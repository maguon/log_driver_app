import React, {Component} from 'react'
import {View, Text} from 'react-native'
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
        this.props.getMileageInfo()
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
                            {/*<RouteTaskListForHome />*/}
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
    getMileageInfo: () => {
        dispatch(actions.mileageInfoAction.getMileageInfo())
    },
    // setTaskInfo: (param) => {
    //     dispatch(instructExecutingAction.setTaskInfo(param))
    // },
    // getMileageInfoWaiting: () => {
    //     dispatch(actions.mileageInfo.getMileageInfoWaiting())
    // },
    //
    // getTaskListForHome: () => {
    //     dispatch(actions.taskListForHome.getTaskListForHome())
    // },
    // getTaskListForHomeWaiting: () => {
    //     dispatch(actions.taskListForHome.getTaskListForHomeWaiting())
    // },
    // getRouteTaskListForHome: () => {
    //     dispatch(actions.routeTaskListForHome.getRouteTaskListForHome())
    // },
    // getRouteTaskListForHomeWaiting: () => {
    //     dispatch(actions.routeTaskListForHome.getRouteTaskListForHomeWaiting())
    // }

})


export default connect(mapStateToProps, mapDispatchToProps)(Home)
