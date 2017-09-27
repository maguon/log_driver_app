import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Icon, Button } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

export default class BranchInstruct extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.initParam)
    }
    render() {
        return (
            <View>
                <View style={{ height: 200, backgroundColor: '#8b959b' }}>
                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', margin: 10, padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#00cade' }}>大连港口</Text>
                            <Text style={{ paddingHorizontal: 5 }}>--></Text>
                            <Text style={{ color: '#00cade' }}>沈阳</Text>
                            <Text style={{ paddingLeft: 20, color: '#00cade' }}>经销商一</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name='my-location' style={{ fontSize: 15, color: '#d69aa5' }} />
                            <Text style={{ paddingLeft: 10 }}>当前位置</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: '#eff3f5',
                    justifyContent: 'space-between',
                    borderColor: '#ccc',
                    borderBottomWidth: 0.5,
                    borderTopWidth: 0.5
                }}>
                    <View>
                        <Text style={{ color: '#8b959b' }}>计划运送：5</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#8b959b' }}>计划运送：<Text style={{ color: '#00cade' }}>5</Text></Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <View style={{ flexDirection: 'row', flex: 7 }}>
                        <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                        <Text style={{ color: '#ccc', fontSize: 11, paddingLeft: 10 }}>VIN码：<Text style={{ color: '#8b959b' }}>12345678901234567</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 2 }}>
                        <Text style={{ color: '#8b959b', fontSize: 11 }}>一汽大众</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end' }}>
                        <Text style={{ color: '#00cade', fontSize: 11 }}>送达</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <View style={{ flexDirection: 'row', flex: 7 }}>
                        <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                        <Text style={{ color: '#ccc', fontSize: 11, paddingLeft: 10 }}>VIN码：<Text style={{ color: '#d69aa5' }}>12345678901234567</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 2 }}>
                        <Text style={{ color: '#8b959b', fontSize: 11 }}>一汽大众</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end' }}>
                        <Text style={{ color: '#d69aa5', fontSize: 11 }}>异常</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 7 }}>
                        <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                        <Text style={{ color: '#ccc', fontSize: 11, paddingLeft: 10 }}>VIN码：<Text style={{ color: '#8b959b' }}>12345678901234567</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 2 }}>
                        <Text style={{ color: '#8b959b', fontSize: 11 }}>一汽大众</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end' }}>
                        <View>
                            <Icon name='ios-checkmark-circle' style={{ fontSize: 25, color: '#00cade' }} />
                        </View>
                        <View style={{ paddingLeft: 5 }}>
                            <Icon name='md-alert' style={{ fontSize: 25, color: '#d69aa5' }} />
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', paddingTop: 10, paddingRight: 10 }}>
                    <Button small rounded onPress={() => { }} style={{ backgroundColor: '#00cade' }}>
                        <Text style={{ color: '#fff' }}>完成</Text>
                    </Button>
                </View>
            </View>
        )
    }
}