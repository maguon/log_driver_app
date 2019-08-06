import React from 'react'
import { Text, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import SingleImageItem from '../modules/SingleImageItem'
import ImageItem from '../utils/ImageItem'
import { Actions } from 'react-native-router-flux'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, truckImageList, driving_image, license_image,file_host } = props
    if (item == 'isDriverImage') {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    Actions.singlePhotoView({ initParam: { imageUrlList: [`${file_host}/image/${driving_image}`], index: 1 }, title: '行驶证照片' })
                }} >
                <SingleImageItem title='行驶证' imageUrl={driving_image ? `${file_host}/image/${driving_image}` : null} />
            </TouchableOpacity>
        )
    } else if (item == 'isLicenseImage') {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    Actions.singlePhotoView({ initParam: { imageUrlList: [`${file_host}/image/${license_image}`], index: 1 }, title: '营运证照片' })
                }} >
                <SingleImageItem title='营运证' imageUrl={license_image ? `${file_host}/image/${license_image}` : null} />
            </TouchableOpacity>
        )
    } else {

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    Actions.singlePhotoView({ initParam: { imageUrlList: truckImageList, index }, title: '车头照片' })
                }} >
                <ImageItem imageUrl={item} />
            </TouchableOpacity>
        )
    }
}


const TruckImage = props => {
    const { truckImageReducer: { data: { truckImageList } }, truckDetailReducer: { data: { truckInfo: { driving_image, license_image } } }, parent } = props
    const { loginReducer: { url: { file_host } } } = props
    return (
        <Container>
            <FlatList
                style={styles.flatList}
                keyExtractor={(item, index) => `${index}`}
                data={['isDriverImage', 'isLicenseImage', ...truckImageList.map(item => `${file_host}/image/${item.url}`)]}
                numColumns={2}
                renderItem={({ item, index }) => renderItem({
                    parent, item, index, truckImageList: truckImageList.map(item => `${file_host}/image/${item.url}`), driving_image,file_host, license_image
                })} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        truckImageReducer: state.truckImageReducer,
        truckDetailReducer: state.truckDetailReducer,
        loginReducer:state.loginReducer
    }
}


const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 40,
        alignItems: 'center'
    },
    itemContainer: {
        margin: 5
    },
    flatList: {
        padding: 5
    }
})


export default connect(mapStateToProps)(TruckImage)
