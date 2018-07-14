import React from 'react'
import { Text } from 'react-native'
import { Card, CardItem, Body } from 'native-base'
import moment from 'moment'
import globalStyles from '../GlobalStyles'

const RepairRecordListItem = props => {
    const { repairItem } = props
    if (repairItem.repair_status == 1) {
        return <Repaired item={repairItem} />
    } else {
        return <Repairing item={repairItem} />
    }
}

const Repaired = props => {
    const { item } = props
    return (
        <Card>
            <CardItem header bordered>
                <Text style={[globalStyles.midText]}>{moment(new Date(item.repair_date)).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(new Date(item.end_date)).format('YYYY-MM-DD HH:mm:ss')}</Text>
            </CardItem>
            <CardItem bordered>
                <Body>
                    <Text style={[globalStyles.midText]}>维修原因</Text>
                    <Text style={[globalStyles.midText]}>{item.repair_reason}</Text>
                </Body>
            </CardItem>
            <CardItem bordered>
                <Body>
                    <Text style={[globalStyles.midText]}>维修描述</Text>
                    <Text style={[globalStyles.midText]}>{item.remark}</Text>
                </Body>
            </CardItem>
            <CardItem footer bordered style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[globalStyles.smallText]}>维修人：<Text style={{ color: '#f27d80' }}>{item.repair_user}</Text></Text>
                <Text style={[globalStyles.smallText]}>金额：<Text style={{ color: '#f27d80' }}>{item.repair_money}</Text>元</Text>
            </CardItem>
        </Card>
    )
}

const Repairing = props => {
    const { item } = props
    return (
        <Card>
            <CardItem header bordered style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[globalStyles.midText]}>{moment(new Date(item.repair_date)).format('YYYY-MM-DD HH:mm:ss')}</Text>
                <Text style={[globalStyles.midText, { color: '#f27d80' }]}>正在维修</Text>
            </CardItem>
            <CardItem bordered>
                <Body>
                    <Text style={[globalStyles.midText]}>维修原因</Text>
                    <Text style={[globalStyles.midText]}>{item.repair_reason}</Text>
                </Body>
            </CardItem>
        </Card>
    )
}

export default RepairRecordListItem