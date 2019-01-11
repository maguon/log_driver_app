import * as actionTypes from '../../../actionTypes/index'
import localStorageKey from '../../../util/LocalStorageKey'
import localStorage from '../../../util/LocalStorage'
import { ToastAndroid } from 'react-native'



export const saveCommunicationSetting = param => (dispatch) => {
    const { url } = param
    localStorage.save({
        key: localStorageKey.SERVERADDRESS,
        data: {
            base_host: `http://api.${url}/api`,
            file_host: `http://files.${url}/api`,
            record_host: `http://records.${url}/api`,
            host: url
        }
    })
    dispatch({ 
        type: actionTypes.communicationSetting.save_communicationSetting_success, payload: {
            base_host: `http://api.${url}/api`,
            file_host: `http://files.${url}/api`,
            record_host: `http://records.${url}/api`,
            host: url
    }})
    // ToastAndroid.show('保存成功！', 10)

}