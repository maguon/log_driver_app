import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'
import XGPush from 'react-native-xinge-push';


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
import FuelFillingSearch from './views/FuelFillingSearch'
import InstructExecuting from './views/InstructExecuting'
import BranchInstructExecuting from './views/BranchInstructExecuting'
import CityRouteList from './views/select/CityRouteList'
import Login from './views/Login'
import Password from './views/Password'
import Initialization from './views/Initialization'
import DriverQRCode from './views/DriverQRCode'
import Orientation from 'react-native-orientation'
import SinglePhotoView from './views/SinglePhotoView'
import RetrievePassword from './views/RetrievePassword'
import PersonalInfo from './views/PersonalInfo'

import NavBar from './components/share/bar/NavBar'
import LeftButton from './components/share/bar/LeftButton'
import ApplyAccident from './views/ApplyAccident'
import AccidentList from './views/AccidentList'
import AccidentResponsibilityList from './views/AccidentResponsibilityList'
import ApplyAccidentImage from './views/ApplyAccidentImage'
import AccidentInfo from './views/AccidentInfo'
import AccidentResponsibilityInfo from './views/AccidentResponsibilityInfo'
import ApplyAccidentSubmit from './components/ApplyAccidentSubmit'
import ApplyAccidentImageSubmit from './components/ApplyAccidentImageSubmit'
import AccidentListOperation from './components/AccidentListOperation'
import SelectAddress from './views/select/SelectAddress'
import ListCennect from './views/select/ListCennect'


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

const mapStateToProps = (state) => {
    return {
        LoginReducer: state.userReducer
    }
}

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

    componentWillMount() {
        Orientation.lockToPortrait()
    }

    render() {
        console.disableYellowBox = true
        return (
            <Router
                //createReducer={this.reducerCreate} 
                getSceneStyle={getSceneStyle} >
                <Scene key="root">
                    <Scene initial={true} key="initialization" component={Initialization} hideNavBar hideTabBar />
                    <Scene
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            const { user } = props.LoginReducer.data
                            if (user.mobile
                                && user.token
                                && user.userId
                                && user.userStatus
                                && user.userType) {
                                return 'main'
                            } else {
                                return 'loginBlock'
                            }
                        }}
                    >
                        {/* <Scene key="login" component={Login} hideNavBar hideTabBar /> */}
                        <Scene key="loginBlock" >
                            <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar />
                            <Scene key="retrievePassword" title='找回密码' component={RetrievePassword} hideTabBar hideNavBar={false} navBar={NavBar} />
                        </Scene>
                        <Scene key="main" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                                <Scene key="home" rightType={1} onPressRight={() => Actions.driverQRCode()} initial={true} component={Home} title='首页' hideNavBar={false} navBar={TopBar} />
                                <Scene key="instructExecuting" component={InstructExecuting} isRequirePopRefresh={true} title='调度指令' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="branchInstructExecuting" component={BranchInstructExecuting} title='调度指令' isRequirePopRefresh={true} hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="driverQRCode" component={DriverQRCode} title='司机二维码' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                            </Scene>
                            <Scene key="truckBlock" initial={true} icon={TabIcon} online='ios-bus' outline='ios-bus-outline' >
                                <Scene key="truck"
                                initial={true}
                                    component={Truck}
                                    title='货车管理'
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="applyAccident"
                                    component={ApplyAccident}
                                    title='事故申报'
                                    hideNavBar={false}

                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton}
                                    RightButton={ApplyAccidentSubmit} />
                                <Scene key="listCennect"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton}
                                    hideNavBar={false} />
                                <Scene key="applyAccidentImage"
                                    component={ApplyAccidentImage}
                                    title='上传事故照片'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    RightButton={ApplyAccidentImageSubmit} />
                                <Scene key="accidentList"
                                    component={AccidentList}
                                    title='事故列表'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    RightButton={AccidentListOperation} />
                                <Scene key="accidentInfo"
                                    hideTabBar
                                    component={AccidentInfo}
                                    title='事故详情'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    LeftButton={LeftButton} />
                                <Scene key="accidentResponsibilityList"
                                    component={AccidentResponsibilityList}
                                    title='事故责任列表'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="accidentResponsibilityInfo"
                                    component={AccidentResponsibilityInfo}
                                    title='事故责任详情'
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="selectAddress"
                                    component={SelectAddress}
                                    title='选择位置'
                                    hideNavBar={false}
                                   
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="driverInfo" component={DriverInfo} title='司机详情' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="truckInfo" component={TruckInfo} title='车头资料' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="trailerInfo" component={TrailerInfo} title='挂车资料' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="cityRouteList" component={CityRouteList} title='指令编号' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="fuelFillingRecord" component={FuelFillingRecord} title='加油记录' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="fuelFillingApply" component={FuelFillingApply} title='加油申报' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="fuelFillingSearch" component={FuelFillingSearch} title='加油查询' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="singlePhotoView" component={SinglePhotoView} hideNavBar={true} hideTabBar={true} />
                            </Scene>
                            <Scene key="driverBlock" icon={TabIcon} online='ios-contact' outline='ios-contact-outline'>
                                <Scene key="work" initial={true} component={Work} title='工作管理' hideNavBar={false} navBar={TopBar} />
                                <Scene key="instruct" component={Instruct} title='调度指令' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="branchInstruct" component={BranchInstruct} title='调度指令' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                            </Scene>
                            <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' >
                                <Scene key="setting" component={Setting} initial={true} title='设置' hideNavBar={false} navBar={TopBar} />
                                <Scene key="password" component={Password} title='修改密码' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                                <Scene key="personalInfo" component={PersonalInfo} title='个人中心' hideNavBar={false} hideTabBar={true} navBar={NavBar} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}