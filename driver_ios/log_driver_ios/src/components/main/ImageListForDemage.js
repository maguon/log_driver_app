import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import ImageItem from '../utils/ImageItem'
import globalStyles from '../utils/GlobalStyles'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

const renderItem = props => {
    const { item, index, parent, demageImageList,file_host } = props
    return (
        <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => Actions.singlePhotoView({ initParam: { imageUrlList: demageImageList.map(url => `${file_host}/image/${url.url}`), index } })} >
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

const ImageListForDemageInfo = props => {
    const { imageListForDemageReducer: { data: { demageImageList } }, parent } = props
    const { loginReducer: { url: { file_host} } } = props
    return (
        <FlatList
            style={styles.flatList}
            data={demageImageList}
            numColumns={2}
            ListEmptyComponent={renderListEmpty}
            renderItem={({ item, index }) => renderItem({ item, index, parent, demageImageList,file_host })} />
    )
}

const mapStateToProps = (state) => {
    return {
        imageListForDemageReducer: state.imageListForDemageReducer,
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ImageListForDemageInfo)

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

