import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { MapView, Marker } from 'react-native-amap3d'
import { Button } from 'native-base'
import globalStyles from '../../GlobalStyles'

class SelectAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0,
            onlatitude: 0,
            onlongitude: 0,
            active: false
        }
    }


    render() {
        const { onSelect } = this.props
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    locationEnabled
                    locationInterval={10000}
                    zoomLevel={14}
                    rotateEnabled={true}
                    showsCompass={true}
                    onLongPress={({ nativeEvent }) => {
                        this.setState({
                            onlatitude: nativeEvent.latitude,
                            onlongitude: nativeEvent.longitude,
                            active: true
                        })
                    }}
                    coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                    onLocation={({ nativeEvent }) => {
                        this.setState({
                            latitude: nativeEvent.latitude,
                            longitude: nativeEvent.longitude,
                        })
                    }}
                    showsZoomControls={false}
                    style={{ flex: 1 }}>
                    <Marker
                        infoWindowDisabled={true}
                        coordinate={{ latitude: this.state.onlatitude, longitude: this.state.onlongitude }}
                    />
                </MapView>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ padding: 5, flex: 5 }}>
                        <Text style={[globalStyles.midText, { padding: 5, fontWeight: 'bold' }]}>
                        {this.state.active ? this.state.onlatitude : this.state.latitude}
                        </Text>
                        <Text style={[globalStyles.midText, { padding: 5 }]}>
                        {this.state.active ? this.state.onlongitude : this.state.longitude}</Text>
                    </View>
                    <View>
                        <Button style={{ flex: 1 }} transparent onPress={() => { }}>
                            <Text style={[globalStyles.midText, globalStyles.styleColor]}>确定</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

export default SelectAddress