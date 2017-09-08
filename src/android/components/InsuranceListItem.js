import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import insuranceTypeList from '../../config/insuranceType.json'
import moment from 'moment'

export default class InsuranceListItem extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { data } = this.props
        return (
            <View style={{ backgroundColor: '#edf1f4', paddingTop: 10 }}>
                <View style={{ marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#fff', borderColor: '#e8e8e8', borderWidth: 0.5 }}>
                    <View style={{ flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8', alignItems: 'flex-end' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#00cade' }}>{data.insure_type ? insuranceTypeList.find((item) => item.id == data.insure_type).insuranceType : ''}</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 11 }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>编号：</Text>
                                <Text>
                                    {data.insure_num ? data.insure_num : ''}
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 11 }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>保险公司：</Text>
                                {data.insure_name ? data.insure_name : ''}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 11 }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>投保日期：</Text>
                                {data.insure_date ? moment(data.insure_date).format('YYYY-MM-DD') : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>生效期：</Text>
                                <Text style={{ fontSize: 11 }}>{data.start_date ? moment(data.start_date).format('YYYY-MM-DD') : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>到：</Text>
                                <Text style={{ fontSize: 11 }}>{data.end_date ? moment(data.end_date).format('YYYY-MM-DD') : ''}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 11 }}>¥ <Text style={{ color: 'red' }}>{data.insure_money ? data.insure_money : ''}</Text>元</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}