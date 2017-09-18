import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Icon, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class FuelFillingRecord extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#edf1f4' }}>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <View>
                        <Button small rounded onPress={() => { }} style={{ backgroundColor: '#00cade' }}>
                            <MaterialCommunityIcons name='gas-station' size={20} color='#fff' />
                            <Text style={{ color: '#fff', paddingLeft: 5 }}>加油申报</Text>
                        </Button>
                    </View>
                    <View>
                        <Button small rounded onPress={() => { }} style={{ backgroundColor: '#fa7377' }}>
                            <Icon name='ios-search' style={{ fontSize: 20 }} />
                            <Text style={{ color: '#fff', paddingLeft: 5 }}>搜索</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ backgroundColor: '#f1f8f9', borderWidth: 0.5, borderColor: '#fff', marginHorizontal: 10, padding: 10 }}>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', paddingBottom: 10 }}>
                        <View>
                            <Text style={{ color: '#00cade', fontSize: 13 }}>2017-08-01</Text>
                        </View>
                        <View style={{ paddingHorizontal: 20, color: '#a1a4a5' }}>
                            <Text style={{ fontSize: 13 }}>至</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#00cade', fontSize: 13 }}>2017-08-30</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 11, borderColor: '#ccc' }}>加油总量：<Text style={{ fontSize: 13, color: '#fa7377' }}>2569</Text>ml</Text>
                            <Text style={{ fontSize: 11, borderColor: '#ccc' }}>加油总额：¥<Text style={{ fontSize: 13, color: '#fa7377' }}>2569</Text>元</Text>
                        </View>
                    </View>
                </View>
                <View>

                </View>
            </View>
        )
    }
}
