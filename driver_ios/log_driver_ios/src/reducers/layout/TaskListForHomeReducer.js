import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState={
    data:{
        taskList:[]
    },
    getTaskListForHome:{
        isResultStatus:0,
        errorMsg:'',
        failedMsg:''
    }
}

export default handleActions({
    [(actionTypes.taskListForHomeActionTypes.get_taskListForHome_success)]:(state, action)=>{
        const {payload:{taskList}}=action
        return{
            ...state,
            data:{
                ...state.date,
                taskList
            },
            getTaskListForHome: {
                ...state.getTaskListForHome,
                isResultStatus:2
            }
        }
    },
    [(actionTypes.taskListForHomeActionTypes.get_taskListForHome_waiting)]: (state, action) => {
        return {
            ...state,
            getTaskListForHome: {
                ...state.getTaskListForHome,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.taskListForHomeActionTypes.get_taskListForHome_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTaskListForHome: {
                ...state.getTaskListForHome,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.taskListForHomeActionTypes.get_taskListForHome_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTaskListForHome: {
                ...state.getTaskListForHome,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
},initialState)
