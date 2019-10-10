import * as actionTypes from '../../actionTypes/index'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import { Toast } from 'native-base'



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
    // console.log('url',url)
    dispatch({
        type: actionTypes.communicationSettingActionType.save_communicationSetting_success, payload: {
            base_host: `http://api.${url}/api`,
            file_host: `http://files.${url}/api`,
            record_host: `http://records.${url}/api`,
            host: url
        }})
     // Toast.show({text:'保存成功！'})
}
