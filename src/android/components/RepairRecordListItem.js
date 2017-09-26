import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import moment from 'moment'

export default class RepairRecordListItem extends Component {
    constructor(props) {
        super(props)
        this.renderRepaired = this.renderRepaired.bind(this)
        this.renderRepairing = this.renderRepairing.bind(this)
    }

    renderRepaired(item) {
        return (
            <View style={{ paddingVertical: 5, paddingHorizontal: 5, borderRadius: 2, borderWidth: 0.5, marginHorizontal: 10, marginVertical: 10, borderColor: '#e3e3e3' }}>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#e3e3e3', paddingVertical: 5 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{moment(new Date(item.repair_date)).format('YYYY-MM-DD hh:mm:ss')} 至 {moment(new Date(item.end_date)).format('YYYY-MM-DD hh:mm:ss')}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 12, paddingVertical: 5, fontWeight: 'bold' }}>维修原因：</Text>
                    <Text style={{ fontSize: 12, paddingVertical: 5 }}>{item.repair_reason}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 12, paddingVertical: 5, fontWeight: 'bold' }}>维修描述：</Text>
                    <Text style={{ fontSize: 12, paddingVertical: 5 }}>{item.remark}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ alignSelf: 'flex-end', fontSize: 10 }}>维修人：<Text style={{ color: '#f27d80', fontSize: 12 }}>{item.repair_user}</Text></Text>
                    <Text style={{ alignSelf: 'flex-end', fontSize: 10 }}>金额：<Text style={{ color: '#f27d80', fontSize: 12 }}>{item.repair_money}</Text>元</Text>
                </View>
            </View>
        )
    }

    renderRepairing(item) {
        return (
            <View style={{ paddingVertical: 5, paddingHorizontal: 5, borderRadius: 2, borderWidth: 0.5, marginHorizontal: 10, marginVertical: 10, borderColor: '#e3e3e3' }}>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#e3e3e3', paddingVertical: 5,flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{moment(new Date(item.repair_date)).format('YYYY-MM-DD hh:mm:ss')}</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold',color: '#f27d80' }}>正在维修</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 12, paddingVertical: 5, fontWeight: 'bold' }}>维修原因：</Text>
                    <Text style={{ fontSize: 12, paddingVertical: 5 }}>{item.repair_reason}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View>
                 {this.props.repairItem.repair_status == 1 && this.renderRepaired(this.props.repairItem)}
                {this.props.repairItem.repair_status == 0 && this.renderRepairing(this.props.repairItem)} 
            </View>

        )
    }
}
