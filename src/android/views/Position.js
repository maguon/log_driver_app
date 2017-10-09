import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import AMapLocation from 'react-native-amap-location'

export default class Position extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accuracy: 29,
            adCode: "310114",
            address: "上海市嘉定区嘉三路靠近同济大学嘉定校区华楼",
            altitude: 0,
            bearing: 0,
            city: "上海市",
            cityCode: "021",
            country: "中国",
            district: "嘉定区",
            latitude: 31.285728,
            locationDetail: "-1",
            locationType: 4,
            longitude: 121.217404,
            poiName: "同济大学嘉定校区华楼",
            provider: "lbs",
            province: "上海市",
            satellites: 0,
            speed: 0,
            street: "嘉松北路",
            streetNum: "6128号",
            errorInfo: '',
            errorCode: ''
        }
    }

    componentDidMount() {
        this.listener = AMapLocation.addEventListener((data) => console.log('data', this.setState({ ...data })));
        
        AMapLocation.startLocation({
            accuracy: 'HighAccuracy',
            killProcess: true,
            needDetail: true,
        });
    }

    componentWillUnmount() {
        AMapLocation.stopLocation();
        this.listener.remove();
    }

    render() {
        return (
            <View>
                <Text>{this.state.accuracy}</Text>
                <Text>{this.state.adCode}</Text>
                <Text>{this.state.address}</Text>
                <Text>{this.state.altitude}</Text>
                <Text>{this.state.bearing}</Text>
                <Text>{this.state.city}</Text>
                <Text>{this.state.cityCode}</Text>
                <Text>{this.state.country}</Text>
                <Text>{this.state.district}</Text>
                <Text>{this.state.latitude}</Text>
                <Text>{this.state.locationDetail}</Text>
                <Text>{this.state.locationType}</Text>
                <Text>{this.state.longitude}</Text>
                <Text>{this.state.poiName}</Text>
                <Text>{this.state.provider}</Text>
                <Text>{this.state.province}</Text>
                <Text>{this.state.satellites}</Text>
                <Text>{this.state.speed}</Text>
                <Text>{this.state.street}</Text>
                <Text>{this.state.streetNum}</Text>
                <Text>{this.state.errorInfo}</Text>
                <Text>{this.state.errorCode}</Text>
            </View>
        )
    }
}