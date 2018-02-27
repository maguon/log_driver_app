import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageView from '../components/ImageView' 


const ImageViewConnect = props => {
    const { mapStateToProps, mapDispatchToProps ,imageIndex,damageId} = props
    const ImageViewComponent = connect(mapStateToProps, mapDispatchToProps)(ImageView)
    return (
        <ImageViewComponent imageIndex={imageIndex} damageId={damageId}/>
    )
}
export default ImageViewConnect