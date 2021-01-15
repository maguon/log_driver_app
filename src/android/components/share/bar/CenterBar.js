import React,{Component} from 'react'
import {View, StatusBar, Text,StyleSheet, Dimensions, TouchableOpacity, InteractionManager} from 'react-native'
import {Header, Title, Right, Left, Body, Icon} from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import * as LoginAction from "../../../complatedViews/login/LoginAction";
import * as SysNotificationAction from "../../../complatedViews/sysNotification/SysNotificationAction";
import {connect} from "react-redux";
const { width } = Dimensions.get('window')

class CenterBar extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hidden: false
        }
    }
    // componentDidMount(){
    //     this.props.getSysNotification()
    // }


    render() {
        const {RightButton, LeftButton, parent, initParam, layout: {initWidth}, sysNotificationReducer: {data: {sysNotificationList}},
            getSysNotificationAll,getSysNotification, getSysNotificationListWaiting} = this.props

        const count = sysNotificationList.filter(item => item.readStatus == 1)
        console.log('sysNotificationList', sysNotificationList)
        return (

            <View style={[styles.container, {width: initWidth}]}>
                <StatusBar hidden={false}/>
                <Header
                    androidStatusBarColor={styleColor}
                    style={[styles.header, globalStyles.styleBackgroundColor]}>
                    {LeftButton && <Left style={{flex: 1}}>
                        <LeftButton parent={parent}/>
                    </Left>}

                    {count!=""&&<Body style={{marginLeft: width * 0.20}}>

                        <TouchableOpacity style={{flexDirection: "row"}} onPress={()=>{
                            getSysNotification()
                             getSysNotificationListWaiting()
                            Actions.sysNotification()
                            InteractionManager.runAfterInteractions(getSysNotificationAll())
                        }}>

                            <MaterialCommunityIcons name='bell-outline' size={20} color={'#fffff9'}
                                                    style={styles.itemBlockMaterialIcon}/>
                            <View style={styles.round}>
                                <Text style={styles.text}>{count.length ? `${count.length}` : ''}</Text>
                            </View>
                        </TouchableOpacity>
                    </Body>}
                    <Right style={{flex: 1}}>
                        {RightButton && <RightButton parent={parent} initParam={initParam}/>}
                    </Right>
                </Header>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        backgroundColor: '#fff'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 4
    },
    round:{
        width:10,
        height:10,
        borderRadius:30,
        position:"relative",
        left:-8,
        backgroundColor: "red",
        opacity:0.8,
        justifyContent: 'center',
        alignItems: "center"
    },
    text:{
        fontSize:8,
        color:"#ffffff"
    }
})
const mapStateToProps = (state) => {
    return {
        sysNotificationReducer: state.sysNotificationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getSysNotification: () => {
        dispatch(SysNotificationAction.getSysNotification())
    },
    getSysNotificationAll: () => {
        dispatch(SysNotificationAction.getSysNotificationAll())
    },
    getSysNotificationListWaiting: () => {
        dispatch(SysNotificationAction.getSysNotificationListWaiting())

    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CenterBar)

