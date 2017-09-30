import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as InitializationAction from '../../actions/InitializationAction'
import { Actions } from 'react-native-router-flux'
import InitializationLayout from '../components/Initialization'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import { Linking, ToastAndroid } from 'react-native'

class Initialization extends Component {
    constructor(props) {
        super(props)
        this.linkDownload = this.linkDownload.bind(this)
        this.validateToken = this.validateToken.bind(this)
        this.getAppLastVersion = this.getAppLastVersion.bind(this)
    }

    componentDidMount() {
        // localStorage.removeKey(localStorageKey.USER)
        this.getAppLastVersion()
    }

    getAppLastVersion() {
        this.props.getAppLastVersion({
            optionalParam: {
                app: 2,
                type: 1
            }
        })
    }

    validateToken() {
        this.props.validateToken()
    }

    linkDownload(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url)
            } else {
                return Linking.openURL(url)
            }
        }).catch(err => console.error('An error occurred', err))
    }

    componentWillReceiveProps(nextProps) {
        let { InitializationReducer } = nextProps

        if (InitializationReducer.valdateToken.isExecStatus == 1) {
           // console.log('welcome.valdateToken', '开始执行')
        } else if (InitializationReducer.valdateToken.isExecStatus == 2) {
            if (InitializationReducer.valdateToken.isResultStatus == 0) {
                this.props.resetInitialization()
                Actions.mainRoot()
              //  console.log('welcome.valdateToken 执行成功', InitializationReducer.getVersion.data)
            } else if (InitializationReducer.valdateToken.isResultStatus == 1) {
                //console.log('welcome.valdateToken 执行错误', InitializationReducer.getVersion.errorMsg)
            }
            else if (InitializationReducer.valdateToken.isResultStatus == 2) {
              //  console.log('welcome.valdateToken 执行失败', InitializationReducer.getVersion.failedMsg)
                this.props.resetInitialization()
                Actions.mainRoot()
            }
        }

        if (InitializationReducer.getVersion.isExecStatus == 1) {
          //  console.log('welcome.getVersion', '开始执行')
        } else if (InitializationReducer.getVersion.isExecStatus == 2) {
            if (InitializationReducer.getVersion.isResultStatus == 0) {
              //  console.log('welcome.getVersion执行成功', InitializationReducer.getVersion.data)
                let versionArr = InitializationReducer.getVersion.data.version.split('.')
                let lastVersionArr = InitializationReducer.getVersion.data.lastVersion.split('.')
                if (!((versionArr[0] < lastVersionArr[0] || versionArr[1] < lastVersionArr[1] || versionArr[2] < lastVersionArr[2]) && InitializationReducer.getVersion.data.force_update == 1)) {
                    this.props.validateToken()
                    this.props.resetGetVersion()
                }
            } else if (InitializationReducer.getVersion.isResultStatus == 1) {
              //  console.log('welcome.getVersion执行错误', InitializationReducer.getVersion.errorMsg)
                ToastAndroid.showWithGravity('获取版本信息失败，请检测网络', ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
            else if (InitializationReducer.getVersion.isResultStatus == 2) {
              //  console.log('welcome.getVersion执行失败', InitializationReducer.getVersion.failedMsg)
                ToastAndroid.showWithGravity('获取版本信息失败，请检测网络', ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        }


    }

    render() {
        const { version, lastVersion, force_update, url } = this.props.InitializationReducer.getVersion.data
        const { isExecStatus, isResultStatus } = this.props.InitializationReducer.getVersion
        return (
            <InitializationLayout
                version={version}
                lastVersion={lastVersion}
                force_update={force_update}
                url={url}
                isExecStatus={isExecStatus}
                isResultStatus={isResultStatus}
                linkDownload={this.linkDownload}
                validateToken={this.validateToken}
                getAppLastVersion={this.getAppLastVersion}
            />
        )
    }
}


const mapStateToProps = (state) => {
    return {
        InitializationReducer: state.InitializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAppLastVersion: (param) => {
        dispatch(InitializationAction.getAppLastVersion(param))
    },
    validateToken: () => {
        dispatch(InitializationAction.validateToken())
    },
    resetInitialization: () => {
        dispatch(InitializationAction.resetInitialization())
    },
    resetGetVersion: () => {
        dispatch(InitializationAction.resetGetVersion())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Initialization)
