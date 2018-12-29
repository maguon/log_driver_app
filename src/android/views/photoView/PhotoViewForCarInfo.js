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
import * as carInfoAction from '../carInfo/CarInfoAction'
import SinglePhotoView from './SinglePhotoView'

const PhotoViewForCarInfo = props => {
    const { carInfoReducer: { data: { imageList, index } }, setCarImageIndex } = props
    const { communicationSettingReducer: { data: { file_host} } } = props
    return (
        <SinglePhotoView
            initParam={{ imageUrlList: imageList.map(item => `${file_host}/image/${item.url}`), index }}
            onIndexChanged={(index) => setCarImageIndex({ index })} />
    )
}

//const { communicationSettingReducer: { data: { record_host,base_host, file_host} } } = getState()

const mapStateToProps = (state) => ({
    carInfoReducer: state.carInfoReducer,
    communicationSettingReducer: state.communicationSettingReducer
})

const mapDispatchToProps = (dispatch) => ({
    setCarImageIndex: param => {
        dispatch(carInfoAction.setCarImageIndex(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewForCarInfo)