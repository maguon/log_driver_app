import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native'

import { connect } from 'react-redux'
import CameraButton from '../modules/CameraButton'
import { Container } from 'native-base'
import { Actions } from 'react-native-router-flux'
import Video from 'react-native-video';


const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9


const CameraEditorForAccident = props => {
    const {myCameraReducer: { updateMyCamera: { id }  } } = props
console.log("props",props)
    return (
        <Container >

            <TouchableOpacity style={styles.itemContainer}
                              onPress={() => Actions.cameraView()}
            >
                {/*<CameraItem cameraUrl={`${file_host}/file/${id}/video.mp4`}/>*/}

                <View style={styles.container}>
                    <Video
                        ref={(ref: Video) => { //方法对引用Video元素的ref引用进行操作
                            this.video = ref
                        }}
                        // source={{ uri: 'https://gslb.miaopai.com/stream/HNkFfNMuhjRzDd-q6j9qycf54OaKqInVMu0YhQ__.mp4?ssig=bbabfd7684cae53660dc2d4c2103984e&time_stamp=1533631567740&cookie_id=&vend=1&os=3&partner=1&platform=2&cookie_id=&refer=miaopai&scid=HNkFfNMuhjRzDd-q6j9qycf54OaKqInVMu0YhQ__', type: 'mpd' }}
                        source={{ uri: id,type: 'mp4' }}//设置视频源
                        paused={true}//暂停
                        style={styles.camera}//组件样式
                        repeat={false}//确定在到达结尾时是否重复播放视频。
                    />
                </View>

            </TouchableOpacity>
            <View style={styles.itemCameraButton}>
                <CameraButton
                    // getImage={(cameraReses) => uploadAccidentCamera({ cameraReses, id})}
                    // _cameraStart={uploadAccidentCameraWaiting}
                    type={"video"}
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        margin: 5
    },
    itemCameraButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: containerWidth,
        height: containerHeight
    },
    container: {
        borderColor: '#ccc',
        justifyContent: 'center',
        borderWidth: 0.3,
        width:  (window.width - (2 + 1) * 10) / 2,
        height: containerWidth / 16 * 9
    },
    camera: {
        flex: 1
    }
})


const mapStateToProps = (state) => {
    return {

        communicationSettingReducer:state.communicationSettingReducer,
        myCameraReducer:state.myCameraReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    // uploadAccidentCameraWaiting: () => {
    //     dispatch(actions.cameraEditorForAccidentAction.uploadAccidentCameraWaiting())
    // },
    // uploadAccidentCamera: (param) => {
    //     dispatch(actions.cameraEditorForAccidentAction.uploadAccidentCamera(param))
    // },
    // getAccidentCamera:(param)=>{
    //     dispatch(actions.cameraEditorForAccidentAction.getAccidentCamera(param))
    // }
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraEditorForAccident)
