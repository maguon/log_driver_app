import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import globalStyles from '../utils/GlobalStyles'
import moment from 'moment'

const AccidentResponsibilityInfo = props => {
    const { responsibilityInfo: { created_on, accident_status, truck_accident_id, truck_accident_type, op_user_name, under_cost, end_date } } = props
    return (
        <View>
            <View style={styles.itemContainer}>
                <View style={styles.itemBlock}>
                    <Text style={[globalStyles.midText, styles.itemBlockTitle]}>事故责任</Text>
                </View>
                <View style={styles.itemBlock}>
                    <Text style={globalStyles.midText}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                    <Text style={[globalStyles.midText, styles.warnColor]}>
                        {accident_status == 1 && '待处理'}
                        {accident_status == 2 && '处理中'}
                        {accident_status == 3 && '已处理'}
                    </Text>
                </View>
            </View>
            <View style={styles.itemColorBlock}>
                <Text style={globalStyles.midText}><Text style={styles.itemBlockTitle}>事故编号：</Text>{truck_accident_id ? `${truck_accident_id}` : ''}</Text>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.itemBlock}>
                    <Text style={globalStyles.midText}><Text style={styles.itemBlockTitle}>事故类型：</Text>
                        {truck_accident_type == 1 && '普通'}
                        {truck_accident_type == 2 && '严重'}
                    </Text>
                    <Text style={globalStyles.midText}><Text style={styles.itemBlockTitle}>处理人：</Text>{op_user_name ? `${op_user_name}` : ''}</Text>
                </View>
                <View style={styles.itemBlock}>
                    <Text style={globalStyles.midText}><Text style={styles.itemBlockTitle}>责任人承担：</Text><Text style={styles.warnColor}>{under_cost ? `${under_cost}` : ''}元</Text></Text>
                </View>
                <View style={styles.itemBlock}>
                    <Text style={globalStyles.midText}><Text style={styles.itemBlockTitle}>完结时间：</Text>{end_date ? `${moment(end_date).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                </View>
            </View>
        </View>
    )
}

export default AccidentResponsibilityInfo


const styles = StyleSheet.create({
    itemContainer: {
        padding: 10
    },
    itemBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    itemColorBlock: {
        backgroundColor: '#f4f8fa',
        padding: 15,
        borderBottomWidth: 0.3,
        borderTopWidth: 0.3,
        borderColor: '#ddd'
    },
    itemBlockTitle: {
        fontWeight: 'bold'
    },
    warnColor: {
        color: '#fe7378'
    }
})
