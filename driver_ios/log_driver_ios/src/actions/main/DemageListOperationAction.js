import * as actionTypes from '../../actionTypes/index'

export const changeStatus = status => (dispatch) => {
    dispatch({ type: actionTypes.demageListOperationType.change_searchDemageListModel_status, payload: { status } })
}
