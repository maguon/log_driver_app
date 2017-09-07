import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import insuranceTypeList from '../../config/insuranceType.json'
//{insuranceTypeList.find((typeItem) => typeItem.id == item.insure_type).insuranceType}
export default class InsuranceListItem extends Component {
    render() {
        return (
            <View style={{ backgroundColor: '#edf1f4',paddingTop:10 }}>
                <View style={{ marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#fff', borderColor: '#e8e8e8', borderWidth: 0.5 }}>
                    <View style={{ flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8', alignItems: 'flex-end' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#00cade' }}>交强险</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 11 }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>编号：</Text>
                                <Text>
                                    123456789012345678
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 11 }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>保险公司：</Text>
                                中国平安
                                </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 11 }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>投保日期：</Text>
                                2017-09-13
                                </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>生效期：</Text>
                                <Text style={{ fontSize: 11 }}>2017-09-13</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>到：</Text>
                                <Text style={{ fontSize: 11 }}>2017-09-13</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 11 }}>¥ <Text style={{ color: 'red' }}>4600.5</Text>元</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}