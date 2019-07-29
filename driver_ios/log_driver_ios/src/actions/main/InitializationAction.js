import * as actionTypes from '../../actionTypes/index'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import httpRequest from '../../util/HttpRequest'

import {Actions} from 'react-native-router-flux'
import {base_host} from "../../config/Host";
import  config from '../../config/Host'
import {ObjectToUrl} from '../../util/ObjectToUrl'
import * as ios_app from '../../ios_app.json'

/**
 * initApp:APP初始化
 * param：对应执行步骤执行时所需要的参数
 * currentStep：执行到第N步（从1开始）
 * tryCount:当遇到网络错误的时候尝试的次数（从1开始）
 *
 * 初始化流程：
 * 第一步：验证版本是否是最新版本
 * 第二步：取得本地localstorage的数据
 * 第三步：换network request 所需要的token
 */



export const getComunicationSetting = () => async (dispatch) => {
    try {
        // localStorage.save({
        //     key: localStorageKey.SERVERADDRESS,
        //     data: {
        //         // http://stg.myxxjs.com:9001/api
        //         base_host: `http://stg.myxxjs.com:9001/api`,
        //         file_host: `http://files.stg.myxxjs.com:9001/api`,
        //         record_host: `http://records.stg.myxxjs.com:9001/api`,
        //         host: "myxxjs"
        //     }
        // })
          const localStorageRes = await localStorage.load({ key: localStorageKey.SERVERADDRESS })
         console.log('localStorageRes'+localStorageRes)
         const { base_host, file_host, record_host, host } = localStorageRes
        if (base_host && file_host && record_host && host) {
            await dispatch({
                type: actionTypes.loginTypes.get_communicationSetting_success, payload: {
                    base_host, file_host, record_host, host
                }
            })
            dispatch(validateVersion())
        } else {
             console.log('Actions.mainRoot')
            Actions.mainRoot()
        }

    } catch (err) {
         console.log('err', err)
    }

}

//第一步：获取最新version信息
export const validateVersion=()=>async (dispatch,getState)=>{
    const currentStep=1
    try{
        const { loginReducer:{url:{base_host}}}=getState()
        dispatch({type:actionTypes.initializationTypes.init_app_waiting,payload:{}})
        const  url=`${base_host}/app?${ObjectToUrl({app:ios_app.type,type:ios_app.ios})}`
        console.log(base_host)
        const res=await httpRequest.get(url)

        if(res.success){
          console.log(res)
        }else {


        }



    }catch (err) {
        console.log("===========================")
    }
}


export const initPush = param => async (dispatch) => {


}
