import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import ImageItem from '../utils/ImageItem'
import globalStyles from '../utils/GlobalStyles'
import CameraButton from '../modules/CameraButton'
import * as  actions from '../../actions/index'


const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadAccidentImageWaiting, uploadAccidentImage, imageList, parent,file_host } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadAccidentImageWaiting, uploadAccidentImage })
    } else {
        return (
            <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => Actions.singlePhotoView({ initParam: { imageUrlList: imageList.map(url => `${file_host}/image/${url}`), index } })} >
                <ImageItem imageUrl={`${file_host}/image/${item}`} />
            </TouchableOpacity>
        )
    }
}

const renderItemCameraButton = props => {
    const { index, uploadAccidentImageWaiting, uploadAccidentImage } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={(cameraReses) => uploadAccidentImage({ cameraReses })}
                _cameraStart={uploadAccidentImageWaiting}
            />
        </View>
    )
}

const renderListEmpty = props => {
    const { uploadAccidentImageWaiting, uploadAccidentImage } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={(cameraReses) => uploadAccidentImage({ cameraReses })}
                    _cameraStart={uploadAccidentImageWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor]}>点击按钮上传事故照片</Text>
            </View>
            <View style={styles.subtitleContainer}>
                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>若不进行此选项操作可直接点击“<Text style={styles.tagText}>完成</Text>”</Text>
            </View>
        </View>
    )
}

const ApplyAccidentImage = props => {
    const { parent,
        uploadAccidentImageWaiting,
        uploadAccidentImage,
        applyAccidentImageReducer: { data: { accidentImageList }, uploadAccidentImage: { isResultStatus } } } = props
    const { communicationSettingReducer: { data: { file_host} } } = props
    return (
        <Container >
            <FlatList
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                data={accidentImageList.length > 0 ? [...accidentImageList, 'isCameraButton'] : accidentImageList}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ uploadAccidentImageWaiting, uploadAccidentImage })}
                renderItem={({ item, index }) => renderItem({ parent, item, index, imageList: accidentImageList, uploadAccidentImageWaiting,file_host, uploadAccidentImage })} />
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={isResultStatus == 1}
                onRequestClose={() => { }}>
                <View style={styles.modalContainer} >
                    <View style={styles.modalItem}>
                        <ActivityIndicator
                            animating={isResultStatus == 1}
                            style={styles.modalActivityIndicator}
                            size="large"
                        />
                        <Text style={styles.modalText}>正在上传图片...</Text>
                    </View>
                </View>
            </Modal>
        </Container>
    )
}

const styles = StyleSheet.create({
    cameraButtonContainer: {
        marginTop: 50
    },
    subtitleContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center'
    },
    tagText: {
        color: 'red'
    },
    itemContainer: {
        margin: 5
    },
    listEmptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatList: {
        padding: 5
    },
    itemCameraButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: containerWidth,
        height: containerHeight
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
})

const mapStateToProps = (state) => {
    return {
        applyAccidentImageReducer: state.applyAccidentImageReducer,
        communicationSettingReducer: state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadAccidentImageWaiting: () => {
        dispatch(actions.applyAccidentImageAction.uploadAccidentImageWaiting())
    },
    uploadAccidentImage: (param) => {
        dispatch(actions.applyAccidentImageAction.uploadAccidentImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyAccidentImage)
