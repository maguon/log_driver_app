import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import SinglePhotoView from './SinglePhotoView'

const PhotoViewForCreateCar = props => {
    const { addCarImageReducer: { data: { imageList, index } }, setCreateCarImageIndex } = props
    const { loginReducer: { url: { file_host} } } = props
    return (
        <SinglePhotoView
            initParam={{ imageUrlList: imageList.map(item => `${file_host}/image/${item}`), index }}
            onIndexChanged={(index) => setCreateCarImageIndex({ index })} />
    )
}

const mapStateToProps = (state) => ({
    addCarImageReducer: state.addCarImageReducer,
    loginReducer:state.loginReducer
})

const mapDispatchToProps = (dispatch) => ({
    setCreateCarImageIndex: param => {
        dispatch(actions.addCarImageAction.setCreateCarImageIndex(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewForCreateCar)
