import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { MapView, Marker } from 'react-native-amap3d'

const SelectAddress = props => {
    return (
        <MapView
            locationEnabled
            locationInterval={10000}
            zoomLevel={14}
            rotateEnabled={true}
            showsCompass={true}
            onLongPress={({ ...nativeEvent})=>{
                console.log('onLongPress',nativeEvent)
                
            }}
           // coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
            onLocation={({ nativeEvent }) => {
                console.log('onLocation',nativeEvent)
                
                // this.setState({
                //     latitude: nativeEvent.latitude,
                //     longitude: nativeEvent.longitude,
                // })
            }}
            showsZoomControls={false}
            style={{ flex: 1 }}
        />
    )
}

export default SelectAddress