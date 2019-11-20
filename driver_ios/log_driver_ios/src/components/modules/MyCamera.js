import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Modal, ActivityIndicator} from 'react-native'
import {RNCamera} from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import DataTime from './DataTime'
import Slider from 'react-native-slider'
import { LogLevel, RNFFmpeg } from 'react-native-ffmpeg'
import RNFS from 'react-native-fs'
import * as actions from "../../actions/index";

const window = Dimensions.get('window')

class MyCamera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFlashOn: false,
            isRecording: false,
            isStop: true,
            timeType: false,
            zoom: 0,
            value: 0,
            sideType: RNCamera.Constants.Type.back,
            data:'',
            waiting:false
        }
    }

    toggleFlash() {
        this.setState({isFlashOn: !this.state.isFlashOn})
    }

    _onChange = (value) => {
        this.setState({
            value: value
        })
    };

    isFlashOn() {
        if (this.state.isFlashOn === false) {
            return (
                <TouchableOpacity onPress={() => {
                    this.toggleFlash()
                }}>
                    <Image style={{width: 32, height: 30}} source={require('../../images/flash_close.png')}/>
                </TouchableOpacity>

            )
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.toggleFlash()
                }}>
                    <Image style={{width: 32, height: 30}} source={require('../../images/flash_auto.png')}/>
                </TouchableOpacity>

            )
        }

    }


    clickSwitchSide = () => {

        if (this.state.timeType) {
            return (
                    <Image style={{width: 33, height: 35,opacity: 0.2}} source={require('../../images/switch_camera.png')}/>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.setState({
                        sideType: this.state.sideType === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back,
                    });
                }}>
                    <Image style={{width: 33, height: 35}} source={require('../../images/switch_camera.png')}/>
                </TouchableOpacity>

            )
        }
    };

    onCancel() {
        this.setState({isStop: true});
    }
    upload(){
        this.setState({waiting: true});
        const path=this.state.data.replace("mov","mp4")
        RNFFmpeg.executeWithArguments(["-i", this.state.data,"-b:v","2M","-vf","scale=-2:1080", path]).then(result =>{

            //压缩成功
            if(result.rc==0) {
                this.props.setMyCamera(path);
                this.setState({waiting: false});
                RNFS.unlink(this.state.data).then(() => {
                    console.log('FILE DELETED');
                }).catch((err) => {
                    console.log(err.message);
                })
            }else {

            }
        } );

    }


    render() {

        return (
            <View style={{flex: 1}}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{flex: 1}}
                    type={this.state.sideType}
                    zoom={this.state.value}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={this.state.isFlashOn === true ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                    // faceDetectionLandmarks={
                    //     RNCamera.Constants.FaceDetection.Landmarks
                    //         ? RNCamera.Constants.FaceDetection.Landmarks.all
                    //         : undefined
                    // }
                    // faceDetectionClassifications={
                    //     RNCamera.Constants.FaceDetection.Classifications
                    //         ? RNCamera.Constants.FaceDetection.Classifications.all
                    //         : undefined
                    // }
                >
                    {({camera, status}) => {
                        return (
                            <View style={styles.preview}>
                                <View style={styles.time}>
                                    {this.state.timeType&&<Image style={{width: 10, height: 10}} source={require('../../images/dian.png')}/>}
                                    {this.state.timeType === true ? <DataTime/> :
                                        <Text style={styles.timeText}>00:00:00</Text>}

                                </View>

                                <View style={{flexDirection: 'column'}}>
                                    {this.state.isStop === true &&<View style={styles.subView}>
                                        <Slider style={styles.slider}
                                                minimumValue={0}
                                                maximumValue={0.1}
                                                step={0.01}
                                                value={this.state.value}
                                                onValueChange={this._onChange}/>
                                    </View>}
                                    <View style={styles.container}>
                                        {this.state.isStop === true ? <View>{this.isFlashOn()}</View> :
                                            <Text style={styles.text} onPress={() => {this.onCancel()}}>取消</Text>}
                                        {this.recordBtn(camera)}
                                        {this.state.isStop === true ? <View>{this.clickSwitchSide()}</View> :
                                            <Text style={styles.text} onPress={() => {this.upload()}}>上传</Text>}
                                    </View>
                                </View>
                                <Modal
                                    animationType={"fade"}
                                    transparent={true}
                                    visible={this.state.waiting}
                                    onRequestClose={() => { }}>
                                    <View style={styles.modalContainer} >
                                        <View style={styles.modalItem}>
                                            <ActivityIndicator
                                                animating={this.state.waiting}
                                                style={styles.modalActivityIndicator}
                                                size="large"
                                            />
                                            <Text style={styles.modalText}>正在上传视频...</Text>
                                        </View>
                                    </View>
                                </Modal>
                            </View>




                        );
                    }}
                </RNCamera>
            </View>
        );
    }

    recordBtn(camera) {
        if (this.state.isRecording === false) {
            if (this.state.isStop === true) {
                return (
                    <TouchableOpacity onPress={() => this.takeRecord(camera)}>
                        <Image style={{width: 60, height: 60}} source={require('../../images/shutter.png')}/>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <Image style={{width: 60, height: 60, opacity: 0.2}} source={require('../../images/shutter.png')}/>
                )
            }
        } else {
            return (
                <TouchableOpacity onPress={() => this.stopRecord(camera)}>
                    <Icon name='stop-circle-o' size={70} style={{color: "red"}}></Icon>
                </TouchableOpacity>
            )
        }
    }

    //开始录像
    takeRecord = async function (camera) {
        this.setState({isRecording: true});
        this.setState({timeType: true});
        const options = {quality: RNCamera.Constants.VideoQuality["1080p"], maxFileSize: (100 * 1024 * 1024)};
        const data = await camera.recordAsync(options);
        this.setState({data:data.uri});

    };

    //停止录像
    stopRecord(camera) {
        this.setState({isRecording: false});
        this.setState({isStop: false});
        this.setState({timeType: false});
        camera.stopRecording()
    }
}



const styles = StyleSheet.create({
    container: {
        width: window.width,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    time: {
        width: window.width,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        color: "white",
        fontSize: 18,
    },
    preview: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        width: 33,
        color: "white",
        fontSize: 16,
    },

    subView: {
        alignItems: 'center',
        width: 320
    },
    slider: {
        width: 280
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalActivityIndicator: {
        height: 40
    },
    modalText: {
        color: '#fff',
        paddingLeft: 10
    }
});

const mapStateToProps = (state) => {
    return {
        myCameraReducer: state.myCameraReducer,

    }
}

const mapDispatchToProps=(dispatch)=>({
    setMyCamera:(param)=>{
        dispatch(actions.myCameraAction.setMyCamera(param))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(MyCamera)



