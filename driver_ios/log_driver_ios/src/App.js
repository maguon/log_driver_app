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


//初始页面
import Initialization from './components/main/Initialization'
import Login from './components/main/Login'
import RetrievePassword from './components/main/RetrievePassword'
import DetermineLogin from './components/main/DetermineLogin'

//导航相关页面
import Home from './components/main/Home'
// import InstructExecuting from './components/main/InstructExecuting'
import DriverQRCode from './components/main/DriverQRCode'
import Contact from './components/main/Contact'
import Bus from './components/main/Bus'
import Settings from './components/main/Settings'


//通用
import tabIcon from './components/utils/TabIcon'
import HomeLeftButton from './components/utils/HomeLeftButton'
// import InstructExecutingOp from './components/utils/InstructExecutingOp'
import NavBar from './components/layout/NavBar'
import HomeOperation from './components/utils/HomeOperation'
import LeftButton from './components/utils/LeftButton'



const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    },
    navigationBarStyle: {}
})


const onEnter=()=>{
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




                            {/*<Stack key="loginGroup" >*/}
                                {/*<Scene key="login" initial={true} component={Login} hideNavBar hideTabBar/>*/}
                                {/*<Scene key="retrievePassword" title='找回密码'  component={RetrievePassword} hideTabBar*/}
                                       {/*hideNavBar={false} navBar={NavBar} LeftButton={LeftButton} />*/}
                            {/*</Stack>*/}



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
                                           component={Home}
                                           hideNavBar={false}
                                           navBar={NavBar}
                                           LeftButton={HomeLeftButton}
                                           RightButton={HomeOperation}
                                    />

                                    {/*<Scene key="instructExecuting"*/}
                                           {/*LeftButton={LeftButton}*/}
                                           {/*component={InstructExecuting}*/}
                                           {/*isRequirePopRefresh={true}*/}
                                           {/*RightButton={InstructExecutingOp}*/}
                                           {/*title='调度指令'*/}
                                           {/*hideNavBar={false}*/}
                                           {/*hideTabBar={true}*/}
                                           {/*navBar={NavBar} />*/}

                                    <Scene key="driverQRCode"
                                           LeftButton={LeftButton}
                                           component={DriverQRCode}
                                           title='司机二维码'
                                           hideNavBar={false}
                                           hideTabBar={true}
                                           navBar={NavBar}/>
                                </Scene>
                                <Scene key="bus"
                                       navBar={NavBar}
                                       component={Bus}
                                       title="货车管理"
                                       icon={tabIcon}
                                       online='ios-bus'
                                       outline='ios-bus'
                                       size={30}
                                >
                                </Scene>
                                <Scene key="contact"
                                       navBar={NavBar}
                                       component={Contact}
                                       title="工作管理"
                                       icon={tabIcon}
                                       online='ios-contact'
                                       outline='ios-contact'
                                       size={30}
                                >
                                </Scene>
                                <Scene key="settings"
                                       navBar={NavBar}
                                       component={Settings}
                                       title="设置"
                                       icon={tabIcon}
                                       online='ios-settings'
                                       outline='ios-settings'
                                       size={30}
                                >
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

    render() {
        return (
            <Root/>
        )
    }
}

export default App
