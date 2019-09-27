import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
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
        dispatch(actions.addCarImageAction.setCreateCarImageIndex(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewForCreateCar)
