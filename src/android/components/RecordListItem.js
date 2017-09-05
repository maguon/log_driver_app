import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button } from 'native-base'

export default class DriveInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, marginRight: 4, backgroundColor: '#00cade' }} />
                    <Text style={{ fontSize: 12}}>好大一件事</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                    <Text style={{ marginLeft: 10, fontSize: 12, color: '#bfbfbf' }}>2017-09-10</Text>
                    <Text style={{ fontSize: 12, color: '#bfbfbf' }}>操作员：张三</Text>
                </View>

            </View>
        )
    }
}