import { handleActions } from 'redux-actions'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    // isLoginWaiting: false,
    // isLoginSuccess: false,
    // isJump: false,
    user: {
        userId: 81,
        token: '1ywJhLyNBFFSYT00GR3XQEoGdbY=kqGaXMwwc7b9b2a47d0761a84c7b520e7b4b5a158224ed684020456cea8ae90aa1e48d58202e3a59c0a31647ced14d56192e1e26',
        userType: 1,
        userStatus: 1,
        mobile: '18888',
        driverId: 163,
        truckId: 258
        // userId: 0,
        // token: '',
        // userType: 1,
        // userStatus: 1,
        // mobile: ''
    },
    isResultStatus: 0,
    isExecStatus: 0,
    errorMsg: '',
    failedMsg: ''
}

export default handleActions({

}, initialState)