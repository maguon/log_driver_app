import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button } from 'native-base'
import moment from 'moment'

export default class DriveInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { data } = this.props
        return (
            <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, marginRight: 4, backgroundColor: '#00cade' }} />
                    <Text style={{ fontSize: 12 }}>{data.content ? data.content : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                    <Text style={{ marginLeft: 10, fontSize: 12, color: '#bfbfbf' }}>{data.timez ? moment(data.timez).format('YYYY-MM-DD') : ''}</Text>
                    <Text style={{ fontSize: 12, color: '#bfbfbf' }}>操作员：{data.name ? data.name : ''}</Text>
                </View>
            </View>
        )
    }
}