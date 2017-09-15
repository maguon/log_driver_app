import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Instruct extends Component {
    render() {
        return (
            <View>
                <View style={{ backgroundColor: '#eff3f5', padding: 10 }}>
                    <View>
                        <Text>
                            指令编号：1234567890
                    </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', padding: 10, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name='truck' size={20} color='#00cade' />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                                <Text style={{ fontSize: 15, color: '#8b959b' }}>大连 --> 沈阳</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                <Text style={{ fontSize: 15, color: '#8b959b' }}>235公里</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <Text>
                            指定执行时间：2017-09-08
                    </Text>
                        <Text>
                            指定调度：张三丰
                    </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>
                            计划运送：14
                    </Text>
                        <Text>
                            实际运送：16
                    </Text>
                        <Text>
                            异常：1
                    </Text>
                        <Text>
                            完成
                    </Text>
                    </View>
                </View>
            </View>
        )
    }
}
