import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    StatusBar,
} from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as addCarImageAction from '../uploadImageForCreateCar/AddCarImageAction'
import SinglePhotoView from './SinglePhotoView'

const PhotoViewForCreateCar = props => {
    const { addCarImageReducer: { data: { imageList, index } }, setCreateCarImageIndex } = props
    const { communicationSettingReducer: { data: { file_host} } } = props
    return (
        <SinglePhotoView
            initParam={{ imageUrlList: imageList.map(item => `${file_host}/image/${item}`), index }}
            onIndexChanged={(index) => setCreateCarImageIndex({ index })} />
    )
}

const mapStateToProps = (state) => ({
    addCarImageReducer: state.addCarImageReducer,
    communicationSettingReducer:state.communicationSettingReducer
})

const mapDispatchToProps = (dispatch) => ({
    setCreateCarImageIndex: param => {
        dispatch(addCarImageAction.setCreateCarImageIndex(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewForCreateCar)