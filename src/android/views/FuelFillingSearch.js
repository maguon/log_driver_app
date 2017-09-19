import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView
} from 'react-native'
import DateTimePicker from '../components/form/DateTimePicker'
import CheckBox from '../components/form/CheckBox'

export default class FuelFillingSearch extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>
                        <DateTimePicker
                            value={'请选择'}
                            title='起始时间：'
                            defaultValue={'请选择'}
                            onRequire={(flag) => { }}
                            onValueChange={(param) => { }}
                        />
                        <DateTimePicker
                            value={'请选择'}
                            title='终止时间：'
                            defaultValue={'请选择'}
                            onRequire={(flag) => { }}
                            onValueChange={(param) => { }}
                        />
                        <CheckBox
                            title='加油地:'
                            listTitle='加油地'
                            value={''}
                            itemList={[{ id: 1, value: '男' }, { id: 0, value: '女' }]}
                            onCheck={(param) => { }} />
                        <CheckBox
                            listTitle='审核结果'
                            value={''}
                            itemList={[{ id: 1, value: '男' }, { id: 0, value: '女' }]}
                            onCheck={(param) => { }} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
