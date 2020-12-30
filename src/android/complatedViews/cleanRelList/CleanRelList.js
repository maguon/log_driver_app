import React from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { Container } from 'native-base'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../GlobalStyles'
import * as cleanRelListAction from './CleanRelListAction'
import * as actionTypes from '../../../actions/index'
import moment from 'moment'
import SearchCleanRel from '../../components/SearchCleanRel'
import { Actions } from 'react-native-router-flux'

const renderItem = props => {
    const { item: { dp_route_task_id, route_start_name, addr_name, receive_id, route_end_name, short_name, total_price, car_count, load_date, status },
        item, index, getReceive, getReceiveWaiting,actual_price } = props
     console.log('props', props)
    return (
        <TouchableOpacity
            onPress={() => {
                getReceiveWaiting()
                Actions.cleanRel({ cleanRelInfo: item })
                InteractionManager.runAfterInteractions(() => getReceive({ receiveId: receive_id }))
            }}
            key={index} style={styles.itemContainer} >
            <View style={styles.itemHeader}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>指令编号：{dp_route_task_id ? `${dp_route_task_id}` : ''}</Text>
                {status != 1 && status != 2 && status != 0 && <Text style={[globalStyles.midText]}>未知</Text>}
                {status == 0 && <Text style={[globalStyles.midText]}>已取消</Text>}
                {status == 1 && <Text style={[globalStyles.midText, styles.itemWarnColor]}>未领取</Text>}
                {status == 2 && <Text style={[globalStyles.midText]}>已领取</Text>}
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <Text style={[globalStyles.midText, styles.itemBlockText, { fontWeight: 'bold' }]}>
                        {route_start_name ? `${route_start_name}` : ''}
                        {addr_name ? `(${addr_name})` : ''}
                        {route_end_name ? ` --> ${route_end_name}` : ''}
                        {short_name ? `(${short_name})` : ''}
                    </Text>
                </View>
            </View>
            <View style={[styles.item]}>
                <View style={styles.itemBlock}>
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>执行时间：{load_date ? `${moment(load_date).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>洗车数量：{car_count ? `${car_count}` : '0'}</Text>
                </View>
                <View style={styles.itemBlock}>
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>洗车费：<Text style={styles.itemWarnColor}>{actual_price ? `${actual_price}` : '0'}元</Text></Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const ListFooterComponent = () => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无洗车记录</Text>
        </View>
    )
}

const CleanRelList = props => {
    const { cleanRelListReducer: { data: { cleanRelList, isComplete }, getCleanRelList },
        cleanRelListReducer, getCleanRelListMore, getReceive, getReceiveWaiting } = props
    if (getCleanRelList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container style={{ backgroundColor: '#edf1f4' }}>
                <SearchCleanRel />
                <FlatList
                    keyExtractor={(item, index) => index}
                    style={{ padding: 5 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getCleanRelList.isResultStatus == 2 && !isComplete) {
                            getCleanRelListMore()
                        }
                    }}
                    ListFooterComponent={cleanRelListReducer.getCleanRelListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                    data={cleanRelList}
                    renderItem={(item) => renderItem({ ...item, getReceive, getReceiveWaiting })}
                />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        cleanRelListReducer: state.cleanRelListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCleanRelListMore: () => {
        dispatch(cleanRelListAction.getCleanRelListMore())
    },
    getReceive: req => {
        dispatch(actionTypes.receiveForCleanRel.getReceive(req))
    },
    getReceiveWaiting: () => {
        dispatch(actionTypes.receiveForCleanRel.getReceiveWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CleanRelList)

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        padding: 5,
        margin: 5,
        borderWidth: 0.3,
        borderColor: '#ddd'
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 5,
        marginBottom: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 0.3,
        borderColor: '#ddd'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    itemWarnColor: {
        color: '#fe7378'
    },
    itemBlockIcon: {
        color: '#bbb',
        fontSize: 16,
        width: 20,
        textAlign: 'center'
    },
    itemBlockMaterialIcon: {
        width: 20,
        textAlign: 'center'
    },
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    itemBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemBlockText: {
        paddingLeft: 5,
    },
    itemBlockTitle: {

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
