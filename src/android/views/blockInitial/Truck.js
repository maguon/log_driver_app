import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Truck extends Component {
    render() {
        return (
            <View>
                <View style={{ backgroundColor: '#00cade', flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#4edbf0' }}>
                    <TouchableNativeFeedback onPress={Actions.truckInfo} background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <MaterialCommunityIcons name='truck' size={30} color='#fff' />
                            <Text style={{ color: '#fff', fontSize: 11 }}>车头资料</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={Actions.trailerInfo} background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <MaterialCommunityIcons name='truck-trailer' size={30} color='#fff' />
                            <Text style={{ color: '#fff', fontSize: 11 }}>挂车资料</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={Actions.driverInfo} background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <MaterialCommunityIcons name='account' size={30} color='#fff' />
                            <Text style={{ color: '#fff', fontSize: 11 }}>个人资料</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
}