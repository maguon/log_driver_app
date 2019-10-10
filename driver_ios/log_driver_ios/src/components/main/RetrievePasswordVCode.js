import React, { Component } from 'react'
import {Text, StyleSheet, Alert} from 'react-native'
import { Button} from 'native-base'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import { validatePhoneNotField } from '../../util/Validator'


class RetrievePasswordVCode extends Component {
    render() {
        // console.log('this.props', this.props)
        const { retrievePasswordVCodeReducer: { data: { countDownTime } },
            retrievePasswordVCodeReducer, getVCode } = this.props
        // console.log('countDownTime', countDownTime)
        return (
            <Button full disabled={retrievePasswordVCodeReducer.countDown.isResultStatus == 1} onPress={() => {
                if (!this.props.server) {
                    // Toast.show({
                    //     text:'服务器不能为空！',
                    // })
                    Alert.alert(
                        '',
                        '服务器不能为空！',
                        [
                            {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        ],
                        {cancelable: false}
                    )
                    return
                }
                const warnMsg = validatePhoneNotField('您输入的手机号码不正确，请重新输入！')(this.props.mobileNo)
                if (!warnMsg) {
                    getVCode({
                        mobileNo: this.props.mobileNo,
                        server: this.props.server
                    })
                } else {
                    // Toast.show({
                    //     text:warnMsg,
                    // })
                    Alert.alert(
                        '',
                        warnMsg,
                        [
                            {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        ],
                        {cancelable: false}
                    )
                }

            }} style={{ flex: 1, backgroundColor: retrievePasswordVCodeReducer.countDown.isResultStatus == 1 ? '#ccc' : styleColor }}>
                {retrievePasswordVCodeReducer.countDown.isResultStatus == 0 && <Text style={[globalStyles.midText, styles.buttonTitle]}>获取验证码</Text>}
                {retrievePasswordVCodeReducer.countDown.isResultStatus == 1 && <Text style={[globalStyles.midText, styles.buttonTitle]}>获取验证码({`${countDownTime}`})</Text>}
            </Button>
        )
    }
}

const styles = StyleSheet.create({
    buttonTitle: {
        color: '#fff'
    }
})

const mapStateToProps = (state) => {
    return {
        retrievePasswordVCodeReducer: state.retrievePasswordVCodeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getVCode: param => {
        dispatch(actions.retrievePasswordVCodeAction.getVCode(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RetrievePasswordVCode)


