import React from 'react'
import {Text, Dimensions, View} from 'react-native'
import {Card} from 'native-base'
import insuranceTypeList from '../../config/insuranceType.json'
import globalStyles from '../utils/GlobalStyles'
import moment from 'moment'

const window = Dimensions.get('window')
const InsuranceListItem = props => {
    const {insuranceItem} = props
    return (
        <Card style={{borderRadius: 10, width: window.width * 0.95}}>
            <View style={{flexDirection: 'column', marginLeft: 15}}>
                <View style={{height: 30, justifyContent: 'center'}}>
                    <Text
                        style={[globalStyles.smallText, {fontWeight: 'bold'}]}>编号：{insuranceItem.insure_num ? insuranceItem.insure_num : ''}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30}}>
                    <Text
                        style={[globalStyles.xlText, globalStyles.styleColor, {fontWeight: 'bold'}]}>{insuranceItem.insure_type ? insuranceTypeList.find((item) => item.id == insuranceItem.insure_type).insuranceType : ''}</Text>
                    <Text
                        style={[globalStyles.smallText, {marginRight: 20}]}>{insuranceItem.insure_name ? insuranceItem.insure_name : ''}</Text>
                </View>
                <View style={{height: 30, justifyContent: 'center'}}>
                    <Text style={[globalStyles.smallText]}>
                        <Text style={{fontWeight: 'bold'}}>投保日期：</Text>
                        {insuranceItem.insure_date ? moment(insuranceItem.insure_date).format('YYYY-MM-DD') : ''}
                    </Text>
                </View>

                <View style={{height: 30, justifyContent: 'center'}}>
                    <Text style={[globalStyles.smallText]}><Text
                        style={{fontWeight: 'bold'}}>生效期：</Text>
                        {insuranceItem.start_date ? moment(insuranceItem.start_date).format('YYYY-MM-DD') : ''} ～ {insuranceItem.end_date ? moment(insuranceItem.end_date).format('YYYY-MM-DD') : ''}
                    </Text>
                </View>
            </View>
        </Card>
    )
}

export default InsuranceListItem
