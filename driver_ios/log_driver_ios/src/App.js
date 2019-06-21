import React, {Component} from 'react';
import {StyleSheet, View, Text} from "react-native";
import {connect} from 'react-redux'
import tabIcon from './components/utils/TabIcon'
import Home from './components/main/Home'
import Contact from './components/main/Contact'
import Bus from './components/main/Bus'
import Settings from './components/main/Settings'
import HomeLeftButton from './components/main/HomeLeftButton'
import NavBar from './components/layout/NavBar'
import HomeOperation from './components/main/HomeOperation'
import LeftButton from './components/layout/LeftButton'
import DriverQRCode from './components/utils/DriverQRCode'
import Initialization from './components/main/Initialization'
import Login from './components/main/Login'
import RetrievePassword from './components/main/RetrievePassword'
import CommunicationSetting from './components/main/CommunicationSetting'

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


const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    },
    navigationBarStyle: {}
})


const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer
    }
}

const getSceneStyle = (props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    }
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 65
        style.marginBottom = computedProps.hideTabBar ? 0 : 50
    }
    return style
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

                        <Scene initial={true} key="initialization" component={Initialization}

                        />
                        {/*<Scene key="loginGroup" />*/}
                        {/*<Scene key="appMain"/>*/}
                        {/*<Scene key="version"/>*/}
                        {/*<Scene key="guide"/>*/}
                        <Stack
                            key="mainRoot"
                            component={connect(mapStateToProps)(Login)}
                            tabs={true}
                            // type={ActionConst.RESET}
                            // selector={(props) => {
                            //     const { user } = props.loginReducer.data
                            //     if (user.mobile
                            //         && user.token
                            //         && user.uid
                            //         && user.status
                            //         && user.type) {
                            //         return 'main'
                            //     } else {
                            //         return 'loginBlock'
                            //     }
                            // }}
                        >
                            <Scene key="loginGroup">
                                <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar/>
                                <Scene key="retrievePassword" title='找回密码' component={RetrievePassword} hideTabBar
                                       hideNavBar={false} LeftButton={LeftButton} navBar={NavBar}/>
                                <Scene key="communicationSetting" title='通讯设置' component={CommunicationSetting}
                                       hideTabBar hideNavBar={false} LeftButton={LeftButton} navBar={NavBar}/>
                            </Scene>
                            <Scene key="appMain"
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
                            </Scene>
                            <Scene key="version"> </Scene>
                            <Scene key="guide"> </Scene>
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

//
//
// const mapStateToProps = (state) => {
//     return {
//         testComponentReducer: state.testComponentReducer
//     }
// }


export default App
