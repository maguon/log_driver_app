import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity, Animated
} from 'react-native'
import {Button, Container, Icon} from 'native-base'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import { Actions } from 'react-native-router-flux'
// import MyCamera from './MyCamera'
// import * as ImageFullPicker from 'react-native-full-image-picker'
// import  {RNCamera} from 'react-native-camera'


/***********************  临时解决方案，待改善：1，执行状态是否成功，成功数量。2，执行进度*/
//     //底部弹出框选项
//     title: '请选择',
//     cancelButtonTitle: '取消',
//     takePhotoButtonTitle: '拍照',
//     chooseFromLibraryButtonTitle: null,
//     customButtons: [{ title: '选择照片（一次最多5张）', name: 'choosePhoto' }],
//     allowsEditing: true,
//     noData: false,
const photoOptions = {
    quality: 1,//拍照之后得到的照片的质量
    title:"拍照",
    cancelable:"取消",
    maxWidth: 960, //拍照之后得到的照片的最大宽度
    maxHeight: 960,//拍照之后得到的照片的最大高度
    storageOptions: {//照片保存的位置
        skipBackup: true,
        path: 'images'
    }
}

const styles = StyleSheet.create({
    cameraButtonStyle: {
        borderRadius: 35,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1
    },
    modalBlankSpace: {
        flex: 1,
        alignSelf: 'stretch'
    },
    modalListSpace: {
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#ccc'
    },
    modalListItemTitle: {
        paddingVertical: 10,
        textAlign: 'center'
    },
    modalListHeadTitle: {
        paddingVertical: 10,
        textAlign: 'center'
    },
    listItemCutLine: {
        borderBottomWidth: 0.5,
        borderColor: '#eee'
    },
    ListHeadCutLine: {
        borderBottomWidth: 1,
        borderColor: styleColor
    }
})

export default class CameraButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            operationModalVisible: false,
            avatarSource:""
        }

        this.launchCamera = this.launchCamera.bind(this)
        this.openPicker = this.openPicker.bind(this)
        this.createResizedImage = this.createResizedImage.bind(this)
    }



    static defaultProps = {
        getImage: (param) => console.log('选择的图片信息', param), //回调图片信息
        _cameraStart: () => console.log('开始压缩选择的图片')//开始压缩选择的图片
    }

    launchCamera() {//打开照相机进行拍照
        ImagePicker.launchCamera(photoOptions, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled video picker')
            }
            else if (response.error) {
                //console.log('ImagePicker Error: ', response.error)
            }
            else {
                this.props.getImage([{
                    success: true,
                    res: {
                        imageUrl: response.uri,
                        imageType: response.type,
                        imageName: encodeURI(response.fileName)
                    }
                }])
            }
        })
    }



    createResizedImage(param) {//图片压缩
        if (param.height <= 960 && param.width <= 960) {
            const pos = param.path.lastIndexOf('/')
            return Promise.resolve({
                success: true,
                res: {
                    imageUrl: param.path,
                    imageType: param.mime,
                    imageName: encodeURI(param.path.substring(pos + 1))
                }
            })
        }
        return new Promise((resolve, reject) =>
            ImageResizer.createResizedImage(param.path, 960, 960, 'JPEG', 100)
                .then((resizedImageUri) => {
                    const pos = param.path.lastIndexOf('/')
                    resolve({
                        success: true,
                        res: {
                            imageUrl: resizedImageUri.uri,
                            imageType: param.mime,
                            imageName: encodeURI(param.path.substring(pos + 1))
                        }
                    })
                })
                .catch((err) => {
             console.log('err', err)

                    reject({
                        success: false,
                        errMsg: err
                    })
                })
        )
    }
    //在相册选择照片并压缩
 openPicker() {
     this._timer=setInterval(()=>{
         ImageCropPicker.openPicker({
             multiple: true
         }).then(images => {
           this.isPicker(images)

         }).catch(e => console.log(e));
         this._timer&&clearInterval(this._timer);

     },1000);


    }
    async isPicker(param){
        console.log("param",param)
        try{
            this.props._cameraStart()
            const newImages =await Promise.all(param.map(item => {
                return this.createResizedImage(item)
                console.log("item",item)
            }))
            console.log("newImages",newImages)
            this.props.getImage(newImages)
        }catch (err) {
            console.log('err', err)
        }

     }


    render() {
        return (
            <View>
                <Button
                    style={[styles.cameraButtonStyle, globalStyles.styleBackgroundColor]}
                    onPress={() => this.setState({ operationModalVisible: true })}
                    title='上传照片' >
                    <Icon name='camera' />
                </Button>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.operationModalVisible}
                    onRequestClose={() => this.setState({ operationModalVisible: false })}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalBlankSpace} onPress={() => this.setState({ operationModalVisible: false })} />
                        <View style={styles.modalListSpace}>
                            <View style={[styles.ListHeadCutLine]}>
                                <Text style={[styles.modalListHeadTitle, globalStyles.midText, globalStyles.styleColor]}>照相机</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.setState({ operationModalVisible: false }, this.openPicker)}>
                                <View style={styles.listItemCutLine}>
                                    <Text style={[styles.modalListItemTitle, globalStyles.midText]}>选择照片</Text>
                                </View>
                            </TouchableOpacity>
                            {this.props.type==="image"&&<TouchableOpacity
                                onPress={() => this.setState({ operationModalVisible: false }, this.launchCamera)}>
                                <View>
                                    <Text style={[styles.modalListItemTitle, globalStyles.midText]}>拍照</Text>
                                </View>
                            </TouchableOpacity>}
                            {this.props.type==="video"&&<TouchableOpacity
                                onPress={() => this.setState({ operationModalVisible: false }, Actions.myCamera())}>
                                <View>
                                    <Text style={[styles.modalListItemTitle, globalStyles.midText]}>摄像</Text>
                                </View>
                            </TouchableOpacity>}
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
