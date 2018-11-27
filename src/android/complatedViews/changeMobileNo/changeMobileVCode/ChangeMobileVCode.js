import React, { Component } from 'react'
import { Text, StyleSheet, ToastAndroid } from 'react-native'
import { Button } from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { connect } from 'react-redux'
import * as actions from '../../../../actions'
import { validatePhoneNotField } from '../../../../util/Validator'

class ChangeMobileVCode extends Component {
    render() {
        // console.log('this.props', this.props)

        const { changeMobileVCodeReducer: { data: { countDownTime } },
            changeMobileVCodeReducer, getVCode } = this.props
         console.log('countDownTime', countDownTime)
        return (
            <Button full disabled={changeMobileVCodeReducer.countDown.isResultStatus == 1} onPress={() => {
                const warnMsg = validatePhoneNotField('您输入的手机号码不正确，请重新输入！')(this.props.mobileNo)
                if (!warnMsg) {
                    getVCode(this.props.mobileNo)
                } else {
                    ToastAndroid.show(warnMsg, 10)
                }
            }} style={{ flex: 1, backgroundColor: changeMobileVCodeReducer.countDown.isResultStatus == 1 ? '#ccc' : styleColor }}>
                {changeMobileVCodeReducer.countDown.isResultStatus == 0 && <Text style={[globalStyles.midText, styles.buttonTitle]}>获取验证码</Text>}
                {changeMobileVCodeReducer.countDown.isResultStatus == 1 && <Text style={[globalStyles.midText, styles.buttonTitle]}>获取验证码({`${countDownTime}`})</Text>}
            </Button>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        changeMobileVCodeReducer: state.changeMobileVCodeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getVCode: param => {
        dispatch(actions.changeMobileVCode.getVCode(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMobileVCode)

const styles = StyleSheet.create({
    buttonTitle: {
        color: '#fff'
    }
})
