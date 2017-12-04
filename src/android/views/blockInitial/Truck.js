import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

export default class Truck extends Component {
    render() {
        return (
            <View>
                <View style={{ backgroundColor: '#00cade', flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#4edbf0' }}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.truckInfo}>
                        <MaterialCommunityIcons name='truck' size={30} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 11 }}>车头资料</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.trailerInfo}>
                        <MaterialCommunityIcons name='truck-trailer' size={30} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 11 }}>挂车资料</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.driverInfo}>
                        <MaterialCommunityIcons name='account' size={30} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 11 }}>个人资料</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={Actions.fuelFillingRecord}>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 30, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <MaterialCommunityIcons name='gas-station' size={40} color='#00cade' />
                        </View>
                        <View style={{ paddingLeft: 20, flex: 1 }}>
                            <Text>加油记录</Text>
                        </View>
                        <View>
                            <EvilIcons name='chevron-right' size={40} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}