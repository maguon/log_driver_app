import React from 'react'
import { Text } from 'react-native'
import { Card, CardItem, Body } from 'native-base'
import insuranceTypeList from '../../config/insuranceType.json'
import globalStyles from '../GlobalStyles'
import moment from 'moment'

const InsuranceListItem = props => {
    const { insuranceItem } = props
    return (
        <Card>
            <CardItem header bordered style={{ justifyContent: 'space-between' }}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>{insuranceItem.insure_type ? insuranceTypeList.find((item) => item.id == insuranceItem.insure_type).insuranceType : ''}</Text>
                <Text style={globalStyles.smallText}>
                    <Text style={{ fontWeight: 'bold' }}>编号：</Text>
                    <Text>{insuranceItem.insure_num ? insuranceItem.insure_num : ''} </Text>
                </Text>
            </CardItem>
            <CardItem bordered>
                <Body>
                    <Text style={globalStyles.smallText}>
                        <Text style={{ fontWeight: 'bold' }}>保险公司：</Text>
                        {insuranceItem.insure_name ? insuranceItem.insure_name : ''}
                    </Text>
                    <Text style={globalStyles.smallText}>
                        <Text style={{ fontWeight: 'bold' }}>投保日期：</Text>
                        {insuranceItem.insure_date ? moment(insuranceItem.insure_date).format('YYYY-MM-DD') : ''}
                    </Text>
                    <Text style={globalStyles.smallText}><Text style={{ fontWeight: 'bold' }}>生效期：</Text>{insuranceItem.start_date ? moment(insuranceItem.start_date).format('YYYY-MM-DD') : ''} ～ {insuranceItem.end_date ? moment(insuranceItem.end_date).format('YYYY-MM-DD') : ''}</Text>
                </Body>
            </CardItem>
            <CardItem footer bordered style={{ justifyContent: 'flex-end' }}>
                <Text style={globalStyles.smallText}>保费： ¥ <Text style={{ color: 'red' }}>{insuranceItem.insure_money ? insuranceItem.insure_money : ''}</Text>元</Text>
            </CardItem>
        </Card>
    )
}

export default InsuranceListItem