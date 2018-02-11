import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { MapView, Marker } from 'react-native-amap3d'


class SelectAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0
        }
    }


    render() {
        console.log('props', this.props)
        //this.props.onSelect({ id: 1, value: '2' })
        return (
            <View>
                <MapView
                    locationEnabled
                    locationInterval={10000}
                    zoomLevel={14}
                    rotateEnabled={true}
                    showsCompass={true}
                    onLongPress={({ ...nativeEvent }) => {
                        console.log('onLongPress', nativeEvent)

                    }}
                    coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                    onLocation={({ nativeEvent }) => {
                        console.log(nativeEvent)
                        this.setState({
                            latitude: nativeEvent.latitude,
                            longitude: nativeEvent.longitude,
                        })
                    }}
                    showsZoomControls={false}
                    style={{ flex: 1 }}
                />
                <View>
                    
                </View>
            </View>
        )
    }
}

export default SelectAddress