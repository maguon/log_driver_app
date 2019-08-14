import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    status: false
}

export default handleActions({
    [actionTypes.demageListOperationType.change_searchDemageListModel_status]: (state, action) => {
        const { payload: { status } } = action
        return {
            status
        }
    }
}, initialState)
