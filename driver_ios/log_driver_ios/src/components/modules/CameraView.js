import React, {Component} from 'react'
import {
    Text,
    View,
    Dimensions,
    StatusBar,
} from 'react-native'
import {connect} from 'react-redux'
import Video from 'react-native-video';

const {width, height} = Dimensions.get('window')


class CameraView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
        };
    }


    render() {
        const {myCameraReducer: { updateMyCamera: { id }  } } = this.props
        console.log("id",id)
        return (
            <View style={{flex: 1, backgroundColor: '#000'}}>
                <Video
                    ref={(ref: Video) => {
                        this.video = ref
                    }}
                    // source={{
                    //     uri: 'https://gslb.miaopai.com/stream/HNkFfNMuhjRzDd-q6j9qycf54OaKqInVMu0YhQ__.mp4?ssig=bbabfd7684cae53660dc2d4c2103984e&time_stamp=1533631567740&cookie_id=&vend=1&os=3&partner=1&platform=2&cookie_id=&refer=miaopai&scid=HNkFfNMuhjRzDd-q6j9qycf54OaKqInVMu0YhQ__',
                    //     type: 'mpd'
                    // }}
                     source={{ uri:id ,type: 'mp4'}}//设置视频源
                    style={styles.camera}//组件样式
                    rate={this.state.rate}//播放速率
                    // paused={this.state.paused}//暂停
                    volume={this.state.volume}//调节音量
                    muted={this.state.muted}//控制音频是否静音
                    resizeMode={this.state.resizeMode}//缩放模式
                    // onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                    // onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                    // onEnd={this.onEnd}//视频播放结束时的回调函数
                    // onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
                    // onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
                    repeat={false}//确定在到达结尾时是否重复播放视频。
                />
            </View>
        )
    }
}

const styles = {
    container: {
        borderColor: '#ccc',
        justifyContent: 'center',
        width: width,
        height: height
    },
    camera:{
        flex: 1
    },
}

const mapStateToProps = (state) => {
    return {
        myCameraReducer:state.myCameraReducer
    }
}

export default connect(mapStateToProps)(CameraView)
