import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Container ,Toast} from 'native-base'
import { connect } from 'react-redux'
import moment from 'moment'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import * as actions from '../../actions/index'

const renderListItem = props => {
    console.log('props', props)
    const { item: { created_on, car_oil_fee, truck_num, other_fee,day_count, single_price, actual_price, car_day_count, car_single_price, status } } = props
    const _single_price = single_price ? single_price : 0
    const _day_count = day_count ? day_count : 0
    const _car_day_count = car_day_count ? car_day_count : 0
    const _car_single_price = car_single_price ? car_single_price : 0
    return (
        <View style={[styles.listItemPadding, { borderColor: '#ccc', borderWidth: 0.5, margin: 5 }]}>
            <View style={[styles.listitem, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>货车牌号：{truck_num ? `${truck_num}` : ''}</Text>
                {status == 0 && <Text style={globalStyles.midText}>取消</Text>}
                {status == 1 && <Text style={globalStyles.midText}>未发放</Text>}
                {status == 2 && <Text style={globalStyles.midText}>已发放</Text>}

            </View>

            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <View style={[styles.listitem, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>商品车停车费：{(_car_single_price * _car_day_count)}元</Text>
            </View>
            <View style={[styles.listitem, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>商品车加油费：{car_oil_fee ? `${car_oil_fee}` : '0'}元</Text>
            </View>
            </View>

           <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <View style={[styles.listitem, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>货车停车费：{(_single_price * _day_count)}元</Text>
            </View>
            <View style={[styles.listitem, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>其他车费：{other_fee? `${other_fee}` : '0'}元</Text>
            </View>
           </View>

            <View style={[styles.listitem, styles.listItemPadding]}>
                <Text style={globalStyles.midText}>申请时间：{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
        </View>
    )
}

const renderListEmpty = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Text style={globalStyles.midText}>暂无出车款记录</Text>
        </View>
    )
}

const renderListFooter = props => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const RouteTaskFee = props => {
    // console.log('props', props)
    const { routeTaskFeeReducer: { data: { routeTaskFeeList, isCompleted } }, getRouteTaskFeeListMore, routeTaskFeeReducer } = props
    return (
        <Container>
            <FlatList
                keyExtractor={(item, index) => `${index}`}
                contentContainerStyle={{ padding: 5 }}
                data={routeTaskFeeList}
                renderItem={renderListItem}
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    if (routeTaskFeeReducer.getRouteTaskFeeList.isResultStatus == 2 && !isCompleted) {
                        getRouteTaskFeeListMore()
                    } else {
                        if (routeTaskFeeReducer.getRouteTaskFeeList.isResultStatus != 1) {
                            // console.log('已全部加载完毕！')
                            // Toast.show({
                            //     text:"已全部加载完毕!"
                            // })
                        }
                    }
                }}
                ListEmptyComponent={routeTaskFeeReducer.getRouteTaskFeeList.isResultStatus != 1 && routeTaskFeeList.length == 0 && renderListEmpty}
                ListFooterComponent={routeTaskFeeReducer.getRouteTaskFeeListMore.isResultStatus == 1 ? renderListFooter : <View />}
            />
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        routeTaskFeeReducer: state.routeTaskFeeReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getRouteTaskFeeListMore: () => {
        dispatch(actions.routeTaskFeeAction.getRouteTaskFeeListMore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RouteTaskFee)

const styles = StyleSheet.create({
    listItemPadding: {
        padding: 5
    },
    listitem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})
