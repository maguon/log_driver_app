import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const getTruckInfo = (param) => (dispatch) => {

}

export const resetGetTruckInfo = (param) => (dispatch) => {
     dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckInfo, payload: {} })
}

export const setGetTruckInfoWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_WAITING, payload: {} })
}

export const getTruckRecord = (param) => (dispatch) => {

}

export const resetGetTruckRecord = (param) => (dispatch) => {
     dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckRecord, payload: {} })
}

export const setGetTruckRecordWaiting = (param) => (dispatch) => {

}

export const getTruckInsurance = (param) => (dispatch) => {

}

export const resetGetTruckInsurance = (param) => (dispatch) => {
     dispatch({ type: actionTypes.truckInfoTypes.RESET_GET_TruckInsurance, payload: {} })
}

export const setGetTruckInsuranceWaiting = (param) => (dispatch) => {

}