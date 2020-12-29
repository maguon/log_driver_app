import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'



import TabIcon from './components/TabIcon'
import SettingTabIcon from './components/SettingTabIcon'
import Home from './views/blockInitial/home/Home'
import Work from './views/blockInitial/work/Work'
import Truck from './views/blockInitial/truck/Truck'

import Instruct from './views/instruct/Instruct'
import DriverInfo from './views/driverInfo/DriverInfo'
import TruckInfo from './complatedViews/truck/Truck'
import Trailer from './complatedViews/trailer/Trailer'
import BranchInstruct from './views/branchInstruct/BranchInstruct'
import FuelFillingRecord from './complatedViews/fuelFillingRecord/FuelFillingRecord'
import FuelFillingApply from './complatedViews/fuelFillingApply/FuelFillingApply'
import FuelFillingSearch from './complatedViews/FuelFillingSearch'
import InstructExecuting from './views/instructExecuting/InstructExecuting'
import BranchInstructExecuting from './views/branchInstructExecuting/BranchInstructExecuting'
import CityRouteList from './complatedViews/select/cityRouteList/CityRouteList'
import Login from './complatedViews/login/Login'

import Initialization from './views/initialization/Initialization'
import DriverQRCode from './views/DriverQRCode'
import Orientation from 'react-native-orientation'
import SinglePhotoView from './views/photoView/SinglePhotoView'
import RetrievePassword from './complatedViews/retrievePassword/RetrievePassword'

import TaskLoanList from './complatedViews/taskLoanList/TaskLoanList'
import TaskLoan from './complatedViews/taskLoan/TaskLoan'
import Cars from './views/cars/Cars'
import CarInfo from './views/carInfo/CarInfo'
import UploadImageForCreateCarOP from './components/UploadImageForCreateCarOP'


import LeftButton from './components/share/bar/LeftButton'
import ApplyAccident from './views/applyAccident/ApplyAccident'
import AccidentList from './complatedViews/accidentList/AccidentList'
import AccidentResponsibilityList from './complatedViews/accidentResponsibilityList/AccidentResponsibilityList'
import ApplyAccidentImage from './views/applyAccidentImage/ApplyAccidentImage'
import AccidentInfo from './complatedViews/AccidentInfo'
import AccidentResponsibilityInfo from './views/AccidentResponsibilityInfo'
import ApplyAccidentSubmit from './components/ApplyAccidentSubmit'
import ApplyDemageSubmit from './components/ApplyDemageSubmit'
import ApplyDemageImageSubmit from './components/ApplyDemageImageSubmit'
import ApplyAccidentImageSubmit from './components/ApplyAccidentImageSubmit'
import AccidentListOperation from './complatedComponents/op/AccidentListOperation'
import DemageListOperation from './components/DemageListOperation'
import DemageResponsibilityListOperation from './components/DemageResponsibilityListOperation'
import SelectAddress from './complatedViews/select/address/Address'
import ListCennect from './views/select/ListCennect'
import CleanRelList from './complatedViews/cleanRelList/CleanRelList'
import DemageList from './notUsed/demageList/DemageList'
import DemageResponsibilityList from './complatedViews/demageResponsibilityList/DemageResponsibilityList'
import DemageResponsibilityInfo from './views/DemageResponsibilityInfo'
import DemageInfo from './views/DemageInfo'
import ApplyDemage from './notUsed/applyDemage/ApplyDemage'
import ApplyDemageImage from './notUsed/applyDemageImage/ApplyDemageImage'

import HomeOperation from './components/HomeOperation'
import ImageViewConnect from './views/ImageViewConnect'
import HomeLeftButton from './components/share/bar/HomeLeftButton'
import TaskLoanListOP from './components/TaskLoanListOP'
import InstructExecutingOp from './components/InstructExecutingOp'
import SearchTaskLoanOP from './components/share/bar/SearchTaskLoanOP'
import CreateCarOP from './components/CreateCarOP'
import SearchTaskLoan from './views/SearchTaskLoan'
import TaskLoanRelList from './complatedViews/taskLoanRelList/TaskLoanRelList'
import SearchCar from './views/select/searchCar/SearchCar'
import AddCar from './views/createCar/AddCar'
import City from './views/select/city/City'
import Entrust from './views/select/entrust/Entrust'
import Make from './views/select/make/Make'
import Receive from './views/select/receive/Receive'
import AddCarImage from './views/uploadImageForCreateCar/AddCarImage'
import PhotoViewForCreateCar from './views/photoView/PhotoViewForCreateCar'
import PhotoViewForCarInfo from './views/photoView/PhotoViewForCarInfo'

import NavSearchCarBar from './components/share/bar/NavSearchCarBar'
import NavBar from './components/share/bar/NavBar'
import NavSearchDynamicBar from './components/share/bar/NavSearchDynamicBar'
import PhotoViewNavBar from './components/share/bar/PhotoViewNavBar'
import PeccancyToolButton from './complatedComponents/op/PeccancyToolButton'
import PeccancyLeftButton from './complatedComponents/leftButton/PeccancyLeftButton'
import OveruseDieselOilToolButton from './complatedComponents/op/OveruseDieselOilToolButton'
import OveruseDieselOilLeftButton from './complatedComponents/leftButton/OveruseDieselOilLeftButton'

import BaseAddrList from './complatedViews/select/baseAddrList/BaseAddrList'
import OveruseDieselOilList from './complatedViews/overuseDieselOilList/OveruseDieselOilList'
import OveruseDieselOilInfo from './complatedViews/overuseDieselOilInfo/OveruseDieselOilInfo'
import PeccancyList from './complatedViews/peccancyList/PeccancyList'
import PeccancyInfo from './complatedViews/PeccancyInfo'
import PeccancySearch from './complatedViews/PeccancySearch'
import OveruseDieselOilSearch from './complatedViews/OveruseDieselOilSearch'
import VinScanner from './views/VinScanner'
import FuelFillingRecordToolButton from './complatedComponents/op/FuelFillingRecordToolButton'

//settingBlock-views-complated
import PersonalCenter from './complatedViews/personalCenter/PersonalCenter'
import UpdatePassword from './complatedViews/updatePassword/UpdatePassword'
import Setting from './complatedViews/blockInitial/Setting'
import CommunicationSetting from './complatedViews/communicationSetting/CommunicationSetting'

import ChangeMobileNo from './complatedViews/changeMobileNo/ChangeMobileNo'
import sysNotification from './complatedViews/sysNotification/SysNotification'
import notification from './complatedViews/notification/Notification'

import NotSettleList from './complatedViews/notSettleList/NotSettleList'

import SalaryList from './complatedViews/salaryList/SalaryList'
import Salary from './complatedViews/salary/Salary'
import CleanRel from './complatedViews/cleanRel/CleanRel'
import RouteTaskFee from './complatedViews/routeTaskFee/RouteTaskFee'
import CleanFeeList from './complatedViews/cleanFeeList/CleanFeeList'
import Cash from './complatedViews/cash/Cash'


const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    },
    navigationBarStyle: {

    }
})

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer
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
                            const { user } = props.loginReducer.data
                            if (user.mobile
                                && user.token
                                && user.uid
                                && user.status
                                && user.type) {
                                return 'main'
                            } else {
                                return 'loginBlock'
                            }
                        }}
                    >
                        <Scene key="loginBlock" >
                            <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar />
                            <Scene key="retrievePassword" title='找回密码' component={RetrievePassword} hideTabBar hideNavBar={false} LeftButton={LeftButton} navBar={NavBar} />
                            <Scene key="communicationSetting" title='通讯设置' component={CommunicationSetting} hideTabBar hideNavBar={false} LeftButton={LeftButton} navBar={NavBar} />
                        </Scene>
                        <Scene key="main" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" initial={true} icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                                <Scene key="home"
                                    initial={true}
                                    component={Home}
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    LeftButton={HomeLeftButton}
                                    RightButton={HomeOperation} />
                                <Scene key="instructExecuting"
                                    LeftButton={LeftButton}
                                    component={InstructExecuting}
                                    isRequirePopRefresh={true}
                                    RightButton={InstructExecutingOp}
                                    title='调度指令'
                                    hideNavBar={false}
                                    hideTabBar={true}
                                    navBar={NavBar} />
                                <Scene key="photoViewForCreateCar"
                                    LeftButton={LeftButton}
                                    component={PhotoViewForCreateCar}
                                    navBar={PhotoViewNavBar}
                                    title='照片'
                                    hideTabBar />
                                <Scene key="branchInstructExecuting"
                                    component={BranchInstructExecuting}
                                    LeftButton={LeftButton}
                                    title='调度指令'
                                    isRequirePopRefresh={true}
                                    hideNavBar={false}
                                    hideTabBar={true}
                                    navBar={NavBar} />
                                <Scene key="cars"
                                    title='装车信息'
                                    LeftButton={LeftButton}
                                    component={Cars}
                                    hideTabBar
                                    navBar={NavBar} />
                                <Scene key="searchCar"
                                    hideTabBar
                                    component={SearchCar}
                                    navBar={NavSearchCarBar} />
                                <Scene key="carInfo"
                                    title='商品车信息'
                                    LeftButton={LeftButton}
                                    component={CarInfo}
                                    hideTabBar
                                    navBar={NavBar} />
                                <Scene key="addCarImage"
                                    title='添加照片'
                                    RightButton={UploadImageForCreateCarOP}
                                    LeftButton={LeftButton}
                                    component={AddCarImage}
                                    hideTabBar
                                    navBar={NavBar} />
                                <Scene key="addCar"
                                    title='增加商品车'
                                    RightButton={CreateCarOP}
                                    component={AddCar}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NavBar} />
                                <Scene key="make"
                                    title='选择品牌'
                                    LeftButton={LeftButton}
                                    component={Make}
                                    hideTabBar
                                    navBar={NavBar} />
                                <Scene key="city"
                                    title='选择城市'
                                    LeftButton={LeftButton}
                                    component={City}
                                    hideTabBar
                                    navBar={NavBar} />
                                <Scene key="baseAddrList"
                                    title='选择发运地'
                                    LeftButton={LeftButton}
                                    component={BaseAddrList}
                                    hideTabBar
                                    navBar={NavBar} />
                                <Scene key="entrust"
                                    title='选择委托方'
                                    component={Entrust}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NavBar} />
                                <Scene key="receive"
                                    title='选择经销商'
                                    component={Receive}
                                    LeftButton={LeftButton}
                                    hideTabBar
                                    navBar={NavBar} />
                                <Scene key="photoViewforCarInfo"
                                    LeftButton={LeftButton}
                                    component={PhotoViewForCarInfo}
                                    navBar={PhotoViewNavBar}
                                    title='照片'
                                    hideTabBar />
                                <Scene key="driverQRCode"
                                    LeftButton={LeftButton}
                                    component={DriverQRCode}
                                    title='司机二维码'
                                    hideNavBar={false}
                                    hideTabBar={true}
                                    navBar={NavBar} />
                                <Scene key="vinScanner"
                                    component={VinScanner}
                                    title='扫条码'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="cleanFeeListAtHomeBlock"
                                    component={CleanFeeList}
                                    title='洗车费'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                            </Scene>
                            <Scene key="truckBlock" icon={TabIcon} online='ios-bus' outline='ios-bus-outline' >
                                <Scene key="truck"
                                    initial={true}
                                    component={Truck}
                                    title='货车管理'
                                    navBar={NavBar} />
                                <Scene key="applyAccident"
                                    component={ApplyAccident}
                                    title='事故申报'
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton}
                                    RightButton={ApplyAccidentSubmit} />
                                <Scene key="cash"
                                    component={Cash}
                                    LeftButton={LeftButton}
                                    title='现金'
                                    hideTabBar
                                    navBar={NavBar} />
                                <Scene key="taskLoanList"
                                    component={TaskLoanList}
                                    RightButton={TaskLoanListOP}
                                    title='出车款'
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton} />
                                <Scene key="notSettleList"
                                    component={NotSettleList}
                                    title='未返还交接单'
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton} />
                                <Scene key="routeTaskFee"
                                    component={RouteTaskFee}
                                    title='出车款'
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton} />
                                <Scene key="taskLoanRelList"
                                    component={TaskLoanRelList}
                                    title='关联调度任务'
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton} />
                                <Scene key="taskLoan"
                                    component={TaskLoan}
                                    title='出车款详情'
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton} />
                                <Scene key="searchTaskLoan"
                                    component={SearchTaskLoan}
                                    title='查询出车款'
                                    hideTabBar
                                    navBar={NavBar}
                                    RightButton={SearchTaskLoanOP}
                                    LeftButton={LeftButton} />
                                <Scene key="applyDemage"
                                    component={ApplyDemage}
                                    title='质损申报'
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton}
                                    RightButton={ApplyDemageSubmit} />
                                <Scene key="applyDemageImage"
                                    component={ApplyDemageImage}
                                    title='上传质损照片'
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton}
                                    RightButton={ApplyDemageImageSubmit} />
                                <Scene key="listCennect"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton} />
                                <Scene key="listCennectDynamic"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavSearchDynamicBar} />
                                <Scene key="applyAccidentImage"
                                    component={ApplyAccidentImage}
                                    title='上传事故照片'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    RightButton={ApplyAccidentImageSubmit} />
                                <Scene key="accidentList"
                                    component={AccidentList}
                                    title='事故列表'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    RightButton={AccidentListOperation} />



                                <Scene key="overuseDieselOilList"
                                    component={OveruseDieselOilList}
                                    title='超油扣款列表'
                                    navBar={NavBar}
                                    hideTabBar
                                    RightButton={OveruseDieselOilToolButton}
                                    LeftButton={OveruseDieselOilLeftButton} />
                                <Scene key="overuseDieselOilInfo"
                                    component={OveruseDieselOilInfo}
                                    title='超油扣款详情'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="peccancyList"
                                    component={PeccancyList}
                                    RightButton={PeccancyToolButton}
                                    title='违章扣款列表'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={PeccancyLeftButton} />
                                <Scene key="peccancyInfo"
                                    component={PeccancyInfo}
                                    title='违章扣款详情'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="peccancySearch"
                                    component={PeccancySearch}
                                    title='违章扣款查询'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="overuseDieselOilSearch"
                                    component={OveruseDieselOilSearch}
                                    title='超油扣款查询'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="demageList"
                                    component={DemageList}
                                    title='质损列表'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    RightButton={DemageListOperation} />
                                <Scene key="salaryList"
                                    component={SalaryList}
                                    title='工资列表'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="salary"
                                    component={Salary}
                                    title='工资详情'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="demageResponsibilityList"
                                    component={DemageResponsibilityList}
                                    title='质损列表'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    RightButton={DemageResponsibilityListOperation} />
                                <Scene key="demageResponsibilityInfo"
                                    component={DemageResponsibilityInfo}
                                    title='质损详情'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="demageInfo"
                                    component={DemageInfo}
                                    title='质损详情'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="accidentInfo"
                                    hideTabBar
                                    component={AccidentInfo}
                                    title='事故详情'
                                    navBar={NavBar}
                                    LeftButton={LeftButton} />
                                <Scene key="accidentResponsibilityList"
                                    component={AccidentResponsibilityList}
                                    title='事故责任列表'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="accidentResponsibilityInfo"
                                    component={AccidentResponsibilityInfo}
                                    title='事故责任详情'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="selectAddress"
                                    component={SelectAddress}
                                    title='选择位置'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="cleanRelList"
                                    component={CleanRelList}
                                    title='我的洗车费'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="cleanFeeListAtTruckBlock"
                                    component={CleanFeeList}
                                    title='洗车费'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />



                                <Scene key="cleanRel"
                                    component={CleanRel}
                                    title='洗车费详情'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="imageViewConnect"
                                    clone={true}
                                    component={ImageViewConnect}
                                    hideTabBar
                                    hideNavBar />
                                <Scene key="driverInfo" LeftButton={LeftButton} component={DriverInfo} title='司机详情' hideTabBar navBar={NavBar} />
                                <Scene key="truckInfo" LeftButton={LeftButton} component={TruckInfo} title='车头资料' hideTabBar navBar={NavBar} />
                                <Scene key="trailerInfo" LeftButton={LeftButton} component={Trailer} title='挂车资料' hideTabBar navBar={NavBar} />
                                <Scene key="cityRouteList" LeftButton={LeftButton} component={CityRouteList} title='指令编号' hideTabBar navBar={NavBar} />
                                <Scene key="fuelFillingRecord" LeftButton={LeftButton} component={FuelFillingRecord} title='加油记录' RightButton={FuelFillingRecordToolButton} hideTabBar navBar={NavBar} />
                                <Scene key="fuelFillingApply" LeftButton={LeftButton} component={FuelFillingApply} title='加油申报' hideTabBar navBar={NavBar} />
                                <Scene key="fuelFillingSearch" LeftButton={LeftButton} component={FuelFillingSearch} title='加油查询' hideTabBar navBar={NavBar} />
                                <Scene key="singlePhotoView" component={SinglePhotoView} hideTabBar={true} navBar={PhotoViewNavBar} LeftButton={LeftButton} />
                            </Scene>
                            <Scene key="driverBlock" icon={TabIcon} online='ios-contact' outline='ios-contact-outline'>
                                <Scene key="work" initial={true} component={Work} title='工作管理' hideNavBar={false} navBar={NavBar} />
                                <Scene key="instruct"
                                    LeftButton={LeftButton}
                                    component={Instruct}
                                    title='调度指令'
                                    hideNavBar={false}
                                    hideTabBar={true}
                                    navBar={NavBar} />
                                <Scene key="branchInstruct"
                                    LeftButton={LeftButton}
                                    component={BranchInstruct}
                                    title='调度指令'
                                    hideNavBar={false}
                                    hideTabBar={true}
                                    navBar={NavBar} />
                                <Scene key="cleanFeeListAtDriverBlock"
                                    component={CleanFeeList}
                                    title='洗车费'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                            </Scene>
                            {/* settingBlock-complated*/}
                            <Scene key="settingBlock" icon={SettingTabIcon} online='ios-settings' outline='ios-settings-outline' >
                                <Scene key="setting" component={Setting} initial={true} title='设置' hideNavBar={false} navBar={NavBar} />
                                <Scene key="updatePassword"
                                    LeftButton={LeftButton}
                                    component={UpdatePassword}
                                    title='修改密码'
                                    hideNavBar={false}
                                    hideTabBar={true}
                                    navBar={NavBar} />
                                <Scene key="changeMobileNo"
                                       component={ChangeMobileNo}
                                       title='换绑手机'
                                       hideNavBar={false}
                                       LeftButton={LeftButton}
                                       hideTabBar={true}
                                       navBar={NavBar} />
                                <Scene key="sysNotification"
                                       component={sysNotification}
                                       title='系统消息'
                                       hideNavBar={false}
                                       LeftButton={LeftButton}
                                       hideTabBar={true}
                                       navBar={NavBar} />
                                <Scene key="notification"
                                       component={notification}
                                       title='消息详情'
                                       hideNavBar={false}
                                       LeftButton={LeftButton}
                                       hideTabBar={true}
                                       navBar={NavBar} />

                                <Scene key="personalCenter"
                                    LeftButton={LeftButton}
                                    component={PersonalCenter}
                                    title='个人中心'
                                    hideNavBar={false}
                                    hideTabBar={true}
                                    navBar={NavBar} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}
