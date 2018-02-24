import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    status: false
}

export default handleActions({
    [actionTypes.demageResponsibilityListOperationTypes.change_searchDemageResponsibilityListModel_status]: (state, action) => {
        const { payload: { status } } = action
        return {
            status
        }
    }
}, initialState)