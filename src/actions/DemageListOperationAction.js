import * as actionTypes from '../actionTypes'

export const changeStatus = status => (dispatch) => {
    dispatch({ type: actionTypes.demageListOperationTypes.change_searchDemageListModel_status, payload: { status } })
}