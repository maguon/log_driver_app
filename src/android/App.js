import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'

import NavBar from './components/bar/NavBar'
import TopBar from './components/bar/TopBar'
import TabIcon from './components/TabIcon'
import Home from './views/blockInitial/Home'
import Work from './views/blockInitial/Work'
import Truck from './views/blockInitial/Truck'
import Setting from './views/blockInitial/Setting'
import Instruct from './views/Instruct'
import DriverInfo from './views/DriverInfo'
import TruckInfo from './views/TruckInfo'
import TrailerInfo from './views/TrailerInfo'
import BranchInstruct from './views/BranchInstruct'
import FuelFillingRecord from './views/FuelFillingRecord'
import FuelFillingApply from './views/FuelFillingApply'

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#ccc',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ccc',
    },
    navigationBarStyle: {

    }
})

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    }
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 56
        style.marginBottom = computedProps.hideTabBar ? 0 : 50
    }
    return style
}

// const getSceneStyle = () => ({
//   backgroundColor: '#F5FCFF',
//   shadowOpacity: 1,
//   shadowRadius: 3,
// });

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.disableYellowBox = true
        return (
            <Router
                //createReducer={this.reducerCreate} 
                getSceneStyle={getSceneStyle} >
                <Scene key="root">
                    {/* <Scene initial={true} key="initialization" component={Initialization} hideNavBar hideTabBar />
                    <Scene
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            if (props.LoginReducer.user.mobile
                                && props.LoginReducer.user.token
                                && props.LoginReducer.user.userId
                                && props.LoginReducer.user.userStatus
                                && props.LoginReducer.user.userType) {
                                return 'main'
                            } else {
                                return 'login'
                            }
                        }}
                    >
                        <Scene key="login"  component={Login} hideNavBar hideTabBar /> */}
                    <Scene key="main" initial={true} tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                        <Scene key="homeBlock" icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                            <Scene key="home" component={Home} title='首页' hideNavBar={false} navBar={TopBar} />
                            {/* <Scene key="instruct" initial={true} component={Instruct} title='调度指令' hideNavBar={false} navBar={TopBar} /> */}
                        </Scene>
                        <Scene key="truckBlock"  initial={true} icon={TabIcon} online='ios-bus' outline='ios-bus-outline' >
                            <Scene key="truck"component={Truck} title='货车管理' hideNavBar={false} navBar={TopBar} />
                            <Scene key="driverInfo" component={DriverInfo} title='司机详情' hideNavBar={false} navBar={NavBar} />
                            <Scene key="truckInfo" component={TruckInfo} title='车头资料' hideNavBar={false} navBar={NavBar} />
                            <Scene key="trailerInfo" component={TrailerInfo} title='挂车资料' hideNavBar={false} navBar={NavBar} />
                            <Scene key="fuelFillingRecord" initial={true}  component={FuelFillingRecord} title='加油记录' hideNavBar={false} navBar={NavBar} />
                            <Scene key="fuelFillingApply" component={FuelFillingApply} title='加油申报' hideNavBar={false} navBar={NavBar} />
                        </Scene>
                        <Scene key="driverBlock" icon={TabIcon} online='ios-contact' outline='ios-contact-outline'>
                            <Scene key="work"  initial={true} component={Work} title='工作管理' hideNavBar={false} navBar={TopBar} />
                            <Scene key="instruct" component={Instruct} title='调度指令' hideNavBar={false} navBar={NavBar} />
                            <Scene key="branchInstruct" component={BranchInstruct} title='调度指令' hideNavBar={false} navBar={NavBar} />
                        </Scene>
                        <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' >
                            <Scene key="setting" component={Setting} initial={true} title='设置' hideNavBar={false} navBar={TopBar} />
                        </Scene>
                    </Scene>
                </Scene>
                {/* </Scene> */}
            </Router>

        )
    }
}