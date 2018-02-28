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
import ImageItem from '../share/ImageItem'
import globalStyles from '../../GlobalStyles'
import { connect } from 'react-redux'
import CameraButton from '../share/CameraButton'
import { file_host } from '../../../config/Host'
import { Container, Content, Input, Label, Icon } from 'native-base'
import * as  imagForAccidentAction from '../../../actions/ImagForAccidentAction'
import * as routerDirection from '../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'


const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadAccidentImageWaiting, uploadAccidentImage, imageList, parent, accidentId,truck_num } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadAccidentImageWaiting, uploadAccidentImage, accidentId,truck_num })
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
    const { index, uploadAccidentImageWaiting, uploadAccidentImage, accidentId,truck_num } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={(cameraReses) => uploadAccidentImage({ cameraReses, accidentId ,truck_num})}
                _cameraStart={uploadAccidentImageWaiting}
            />
        </View>
    )
}

const renderListEmpty = props => {
    const { uploadAccidentImageWaiting, uploadAccidentImage,truck_num,accidentId } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={(cameraReses) => uploadAccidentImage({ cameraReses,truck_num,accidentId })}
                    _cameraStart={uploadAccidentImageWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor]}>点击按钮上传事故照片</Text>
            </View>
            {/* <View style={styles.subtitleContainer}>
                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>若不进行此选项操作可直接点击“<Text style={styles.tagText}>完成</Text>”</Text>
            </View> */}
        </View>
    )
}

const ImageEditorForAccident = props => {
    const { parent,
        uploadAccidentImageWaiting,
        uploadAccidentImage,
        accidentInfo: { id,truck_num },
        imageForAccidentReducer: { data: { imageList }, uploadAccidentImage: { isResultStatus } } } = props
    return (
        <Container >
            <FlatList
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                data={imageList.length > 0 ? [...imageList, 'isCameraButton'] : imageList}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ uploadAccidentImageWaiting,accidentId: id, uploadAccidentImage,truck_num })}
                renderItem={({ item, index }) => renderItem({ parent, accidentId: id, truck_num,item, index, imageList, uploadAccidentImageWaiting, uploadAccidentImage })} />
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
    return {
        imageViewReducer: {
            imageList: state.imageForAccidentReducer.data.imageList.map(item => `${file_host}/image/${item.url}`)
        }
    }
}

const imageMapDispatchToProps = (dispatch, ownProps) => ({
    delImage: (param) => {
        dispatch(imagForAccidentAction.delImage(param))
    }
})

const mapStateToProps = (state) => {
    return {
        imageForAccidentReducer: state.imageForAccidentReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadAccidentImageWaiting: () => {
        dispatch(imagForAccidentAction.uploadAccidentImageWaiting())
    },
    uploadAccidentImage: (param) => {
        dispatch(imagForAccidentAction.uploadAccidentImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageEditorForAccident)