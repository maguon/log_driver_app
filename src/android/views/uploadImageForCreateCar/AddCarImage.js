import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import { Button, Icon, Spinner, Container } from 'native-base'
import CameraButton from '../../components/share/imageItem/CameraButton'
import ImageItem from '../../components/share/imageItem/ImageItem'
import { connect } from 'react-redux'
import * as addCarImageAction from './AddCarImageAction'
import globalStyles from '../../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import * as routerDirection from '../../../util/RouterDirection'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadCarImageWaiting, uploadCarImage, imageList, parent, setCreateCarImageIndex, file_host } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadCarImageWaiting, uploadCarImage })
    } else {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    setCreateCarImageIndex({ index })
                    Actions.photoViewForCreateCar()
                }} >
                <ImageItem imageUrl={`${file_host}/image/${item}`} />
            </TouchableOpacity>
        )
    }
}

const renderItemCameraButton = props => {
    const { index, uploadCarImageWaiting, uploadCarImage } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={uploadCarImage}
                _cameraStart={uploadCarImageWaiting}
            />
        </View>
    )
}

const renderListEmpty = props => {
    const { uploadCarImageWaiting, uploadCarImage } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={uploadCarImage}
                    _cameraStart={uploadCarImageWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor]}>点击按钮上传车辆图片</Text>
            </View>
            <View style={styles.subtitleContainer}>
                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>若不进行此选项操作可直接点击“<Text style={styles.tagText}>完成</Text>”</Text>
            </View>
        </View>
    )
}

const AddCarImage = props => {
    const { parent, uploadCarImageWaiting, uploadCarImage, setCreateCarImageIndex,
        addCarImageReducer: { data: { imageList }, uploadCarImage: { isResultStatus } } } = props
    const { communicationSettingReducer: { data: { file_host } } } = props
    return (
        <Container >
            <FlatList
                style={styles.flatList}
                keyExtractor={(item, index) => index}
                data={imageList.length > 0 ? [...imageList, 'isCameraButton'] : imageList}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ uploadCarImageWaiting, uploadCarImage })}
                renderItem={({ item, index }) => renderItem({ parent, item, index, imageList, file_host, uploadCarImageWaiting, uploadCarImage, setCreateCarImageIndex })} />
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
        addCarImageReducer: state.addCarImageReducer,
        communicationSettingReducer: state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadCarImageWaiting: () => {
        dispatch(addCarImageAction.uploadCarImageWaiting())
    },
    uploadCarImage: (param) => {
        dispatch(addCarImageAction.uploadCarImage(param))
    },
    setCreateCarImageIndex: param => {
        dispatch(addCarImageAction.setCreateCarImageIndex(param))

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCarImage)