import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import ImageItem from '../share/ImageItem'
import globalStyles from '../../GlobalStyles'
import { connect } from 'react-redux'
import { file_host } from '../../../config/Host'
// import * as routerDirection from '../../../../util/RouterDirection'
import {Actions} from 'react-native-router-flux'

const renderItem = props => {
    const { item, index, parent, imageList } = props
    return (
        <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => Actions.singlePhotoView({ initParam: { imageUrlList: imageList.map(url => `${file_host}/image/${url.url}`), index } })} >
            <ImageItem imageUrl={`${file_host}/image/${item.url}`} />
        </TouchableOpacity>
    )
}

const renderListEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={globalStyles.midText}>暂无照片</Text>
        </View>
    )
}

const ImageListForAccident = props => {
    const { imageForAccidentReducer: { data: { imageList } }, parent } = props
    return (
        <FlatList
            style={styles.flatList}
            data={imageList}
            numColumns={2}
            ListEmptyComponent={renderListEmpty}
            renderItem={({ item, index }) => renderItem({ item, index, parent, imageList })} />
    )
}

const mapStateToProps = (state) => {
    return {
        imageForAccidentReducer: state.imageForAccidentReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ImageListForAccident)

const styles = StyleSheet.create({
    itemContainer: {
        margin: 5
    },
    flatList: {
        padding: 5
    },
    listEmptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

