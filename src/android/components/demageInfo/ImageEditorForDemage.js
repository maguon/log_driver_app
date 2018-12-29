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
import ImageItem from '../share/imageItem/ImageItem'
import globalStyles from '../../GlobalStyles'
import { connect } from 'react-redux'
import CameraButton from '../../components/share/imageItem/CameraButton'
import { Container, Content, Input, Label, Icon } from 'native-base'
import * as  imageListForDemageAction from './ImageListForDemageAction'
import { Actions } from 'react-native-router-flux'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadDamageImageWaiting, uploadDamageImage, demageImageList, parent, damageId, vin, file_host } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadDamageImageWaiting, uploadDamageImage, damageId, vin })
    } else {
        return (
            <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => Actions.imageViewConnect({
                    mapStateToProps: imageMapStateToProps,
                    mapDispatchToProps: imageMapDispatchToProps,
                    imageIndex: index
                })} >
                <ImageItem imageUrl={`${file_host}/image/${item.url}`} />
            </TouchableOpacity>
        )
    }
}

const renderItemCameraButton = props => {
    const { index, uploadDamageImageWaiting, uploadDamageImage, damageId, vin } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={(cameraReses) => uploadDamageImage({ cameraReses, damageId, vin })}
                _cameraStart={uploadDamageImageWaiting}
            />
        </View>
    )
}

const renderListEmpty = props => {
    const { uploadDamageImageWaiting, uploadDamageImage, damageId, vin } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={(cameraReses) => uploadDamageImage({ cameraReses, damageId, vin })}
                    _cameraStart={uploadDamageImageWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor]}>点击按钮上传质损图片</Text>
            </View>
            {/* <View style={styles.subtitleContainer}>
                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>若不进行此选项操作可直接点击“<Text style={styles.tagText}>完成</Text>”</Text>
            </View> */}
        </View>
    )
}

const ImageEditorForDemage = props => {
    const { parent,
        uploadDamageImageWaiting,
        uploadDamageImage,
        imageListForDemageReducer: { data: { demageImageList }, uploadDamageImage: { isResultStatus } },
        initParam: { id, vin } } = props
    const { communicationSettingReducer: { data: { file_host } } } = props
    return (
        <Container >
            <FlatList
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                data={demageImageList.length > 0 ? [...demageImageList, 'isCameraButton'] : demageImageList}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ uploadDamageImageWaiting, uploadDamageImage, damageId: id, vin })}
                renderItem={({ item, index }) => renderItem({ parent, item, index, demageImageList, uploadDamageImageWaiting, uploadDamageImage, damageId: id, vin, file_host })} />
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

const imageMapStateToProps = (state) => {
    const { communicationSettingReducer: { data: { file_host } } } = state
    return {
        imageViewReducer: {
            imageList: state.imageListForDemageReducer.data.demageImageList.map(item => `${file_host}/image/${item.url}`)
        }
    }
}

const imageMapDispatchToProps = (dispatch, ownProps) => ({
    delImage: (param) => {
        dispatch(imageListForDemageAction.delImage(param))
    }
})

const mapStateToProps = (state) => {
    return {
        imageListForDemageReducer: state.imageListForDemageReducer,
        communicationSettingReducer: state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadDamageImageWaiting: () => {
        dispatch(imageListForDemageAction.uploadDamageImageWaiting())
    },
    uploadDamageImage: (param) => {
        dispatch(imageListForDemageAction.uploadDamageImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageEditorForDemage)