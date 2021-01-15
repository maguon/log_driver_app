import React from 'react'
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
import { Container, Icon, Spinner } from 'native-base'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../../GlobalStyles'
import * as SysNotificationAction from './SysNotificationAction'
import moment from 'moment'
 import { Actions } from 'react-native-router-flux'
import * as NotificationAction from "../notification/NotificationAction";

const { width } = Dimensions.get('window')

const renderItem = props => {

    const { item: { id, readStatus, title, real_name, created_on,  }, index
        , getNotificationListWaiting, getNotification } = props
    return (
        <TouchableOpacity  style={styles.itemContainer}
                          onPress={() => {
                              getNotificationListWaiting()
                              Actions.notification({ id: id })
                              InteractionManager.runAfterInteractions(() => getNotification({ id: id }))}}>
            <View style={[styles.item]}>
                <View style={[styles.itemBlock,{ width:width*0.8}]}>
                    <Text  style={[globalStyles.midText, globalStyles.styleColor]}>{title ? `${title}` : ''}</Text>
                </View>
                {readStatus == 1 && <Text style={[globalStyles.smallText, styles.itemWarnColor]}>未读</Text>}
                {readStatus == 0 && <Text style={[globalStyles.smallText]}></Text>}
            </View>

            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <MaterialCommunityIcons name='account' size={15} color={'#bbb'} style={styles.itemBlockMaterialIcon} />
                    <Text style={[globalStyles.smallText, styles.itemBlockText]}>{real_name ? `${real_name}` : ''}</Text>
                </View>
                <View style={styles.itemBlock}>
                    <Icon name='ios-time-outline' style={styles.itemBlockIcon} style={styles.itemBlockIcon} />
                    <Text style={[globalStyles.smallText, styles.itemBlockText]}>
                        {created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}
                    </Text>
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
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无系统消息</Text>
        </View>
    )
}

const SysNotification = props => {
    const { navigationState:{name},sysNotificationReducer: { data: { sysNotificationListAll, isComplete }, getSysNotificationList },
        sysNotificationReducer,getSysNotificationListMore, getNotification, getNotificationListWaiting } = props

    if (getSysNotificationList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container style={{ padding: 5, backgroundColor: '#edf1f4' }}>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={sysNotificationListAll}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getSysNotificationList.isResultStatus == 2 && !isComplete) {
                            getSysNotificationListMore()
                        }
                    }}
                    ListFooterComponent={sysNotificationReducer.getSysNotificationListMore.isResultStatus == 1 ? ListFooterComponent : <View />}

                    renderItem={(item) => renderItem({ ...item ,getNotificationListWaiting,getNotification})}
                />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        sysNotificationReducer: state.sysNotificationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getSysNotificationListMore: () => {
        dispatch(SysNotificationAction.getSysNotificationListMore())
    },
    getNotification: (param) => {
        dispatch(NotificationAction.getNotification(param))
    },
    getNotificationListWaiting: () => {
        dispatch(NotificationAction.getNotificationListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SysNotification)

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
