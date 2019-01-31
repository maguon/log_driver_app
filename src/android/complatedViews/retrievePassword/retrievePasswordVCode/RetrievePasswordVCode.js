import React, { Component } from 'react'
import { Text, StyleSheet, ToastAndroid } from 'react-native'
import { Button } from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { connect } from 'react-redux'
import * as actions from '../../../../actions'
import { validatePhoneNotField } from '../../../../util/Validator'


class RetrievePasswordVCode extends Component {
    render() {
        // console.log('this.props', this.props)
        const { retrievePasswordVCodeReducer: { data: { countDownTime } },
            retrievePasswordVCodeReducer, getVCode } = this.props
         console.log('countDownTime', countDownTime)
        return (
            <Button full disabled={retrievePasswordVCodeReducer.countDown.isResultStatus == 1} onPress={() => {
                if (!this.props.server) {
                    ToastAndroid.show('服务器不能为空！', 10)
                    return
                }
                const warnMsg = validatePhoneNotField('您输入的手机号码不正确，请重新输入！')(this.props.mobileNo)
                if (!warnMsg) {
                    getVCode({
                        mobileNo: this.props.mobileNo,
                        server: this.props.server
                    })
                } else {
                    ToastAndroid.show(warnMsg, 10)
                }

            }} style={{ flex: 1, backgroundColor: retrievePasswordVCodeReducer.countDown.isResultStatus == 1 ? '#ccc' : styleColor }}>
                {retrievePasswordVCodeReducer.countDown.isResultStatus == 0 && <Text style={[globalStyles.midText, styles.buttonTitle]}>获取验证码</Text>}
                {retrievePasswordVCodeReducer.countDown.isResultStatus == 1 && <Text style={[globalStyles.midText, styles.buttonTitle]}>获取验证码({`${countDownTime}`})</Text>}
            </Button>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        retrievePasswordVCodeReducer: state.retrievePasswordVCodeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getVCode: param => {
        dispatch(actions.retrievePasswordVCode.getVCode(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RetrievePasswordVCode)

const styles = StyleSheet.create({
    buttonTitle: {
        color: '#fff'
    }
})
