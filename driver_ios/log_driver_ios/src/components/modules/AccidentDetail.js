import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import {Icon} from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import globalStyles, {styleColor} from '../utils/GlobalStyles'
import moment from 'moment'

const AccidentDetail = props => {

    const {accidentInfo: {id, created_on, dp_route_task_id, city_route_end, city_route_start, truck_type, truck_num, address, updated_on, accident_explain}} = props
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerItem}>
                    <Text
                        style={[globalStyles.midText, globalStyles.styleColor, {marginLeft: 10}]}>事故编号:{id ? `${id}` : ''}</Text>
                </View>
                <View style={styles.headerStatusItem}>
                    <Text
                        style={[globalStyles.smallText, {marginLeft: 10}]}>申报时间：{updated_on ? `${moment(updated_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                    <Text style={[globalStyles.midText,  {marginRight: 10,color:'#76b92c'}]}>已处理</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText]}>调度编号：{dp_route_task_id ? `${dp_route_task_id}` : ''}
                    </Text>
                </View>

                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText]}><Text
                        style={styles.bodyItemTitle}>{city_route_start ? `${city_route_start}` : ''}{city_route_end ? `-->${city_route_end}` : ''}</Text>
                    </Text>
                </View>

                <View style={styles.bodyItem}>
                        <MaterialCommunityIcons name='truck' size={20} color={'#bbb'} style={{marginRight:10}}/>
                        <Text  style={[globalStyles.midText,{marginLeft:5}]}>
                          {truck_num ? `${truck_num}` : ''}{truck_type == 1 ? '(车头)' : '(挂车)'}
                    </Text>
                </View>
                <View style={styles.bodyItem}>
                        <Icon name='ios-pin'  style={[styles.itemBlockIcon]}/>
                        <Text style={[globalStyles.midText,{marginLeft:5}]}> {address ? `${address}` : ''}</Text>
                </View>
                <View style={styles.bodyItem}>
                        <EvilIcons name='clock' style={styles.itemBlockIcon} />
                        <Text style={[globalStyles.midText,{marginLeft:5}]}> {created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
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
        backgroundColor: '#fff'
    },
    header: {
        borderColor: '#777',
        height: 60,
        backgroundColor: '#f2f5f7',
        justifyContent: 'center'
    },
    headerItem: {
        flexDirection: 'row',
        alignItems: 'flex-end'

    },
    itemBlockIcon: {
        color: '#bbb',
        marginRight:10,
        fontSize: 20,

    },
    headerStatusItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    body: {
        paddingVertical: 15
    },
    bodyItem: {
        flexDirection:'row',
        paddingVertical: 5,
        marginLeft:15,
        height: 35,
    },
    bodyItemTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#4d4d4d'
    }
})
