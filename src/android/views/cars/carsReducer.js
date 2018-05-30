import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        taskInfo: {},
        carList: []
    },
    getCommandCarList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    finishCarry: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    pushCarInCommand: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [actionTypes.carsTypes.GET_CommandCarList_SUCCESS]: (state, action) => {
        const { payload: { data: { carList, taskInfo } } } = action
        return {
            ...state,
            data: {
                carList: carList.map(item => {
                    return {
                        data: item,
                        removeCommandCar: {
                            isResultStatus: 0,
                            errorMsg: '',
                            failedMsg: '',
                            serviceFailedMsg: ''
                        }
                    }
                }),
                taskInfo
            },
            getCommandCarList: {
                ...state.getCommandCarList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carsTypes.GET_CommandCarList_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCommandCarList: {
                ...state.getCommandCarList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.carsTypes.GET_CommandCarList_WAITING]: (state, action) => {
        return {
            ...state,
            getCommandCarList: {
                ...state.getCommandCarList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carsTypes.GET_CommandCarList_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCommandCarList: {
                ...state.getCommandCarList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.carsTypes.GET_CommandCarList_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCommandCarList: {
                ...state.getCommandCarList,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },

    [actionTypes.carsTypes.PUSH_CarInCommand_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carList: [...state.data.carList, {
                    data, removeCommandCar: {
                        isResultStatus: 0,
                        errorMsg: '',
                        failedMsg: '',
                        serviceFailedMsg: ''
                    }
                }]
            },
            pushCarInCommand: {
                ...state.pushCarInCommand,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carsTypes.PUSH_CarInCommand_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            pushCarInCommand: {
                ...state.pushCarInCommand,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.carsTypes.PUSH_CarInCommand_WAITING]: (state, action) => {
        return {
            ...state,
            pushCarInCommand: {
                ...state.pushCarInCommand,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carsTypes.PUSH_CarInCommand_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            pushCarInCommand: {
                ...state.pushCarInCommand,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.carsTypes.PUSH_CarInCommand_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            pushCarInCommand: {
                ...state.pushCarInCommand,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [actionTypes.carsTypes.RESET_PUSH_CarInCommand]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            pushCarInCommand: {
                ...initialState.pushCarInCommand
            }
        }
    },

    [actionTypes.carsTypes.Finish_Carry_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carList:[...state.data.carList],
                taskInfo: {
                    ...state.data.taskInfo,
                    load_task_status: data
                }
            },
            finishCarry: {
                ...state.finishCarry,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carsTypes.Finish_Carry_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            finishCarry: {
                ...state.finishCarry,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [actionTypes.carsTypes.Finish_Carry_WAITING]: (state, action) => {
        return {
            ...state,
            finishCarry: {
                ...state.finishCarry,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carsTypes.Finish_Carry_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            finishCarry: {
                ...state.finishCarry,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [actionTypes.carsTypes.Finish_Carry_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            finishCarry: {
                ...state.finishCarry,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [actionTypes.carsTypes.RESET_Finish_Carry]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            finishCarry: {
                ...initialState.finishCarry
            }
        }
    },

    [actionTypes.carsTypes.REMOVE_CommandCar_SUCCESS]: (state, action) => {
        const { payload: { data: { id } } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carList: [...state.data.carList.map(item => {
                    if (item.data.id == id) {
                        return {
                            ...item,
                            removeCommandCar: {
                                ...item.removeCommandCar,
                                isResultStatus: 2
                            }
                        }
                    } else {
                        return item
                    }
                })]
            }
        }
    },
    [actionTypes.carsTypes.REMOVE_CommandCar_FAILED]: (state, action) => {
        const { payload: { data: { id, failedMsg } } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carList: [...state.data.carList.map(item => {
                    if (item.data.id == id) {
                        return {
                            ...item,
                            removeCommandCar: {
                                ...item.removeCommandCar,
                                isResultStatus: 4,
                                failedMsg
                            }
                        }
                    } else {
                        return item
                    }
                })]
            }
        }
    },
    [actionTypes.carsTypes.REMOVE_CommandCar_WAITING]: (state, action) => {
        const { payload: { data: { id } } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carList: [...state.data.carList.map(item => {
                    if (item.data.id == id) {
                        return {
                            ...item,
                            removeCommandCar: {
                                ...item.removeCommandCar,
                                isResultStatus: 1
                            }
                        }
                    } else {
                        return item
                    }
                })]
            }
        }
    },
    [actionTypes.carsTypes.REMOVE_CommandCar_ERROR]: (state, action) => {
        const { payload: { data: { id, errorMsg } } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carList: [...state.data.carList.map(item => {
                    if (item.data.id == id) {
                        return {
                            ...item,
                            removeCommandCar: {
                                ...item.removeCommandCar,
                                isResultStatus: 3,
                                errorMsg
                            }
                        }
                    } else {
                        return item
                    }
                })]
            }
        }
    },
    [actionTypes.carsTypes.REMOVE_CommandCar_SERVICEERROR]: (state, action) => {
        const { payload: { data: { id, serviceFailedMsg } } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carList: [...state.data.carList.map(item => {
                    if (item.data.id == id) {
                        return {
                            ...item,
                            removeCommandCar: {
                                ...item.removeCommandCar,
                                isResultStatus: 5,
                                serviceFailedMsg
                            }
                        }
                    } else {
                        return item
                    }
                })]
            }
        }
    },
    [actionTypes.carsTypes.RESET_REMOVE_CommandCar]: (state, action) => {
        const { payload: { data: { id } } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carList: [...state.data.carList.filter(item => item.data.id != id)]
            }
        }
    }
}, initialState)