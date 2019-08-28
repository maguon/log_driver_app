import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import globalStyles from '../utils/GlobalStyles'
import moment from 'moment'

const AccidentResponsibilityInfo = props => {
    console.log('props' + JSON.stringify(props))
    const {responsibilityInfo: {created_on, accident_status, truck_accident_id, truck_accident_type, op_user_name, remark,under_cost, end_date}} = props
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={styles.itemContainer}>
                <View style={styles.itemBlock}>
                    <Text
                        style={[globalStyles.midText, {color: '#76b92c'}]}>事故编号:{truck_accident_id ? `${truck_accident_id}` : ''}</Text>
                </View>
                <View style={styles.itemBlock}>
                    <Text
                        style={globalStyles.midText}>申报时间：{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                    <Text style={[globalStyles.midText, {color: '#76b92c'}]}>
                        {accident_status == 1 && '待处理'}
                        {accident_status == 2 && '处理中'}
                        {accident_status == 3 && '已处理'}
                    </Text>
                </View>
            </View>
            <View style={styles.itemColorBlock}>
                <Text style={[styles.itemBlockTitle,{color:'#838485'}]}>事故描述：</Text>
                <Text style={[globalStyles.midText,{marginTop: 10 ,alignItems:'center'}]}>{remark ? `${remark}` : ''}</Text>
            </View>
            <View style={[styles.itemColorBlock,{padding: 10}]}>
                <View style={styles.itemBlock}>
                    <Text style={globalStyles.midText}><Text style={styles.itemBlockTitle}>事故类型：</Text>
                        {truck_accident_type == 1 && '普通'}
                        {truck_accident_type == 2 && '严重'}
                    </Text>
                </View>

                <View style={styles.itemBlock}>
                <Text style={globalStyles.midText}><Text
                    style={styles.itemBlockTitle}>操作人：</Text>{op_user_name ? `${op_user_name}` : ''}</Text>
                </View>

                <View style={styles.itemBlock}>
                    <Text style={globalStyles.midText}><Text
                        style={styles.itemBlockTitle}>完结时间：</Text>{end_date ? `${moment(end_date).format('YYYY-MM-DD HH:mm:ss')}` : ''}
                    </Text>
                </View>
            </View>
            <View style={styles.itemColorBlock}>
            <View style={styles.itemBlock}>
                <Text style={[globalStyles.midText,styles.itemBlockTitle]}>承担金额：</Text>
                <Text style={styles.warnColor}><Text style={globalStyles.midText}>¥</Text> {under_cost ? `${under_cost}` : ''}元</Text>
            </View>
            </View>
        </View>
    )
}

export default AccidentResponsibilityInfo


const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        backgroundColor: '#f4f8fa'
    },
    itemBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    itemColorBlock: {
        padding: 15,
        flexDirection:'column',
        borderBottomWidth: 0.3,
        borderTopWidth: 0.3,
        borderColor: '#ddd'
    },
    itemBlockTitle: {
        fontWeight: 'bold',
    },
    warnColor: {
        color: '#fe7378'
    }
})


