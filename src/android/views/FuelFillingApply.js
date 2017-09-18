import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'

import { Button } from 'native-base'
import DateTimePicker from '../components/form/DateTimePicker'
import TextBox from '../components/form/TextBox'
import Select from '../components/form/Select'

export default class FuelFillingApply extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd', padding: 10 }}>
                            <Text style={{ fontSize: 12 }}><Text style={{ fontWeight: 'bold' }}>申报时间：</Text>2017-08-30 11：30</Text>
                        </View>
                        <DateTimePicker
                            isRequire={true}
                            value={'请选择'}
                            title='加油时间：'
                            defaultValue={'请选择'}
                            onRequire={(flag) => { }}
                            onValueChange={(param) => { }}
                        />
                        <TextBox
                            isRequire={true}
                            title='加油量：'
                            value={''}
                            onValueChange={(param) => { }}
                            onRequire={(flag) => { }}
                            placeholder='请输入加油量'
                        />
                        <Select
                            title='指令编号：'
                            isRequire={false}
                            value={'请选择'}
                            onValueChange={(param) => { }}
                            onRequire={(flag) => { }}
                            defaultValue={'请选择'}
                        />
                        <Select
                            title='加油地：'
                            isRequire={true}
                            value={'请选择'}
                            onValueChange={(param) => { }}
                            onRequire={(flag) => { }}
                            defaultValue={'请选择'}
                        />
                        <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd', padding: 10 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>定位</Text>
                        </View>
                        <TextBox
                            isRequire={true}
                            title='加油金额：'
                            value={''}
                            onValueChange={(param) => { }}
                            onRequire={(flag) => { }}
                            placeholder='请输入加油金额'
                        />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Button onPress={() => { }} full style={{ backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>确定</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
