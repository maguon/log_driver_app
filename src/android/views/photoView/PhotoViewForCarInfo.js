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
import { file_host } from '../../../config/Host'
import * as carInfoAction from '../carInfo/CarInfoAction'
import SinglePhotoView from './SinglePhotoView'

const PhotoViewForCarInfo = props => {
    const { carInfoReducer: { data: { imageList, index } }, setCarImageIndex } = props
    return (
        <SinglePhotoView
            initParam={{ imageUrlList: imageList.map(item => `${file_host}/image/${item.url}`), index }}
            onIndexChanged={(index) => setCarImageIndex({ index })} />
    )
}

const mapStateToProps = (state) => ({
    carInfoReducer: state.carInfoReducer
})

const mapDispatchToProps = (dispatch) => ({
    setCarImageIndex: param => {
        dispatch(carInfoAction.setCarImageIndex(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewForCarInfo)