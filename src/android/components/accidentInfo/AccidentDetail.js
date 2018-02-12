import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import globalStyles from '../../GlobalStyles'
import moment from 'moment'

const AccidentDetail = props => {
    console.log('props', props)
    const { accidentInfo: { id, created_on, dp_route_task_id, city_route_end, city_route_start, truck_type, truck_num, address, updated_on, accident_explain } } = props
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerItem}>
                    <Text style={[globalStyles.largeText, globalStyles.styleColor]}>No.:{id ? `${id}` : ''}</Text>
                    <Text style={globalStyles.smallText}>{updated_on ? `${moment(updated_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                </View>
                <View style={styles.headerStatusItem}>
                    <Text style={[globalStyles.midText]}>已处理</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>调度任务：</Text>{city_route_start ? `${city_route_start}` : ''}{city_route_end ? `-->${city_route_end}` : ''}{dp_route_task_id ? `(${dp_route_task_id})` : ''}</Text>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>车辆类型：</Text>{truck_num ? `${truck_num}` : ''}{truck_type == 1 ? '(车头)' : '(挂车)'}</Text>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>事故地点：</Text>{address ? `${address}` : ''}</Text>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>发生时间：</Text>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText]}><Text style={styles.bodyItemTitle}>事故描述</Text></Text>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={globalStyles.midText}>{accident_explain ? `${accident_explain}` : ''}</Text>
                </View>
            </View>
        </View>
    )
}

export default AccidentDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    header: {
        paddingVertical: 5,
        borderBottomWidth: 0.3,
        borderColor: '#777'
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'flex-end'
    },
    headerStatusItem: {
        alignItems: 'flex-end',
        paddingVertical: 5
    },
    body: {
        paddingVertical: 15
    },
    bodyItem: {
        paddingVertical: 5
    },
    bodyItemTitle: {
        fontWeight: 'bold'
    }
})
