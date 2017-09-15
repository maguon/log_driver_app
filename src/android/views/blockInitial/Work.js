import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Work extends Component {
    render() {
        return (
            <View >
                <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#b8c6cd', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 11, color: '#fff' }}>2017-08-01</Text>
                        </View>
                        <View style={{ paddingLeft: 10 }}>
                            <Icon name='md-calendar' style={{ fontSize: 20, color: '#fff' }} />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 11, color: '#fff' }}>至</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 11, color: '#fff' }}>2017-08-01</Text>
                        </View>
                        <View style={{ paddingLeft: 10 }}>
                            <Icon name='md-calendar' style={{ fontSize: 20, color: '#fff' }} />
                        </View>
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <Icon name='ios-search' style={{ fontSize: 20, color: '#fff' }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomColor: 'red', borderBottomWidth: 3, paddingVertical: 10 }}>
                        <Text style={{ color: 'red' }}>12345</Text>
                        <Text style={{ color: 'red' }}>总里程</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                        <Text>12345</Text>
                        <Text>重载里程</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                        <Text>12345</Text>
                        <Text>空载里程</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 10, borderColor: '#ccc', borderWidth: 0.5 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', padding: 10, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='truck' size={20} color='#00cade' />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                            <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>大连 --> 沈阳</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                            <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>235公里</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 11 }}>完成时间：201708-01</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 11 }}>实际送达：14</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 11 }}>异常：1</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
