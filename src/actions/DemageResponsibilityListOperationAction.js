import * as actionTypes from '../actionTypes'

export const changeStatus = status => (dispatch) => {
    dispatch({ type: actionTypes.demageResponsibilityListOperationTypes.change_searchDemageResponsibilityListModel_status, payload: { status } })
}