import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { Container ,Content} from 'native-base'
import globalStyles from '../../GlobalStyles'
import moment from 'moment'


const CleanRelInfo = props => {
    const { cleanRelInfo } = props
    console.log('cleanRelInfo', cleanRelInfo)
    return (
        <Container>
            <Content>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{cleanRelInfo.route_start_name ? `${cleanRelInfo.route_start_name}` : ''} -> {cleanRelInfo.route_end_name ? `${cleanRelInfo.route_end_name}` : ''}</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>始发地</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{cleanRelInfo.addr_name ? `${cleanRelInfo.addr_name}` : ''}</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>经销商</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{cleanRelInfo.short_name ? `${cleanRelInfo.short_name}` : ''}</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>指令标号</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{cleanRelInfo.dp_route_task_id ? `${cleanRelInfo.dp_route_task_id}` : ''}</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>状态</Text>
                {cleanRelInfo.status != 1 && cleanRelInfo.status != 2 && cleanRelInfo.status != 0 && <Text style={[globalStyles.midText, styles.listItemPadding]}>未知</Text>}
                {cleanRelInfo.status == 0 && <Text style={[globalStyles.midText, styles.listItemPadding]}>已取消</Text>}
                {cleanRelInfo.status == 1 && <Text style={[globalStyles.midText, styles.listItemPadding]}>未领取</Text>}
                {cleanRelInfo.status == 2 && <Text style={[globalStyles.midText, styles.listItemPadding]}>已领取</Text>}
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>装车数</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{cleanRelInfo.car_count ? `${cleanRelInfo.car_count}` : '0'}</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>洗车费</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{cleanRelInfo.total_price ? `${cleanRelInfo.total_price}` : '0'}元</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>拖车费</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{cleanRelInfo.total_trailer_fee ? `${cleanRelInfo.total_trailer_fee}` : '0'}元</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>提车费</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{cleanRelInfo.car_parking_fee ? `${cleanRelInfo.car_parking_fee}` : '0'}元</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>地跑费</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{cleanRelInfo.total_run_fee ? `${cleanRelInfo.total_run_fee}` : '0'}元</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>带路费</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{cleanRelInfo.lead_fee ? `${cleanRelInfo.lead_fee}` : '0'}元</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>执行时间</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{cleanRelInfo.load_date ? `${moment(cleanRelInfo.load_date).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
            </Content>
        </Container>
    )
}

export default CleanRelInfo




const styles = StyleSheet.create({
    listItemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    listItemHeaderNo: {
        color: '#766978',
        fontWeight: '300'
    },
    listItemHeaderDate: {
        color: '#a098a1'
    },
    listItemPadding: {
        padding: 7.5
    },
    listItemBorderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfdfdf'
    },
    listItemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fontColor: {
        color: '#bd417c'
    }
})