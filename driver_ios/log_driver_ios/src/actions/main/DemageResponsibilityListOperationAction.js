import * as actionTypes from '../../actionTypes/index'

export const changeStatus = status => (dispatch) => {
    dispatch({ type: actionTypes.demageResponsibilityListOperationType.change_searchDemageResponsibilityListModel_status, payload: { status } })
}
