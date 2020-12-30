import React,{Component} from 'react'
import {Button, Icon, Spinner} from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as LoginAction from "../../../complatedViews/login/LoginAction";
import * as SysNotificationAction from "../../../complatedViews/sysNotification/SysNotificationAction";
import {connect} from "react-redux";

const NotLeftButton=props=>{
   const {getSysNotification}=props

                return (
                    <Button transparent onPress={() => {
                                    getSysNotification()
                                    Actions.pop()
                            }}>
                            <Icon name='arrow-back'/>
                    </Button>
                )

}
const mapStateToProps = (state) => {
        return {
                sysNotificationReducer: state.sysNotificationReducer
        }
}

const mapDispatchToProps = (dispatch) => ({
        getSysNotification: () => {
                dispatch(SysNotificationAction.getSysNotification())
        }
})
export default connect(mapStateToProps, mapDispatchToProps)(NotLeftButton)
