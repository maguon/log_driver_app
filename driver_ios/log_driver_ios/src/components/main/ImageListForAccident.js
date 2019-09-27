import React from 'react'
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
    const { item, index, imageList, file_host } = props
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
    const { communicationSettingReducer: { data: { file_host } } } = props
    const { imageForAccidentReducer: { data: { imageList } }, parent } = props
    return (
        <FlatList
            keyExtractor={(item, index) => `${index}`}
            style={styles.flatList}
            data={imageList}
            numColumns={2}
            ListEmptyComponent={renderListEmpty}
            renderItem={({ item, index }) => renderItem({ item, index, parent, imageList, file_host })} />
    )
}



const mapStateToProps = (state) => {
    return {
        imageForAccidentReducer: state.imageForAccidentReducer,
        loginReducer: state.loginReducer,
        communicationSettingReducer:state.communicationSettingReducer
    }
}


export default connect(mapStateToProps)(ImageListForAccident)

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

