import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        imageList: []
    },
    uploadAccidentImage:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getAccidentImageList:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    
},initialState)