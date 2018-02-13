import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { Container } from 'native-base'
import { Icon, Spinner, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../GlobalStyles'
import * as accidentListAction from '../../actions/AccidentListAction'
import * as imagForAccidentAction from '../../actions/ImagForAccidentAction'
import * as cleanRelListAction from '../../actions/CleanRelListAction'
import moment from 'moment'

import { Actions } from 'react-native-router-flux'
import SearchCleanRel from '../components/SearchCleanRel'

const { width } = Dimensions.get('window')

const renderItem = props => {
    const { item: { dp_route_task_id, route_start_name, addr_name, route_end_name, short_name, actual_price, car_count, load_date, status }, index } = props
    return (
        <View key={index} style={styles.itemContainer} >
            <View style={styles.itemHeader}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>指令编号：{dp_route_task_id ? `${dp_route_task_id}` : ''}</Text>
                {status == 0 && <Text style={[globalStyles.midText]}>未通过</Text>}
                {status == 1 && <Text style={[globalStyles.midText, styles.itemWarnColor]}>未审核</Text>}
                {status == 2 && <Text style={[globalStyles.midText]}>已通过</Text>}
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
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>洗车数量：{car_count ? `${car_count}` : ''}</Text>
                </View>
                <View style={styles.itemBlock}>
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>洗车费总额：<Text style={styles.itemWarnColor}>{actual_price ? `${actual_price}` : '0'}元</Text></Text>
                </View>
            </View>
        </View>
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
        cleanRelListReducer, getCleanRelListMore } = props
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
                    renderItem={(item) => renderItem({ ...item })}
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCleanRelListMore: () => {
        dispatch(cleanRelListAction.getCleanRelListMore())
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