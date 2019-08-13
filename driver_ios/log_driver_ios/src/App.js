//第三方
import React, {Component} from 'react';
import {StyleSheet, View, Text} from "react-native";
import {connect} from 'react-redux'
import {
    Scene,
    Router,
    MessageBar,
    Actions,
    Reducer,
    ActionConst,
    Tabs,
    Modal,
    Switch,
    Stack,
    Lightbox,
} from "react-native-router-flux";
import Orientation from 'react-native-orientation'

//初始页面
import Initialization from './components/main/Initialization'
import Login from './components/main/Login'
import RetrievePassword from './components/main/RetrievePassword'
import DetermineLogin from './components/main/DetermineLogin'

//导航相关页面
import Home from './components/main/Home'
import InstructExecuting from './components/main/InstructExecuting'
import DriverQRCode from './components/main/DriverQRCode'
import Cars from './components/main/Cars'
import SearchCar from './components/main/SearchCar'
import BranchInstructExecuting from './components/main/BranchInstructExecuting'
import Work from './components/main/Work'
import Truck from './components/main/Truck'
import AccidentList from './components/main/AccidentList'
import Settings from './components/main/Settings'
import CarInfo from './components/main/CarInfo'
import TruckInfo from './components/main/TruckInfo'
import Trailer from './components/main/Trailer'
import DriverInfo from './components/main/DriverInfo'
import ApplyAccidentImage from './components/main/ApplyAccidentImage'
import ApplyAccident from './components/main/ApplyAccident'
import Instruct from './components/main/Instruct'
import BranchInstruct from './components/main/BranchInstruct'
import CleanFeeList from './components/main/CleanFeeList'
import UpdatePassword from './components/main/UpdatePassword'
import ChangeMobileNo from './components/main/ChangeMobileNo'
import PersonalCenter from './components/main/PersonalCenter'
import AccidentResponsibilityList from './components/main/AccidentResponsibilityList'
import AccidentResponsibilityInfo from './components/main/AccidentResponsibilityInfo'
import PeccancyList from './components/main/PeccancyList'
import PeccancyInfo from './components/main/PeccancyInfo'
import OveruseDieselOilInfo from './components/main/OveruseDieselOilInfo'
import OveruseDieselOilList from './components/main/OveruseDieselOilList'


//模块
import AccidentListOperation from './components/modules/AccidentListOperation'
import VinScanner from './components/modules/VinScanner'
import PhotoViewNavBar from './components/modules/PhotoViewNavBar'
import SinglePhotoView from './components/modules/SinglePhotoView'
import PeccancySearch from './components/modules/PeccancySearch'
import PeccancyToolButton from './components/modules/PeccancyToolButton'
import PeccancyLeftButton from './components/modules/PeccancyLeftButton'
import OveruseDieselOilSearch from './components/modules/OveruseDieselOilSearch'
import OveruseDieselOilToolButton from './components/modules/OveruseDieselOilToolButton'
import OveruseDieselOilLeftButton from './components/modules/OveruseDieselOilLeftButton'

//通用
import tabIcon from './components/utils/TabIcon'
import HomeLeftButton from './components/utils/HomeLeftButton'
import InstructExecutingOp from './components/utils/InstructExecutingOp'
import InstructExecutingOc from './components/utils/InstructExecutingOc'
import NavBar from './components/utils/NavBar'
//import HomeOperation from './components/utils/HomeOperation'
import LeftButton from './components/utils/LeftButton'
import NavSearchCarBar from './components/utils/NavSearchCarBar'
import ApplyAccidentSubmit from './components/utils/ApplyAccidentSubmit'
import ApplyAccidentImageSubmit from './components/utils/ApplyAccidentImageSubmit'


const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    },
    navigationBarStyle: {}
})


const onEnter = () => {
    return false
}

const Root = () => {
    return (
        <Router>
            <Modal hideNavBar>
                <Lightbox>
                    <Scene key="root"
                        //是否显示标题栏
                           hideNavBar
                    >

                        {/*<Scene initial={true} key="initialization" component={Initialization}/>*/}
                        {/*<Scene key="determineLogin" component={DetermineLogin} onEnter={onEnter} success="loginGroup" failure="appMain"/>*/}

                        {/*<Stack key="version"> </Stack>*/}
                        {/*<Stack key="guide"> </Stack>*/}


                        <Stack key="loginGroup">
                            <Scene key="login"
                                   initial={true}
                                   component={Login}
                                   hideNavBar
                                   hideTabBar/>
                            <Scene key="retrievePassword"
                                   title='找回密码'
                                   component={RetrievePassword}
                                   hideTabBar
                                   hideNavBar={false}
                                   navBar={NavBar}
                                   LeftButton={LeftButton}
                                   RightButton={InstructExecutingOc}
                            />
                        </Stack>


                        <Stack key="appMain"
                            //tabBarPosition设置tab是在top还是bottom
                               tabBarPosition="bottom"
                            //是否显示标题
                            //wrap={false}
                            //是否打开下部导航栏
                               tabs={true}
                            //是否显示标签栏文字
                               showLabel={false}
                            //下部导航栏样式
                               tabBarStyle={styles.tabBarStyle}
                            //选项卡栏选择项目样式
                               tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                            //tab选中的颜色
                            //  activeBackgroundColor="white"
                            //tab没选中的颜色
                            // inactiveBackgroundColor="red"
                        >

                            <Scene key="homeBlock"
                                   initial={true}
                                   icon={tabIcon}
                                   online='ios-home'
                                   outline='ios-home'
                                   size={30}
                            >
                                <Scene key="home"
                                       initial={true}
                                       hideNavBar={false}
                                       navBar={NavBar}
                                       component={Home}
                                       LeftButton={HomeLeftButton}
                                       RightButton={InstructExecutingOp}
                                />
                                <Scene key="driverQRCode"
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}
                                       component={DriverQRCode}
                                       title='司机二维码'
                                       hideNavBar={false}
                                       hideTabBar={true}
                                       navBar={NavBar}/>
                                <Scene key="instructExecuting"
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOp}
                                       component={InstructExecuting}
                                       isRequirePopRefresh={true}
                                       title='调度指令'
                                       hideNavBar={false}
                                       hideTabBar={true}
                                       navBar={NavBar}/>
                                <Scene key="branchInstructExecuting"
                                       component={BranchInstructExecuting}
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}
                                       title='调度指令'
                                       isRequirePopRefresh={true}
                                       hideNavBar={false}
                                       hideTabBar={true}
                                       navBar={NavBar}/>
                                <Scene key="cars"
                                       title='装车信息'
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}
                                       component={Cars}
                                       hideTabBar
                                       navBar={NavBar}/>
                                <Scene key="searchCar"
                                       hideTabBar
                                       navBar={NavSearchCarBar}
                                       component={SearchCar}/>
                                <Scene key="carInfo"
                                       title='商品车信息'
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}
                                       component={CarInfo}
                                       hideTabBar
                                       navBar={NavBar}/>
                                <Scene key="vinScanner"
                                       component={VinScanner}
                                       title='扫条码'
                                       navBar={NavBar}
                                       hideTabBar
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}/>
                            </Scene>


                            <Scene key="truckBlock"
                                   icon={tabIcon}
                                   online='ios-bus'
                                   outline='ios-bus'
                                   size={30}
                            >
                                <Scene key="truck"
                                       initial={true}
                                       component={Truck}
                                       title="货车管理"
                                       navBar={NavBar}
                                />
                                <Scene key="truckInfo"
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}
                                       component={TruckInfo}
                                       title='车头资料'
                                       hideTabBar
                                       navBar={NavBar}/>
                                <Scene key="singlePhotoView"
                                       component={SinglePhotoView}
                                       hideTabBar={true}
                                       navBar={PhotoViewNavBar}
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}/>
                                <Scene key="trailerInfo"
                                       LeftButton={LeftButton}
                                       component={Trailer}
                                       title='挂车资料'
                                       hideTabBar
                                       navBar={NavBar}
                                       RightButton={InstructExecutingOc}/>
                                <Scene key="driverInfo"
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}
                                       component={DriverInfo}
                                       title='个人资料'
                                       hideTabBar
                                       navBar={NavBar} />





                                <Scene key="accidentList"
                                       component={AccidentList}
                                       title='事故列表'
                                       navBar={NavBar}
                                       hideTabBar
                                       LeftButton={LeftButton}
                                       RightButton={AccidentListOperation}/>
                                <Scene key="applyAccident"
                                       component={ApplyAccident}
                                       title='事故申报'
                                       hideTabBar
                                       navBar={NavBar}
                                       LeftButton={LeftButton}
                                       RightButton={ApplyAccidentSubmit} />
                                <Scene key="applyAccidentImage"
                                       component={ApplyAccidentImage}
                                       title='上传事故照片'
                                       navBar={NavBar}
                                       hideTabBar
                                       LeftButton={LeftButton}
                                       RightButton={ApplyAccidentImageSubmit} />



                                <Scene key="accidentResponsibilityList"
                                       component={AccidentResponsibilityList}
                                       title='事故责任列表'
                                       navBar={NavBar}
                                       hideTabBar
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}/>
                                <Scene key="accidentResponsibilityInfo"
                                       component={AccidentResponsibilityInfo}
                                       title='事故责任详情'
                                       navBar={NavBar}
                                       hideTabBar
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}/>


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
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}/>
                                <Scene key="peccancySearch"
                                       component={PeccancySearch}
                                       title='违章扣款查询'
                                       navBar={NavBar}
                                       hideTabBar
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}/>


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
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}/>
                                <Scene key="overuseDieselOilSearch"
                                       component={OveruseDieselOilSearch}
                                       title='超油扣款查询'
                                       navBar={NavBar}
                                       hideTabBar
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}/>




















                            </Scene>


                            <Scene key="driverBlock"
                                   icon={tabIcon}
                                   online='ios-contact'
                                   outline='ios-contact'
                                   size={30}
                                    >
                                <Scene key="work"
                                       initial={true}
                                       component={Work}
                                       title='工作管理'
                                       hideNavBar={false}
                                       navBar={NavBar} />
                                <Scene key="instruct"
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}
                                       component={Instruct}
                                       title='调度指令'
                                       hideNavBar={false}
                                       hideTabBar={true}
                                       navBar={NavBar} />
                                <Scene key="branchInstruct"
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}
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
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}/>

                            </Scene>


                            <Scene key="settingBlock"
                                   icon={tabIcon}
                                   online='ios-settings'
                                   outline='ios-settings'
                                   size={30}
                            >
                                <Scene key="setting"
                                       component={Settings}
                                       initial={true}
                                       title='设置'
                                       hideNavBar={false}
                                       navBar={NavBar} />
                                <Scene key="updatePassword"
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}
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
                                       RightButton={InstructExecutingOc}
                                       hideTabBar={true}
                                       navBar={NavBar} />
                                <Scene key="personalCenter"
                                       LeftButton={LeftButton}
                                       RightButton={InstructExecutingOc}
                                       component={PersonalCenter}
                                       title='个人中心'
                                       hideNavBar={false}
                                       hideTabBar={true}
                                       navBar={NavBar} />


                            </Scene>
                        </Stack>

                    </Scene>
                </Lightbox>
            </Modal>
        </Router>
    )
}

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Orientation.lockToPortrait()
    }

    render() {
        return (
            <Root/>
        )
    }
}

export default App
