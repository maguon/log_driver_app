import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Modal,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Input, Label, Icon } from 'native-base'
import CameraButton from '../../components/share/CameraButton'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../GlobalStyles'
import * as applyDamageImageAction from './ApplyDamageImageAction'
import ImageItem from '../../components/share/ImageItem'
import { base_host, file_host, record_host } from '../../../config/Host'
import * as routerDirection from '../../../util/RouterDirection'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadDamageImageWating, uploadDamageImage, imageList, parent, vin } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadDamageImageWating, uploadDamageImage, vin })
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
    const { index, uploadDamageImageWating, uploadDamageImage, vin } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={(param) => uploadDamageImage(param, vin)}
                _cameraStart={uploadDamageImageWating}
            />
        </View>
    )
}

const renderListEmpty = props => {
    const { uploadDamageImageWating, uploadDamageImage, vin } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={(param) => uploadDamageImage(param, vin)}
                    _cameraStart={uploadDamageImageWating} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor]}>点击按钮上传质损图片</Text>
            </View>
            <View style={styles.subtitleContainer}>
                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>若不进行此选项操作可直接点击“<Text style={styles.tagText}>完成</Text>”</Text>
            </View>
        </View>
    )
}

const ApplyDemageImage = props => {
    const { parent, vin, uploadDamageImageWating, uploadDamageImage, applyDamageImageReducer: { data: { imageList }, uploadDamageImage: { isResultStatus } } } = props
    return (
        <Container >
            <FlatList
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                data={imageList.length > 0 ? [...imageList, 'isCameraButton'] : imageList}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ uploadDamageImageWating, uploadDamageImage, vin })}
                renderItem={({ item, index }) => renderItem({ parent, item, index, imageList, uploadDamageImageWating, vin, uploadDamageImage })} />
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
        applyDamageImageReducer: state.applyDamageImageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadDamageImage: (param, vin) => {
        dispatch(applyDamageImageAction.uploadDamageImage(param, vin))
    },
    uploadDamageImageWating: () => {
        dispatch(applyDamageImageAction.uploadDamageImageWating())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyDemageImage)
