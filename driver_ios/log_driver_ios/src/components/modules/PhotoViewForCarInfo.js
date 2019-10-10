import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
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

const mapStateToProps = (state) => ({
    carInfoReducer: state.carInfoReducer,
    loginReducer: state.loginReducer,
    communicationSettingReducer:state.communicationSettingReducer
})

const mapDispatchToProps = (dispatch) => ({
    setCarImageIndex: param => {
        dispatch(actions.carInfoAction.setCarImageIndex(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewForCarInfo)
