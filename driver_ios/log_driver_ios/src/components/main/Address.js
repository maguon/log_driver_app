import React, {Component} from 'react'
import {
    Text,
    View
} from 'react-native'
import {MapView, Marker} from 'react-native-amap3d'
import {Button} from 'native-base'
import globalStyles from '../utils/GlobalStyles'
import {connect} from 'react-redux'
import * as actions from '../../actions/index'

class Address extends Component {
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
        const {
            onSelect, getAddress, addressReducer: {
                data: {
                    addressInfo
                }
            }
        } = this.props

        // console.log("addressInfo",addressInfo)
        return (
            <View style={{flex: 1}}>
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
                        if (this.state.active) {
                            getAddress({
                                location: `${nativeEvent.longitude},${nativeEvent.latitude}`,
                                key: '22d16ea40b6fdb3ebc3daa1b48db3287',
                                extensions: 'all',
                                batch: 'false',
                                radius: '1000'
                            })
                        }
                    }}
                    coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                    onLocation={({ nativeEvent }) => {
                        this.setState({
                            latitude: nativeEvent.latitude,
                            longitude: nativeEvent.longitude,
                        })
                        // console.log("nativeEvent",nativeEvent)
                        if (!this.state.active) {
                            getAddress({
                                location: `${nativeEvent.longitude},${nativeEvent.latitude}`,
                                key: '22d16ea40b6fdb3ebc3daa1b48db3287',
                                extensions: 'all',
                                batch: 'false',
                                radius: '1000'
                            })
                        }
                    }}
                    showsZoomControls={false}
                    style={{ flex: 1 }}>
                    <Marker
                        infoWindowDisabled={true}
                        coordinate={{ latitude: this.state.onlatitude, longitude: this.state.onlongitude }}
                    />
                </MapView>
                <View style={{flexDirection: 'row'}}>
                    <View style={{padding: 5, flex: 5}}>
                        <Text style={[globalStyles.midText, {padding: 5, fontWeight: 'bold'}]}>
                            {addressInfo.formatted_address ? `${addressInfo.formatted_address}` : ''}
                        </Text>
                        <Text style={[globalStyles.midText, {padding: 5}]}>
                            {addressInfo.addressComponent ? `${addressInfo.addressComponent.city}${addressInfo.addressComponent.district}${addressInfo.addressComponent.streetNumber.street}${addressInfo.addressComponent.streetNumber.number}` : ''}</Text>
                    </View>
                    <View>
                        <Button style={{flex: 1}} transparent onPress={() => onSelect({
                            value: addressInfo.addressComponent ? `${addressInfo.addressComponent.city}${addressInfo.addressComponent.district}${addressInfo.addressComponent.streetNumber.street}${addressInfo.addressComponent.streetNumber.number}` : '',
                            lng: this.state.active ? this.state.onlongitude : this.state.longitude,
                            lat: this.state.active ? this.state.onlatitude : this.state.latitude
                        })}>
                            <Text style={[globalStyles.midText, globalStyles.styleColor]}>确定</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addressReducer: state.addressReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAddress: (param) => {
        dispatch(actions.addressAction.getAddress(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Address)
