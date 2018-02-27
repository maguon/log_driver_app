import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    StatusBar,
} from 'react-native'
import { Button, Icon } from 'native-base'
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import globalStyles from '../GlobalStyles'
import ConfirmModal from './ConfirmModal'
import { file_host } from '../../config/Host'

const { width, height } = Dimensions.get('window')


export default class ImageView extends Component {
    constructor(props) {
        super(props)
        this.renderPagination = this.renderPagination.bind(this)
        this.renderPhoteView = this.renderPhoteView.bind(this)
        this.delImage = this.delImage.bind(this)
        this.state = {
            confirmModalVisible: false,
        }
        this.onPressCancel=this.onPressCancel.bind(this)
        this.onPressOk=this.onPressOk.bind(this)
        this.delImage=this.delImage.bind(this)
    }


    renderPagination(index, total, context) {
        return (
            <View style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: StatusBar.currentHeight + 24,
                left: 0,
                right: 0
            }}>
                <View style={{
                    borderRadius: 7,
                    backgroundColor: 'rgba(255,255,255,.15)',
                    padding: 3,
                    paddingHorizontal: 7
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 14
                    }}>{(index + 1).toString()} / {total.toString()}</Text>
                </View>
            </View>
        )
    }

    renderPhoteView(imageList) {
        return imageList.map((item, i) => {
            return <View key={i} style={{ flex: 1 }} >
                <PhotoView
                    source={{ uri: `${item}` }}
                    resizeMode='contain'
                    minimumZoomScale={1}
                    maximumZoomScale={3}
                    androidScaleType='fitCenter'
                    style={styles.photo}
                />
            </View>
        })
    }

    onPressOk() {
        const { imageViewReducer: { imageList } } = this.props
        this.setState({ confirmModalVisible: false })
        const str = `${file_host}/image/`
        const url = imageList[this.refs['Swiper'].state.index].replace(str, "")
        this.props.delImage(url)
    }

    onPressCancel() {
        this.setState({ confirmModalVisible: false })
    }

    delImage() {

        this.setState({ confirmModalVisible: true })

    }

    render() {
        const { imageViewReducer: { imageList }, imageIndex } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <Swiper
                    ref='Swiper'
                    index={imageIndex}
                    style={styles.wrapper}
                    renderPagination={this.renderPagination}
                    loop={false}
                    automaticallyAdjustContentInsets={true}
                >
                    {this.renderPhoteView(imageList)}
                </Swiper>
                <View style={{ position: 'absolute', top: 0, backgroundColor: 'rgba(255,255,255,0.1)', height: 40, width: width, flexDirection: 'row' }}>
                    <Button iconLeft transparent style={{ position: 'absolute', left: 0, }}
                        onPress={Actions.pop}>
                        <Icon style={{ color: '#888888' }} name='arrow-back' />
                        <Text style={[globalStyles.largeText, { color: '#888888' }]}>返回</Text>
                    </Button>
                    <Button iconLeft transparent style={{ position: 'absolute', right: 0, }}
                        onPress={this.delImage}
                    >
                        <Icon style={{ color: '#888888' }} name='ios-trash' />
                        <Text style={[globalStyles.largeText, { color: '#888888' }]}>删除</Text>
                    </Button>
                </View>
                <ConfirmModal
                    title='确认删除图片？'
                    isVisible={this.state.confirmModalVisible}
                    onPressOk={this.onPressOk}
                    onPressCancel={this.onPressCancel} />
            </View>
        )
    }
}

const styles = {
    wrapper: {
        backgroundColor: '#000',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        flex: 1
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
}