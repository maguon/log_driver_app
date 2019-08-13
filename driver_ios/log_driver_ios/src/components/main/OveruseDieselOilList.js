import React from 'react'
import { Text, FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import { Container, Card, CardItem, Body, Spinner } from "native-base"
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import moment from 'moment'

const renderItem = props => {
    const { item} = props
    return (
        <View >
            <Card style={{ backgroundColor: '#fff' }}>
                <CardItem header style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>超油结算编号：{item.id ? `${item.id}` : ''}</Text>
                </CardItem>
                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>计划用油量：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.plan_oil ? `${item.plan_oil}` : '0'}</Text>  L</Text>
                        <Text style={globalStyles.smallText}>计划尿素量：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.plan_urea ? `${item.plan_urea}` : '0'}</Text></Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>实际用油量：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.actual_oil ? `${item.actual_oil}` : '0'}</Text>  L</Text>
                        <Text style={globalStyles.smallText}>实际尿素：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.actual_urea ? `${item.actual_urea}` : '0'}</Text></Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>超量油：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.exceed_oil ? `${item.exceed_oil}` : '0'}</Text>  L</Text>
                        <Text style={globalStyles.smallText}>超量尿素：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.exceed_urea ? `${item.exceed_urea}` : '0'}</Text></Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between',alignSelf:'flex-end' }}>
                        <Text style={globalStyles.smallText}>核油日期：{item.oil_date ? `${moment(item.oil_date).format('YYYY-MM-DD')}` : ''}</Text>
                    </Body>
                </CardItem>
            </Card>
        </View>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无超油扣款记录</Text>
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

const OveruseDieselOilList = props => {
    const { overuseDieselOilListReducer: { data: { overuseDieselOilList, isComplete }, getOveruseDieselOilList },
        getDpRouteTaskWaiting, getDpRouteTask, overuseDieselOilListReducer, getOveruseDieselOilListMore } = props
    if (getOveruseDieselOilList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container style={{ backgroundColor: '#f5f5f5' }}>
                <FlatList
                    contentContainerStyle={{ padding: 7.5 }}
                    keyExtractor={(item, index) => index}
                    data={overuseDieselOilList}
                    renderItem={({ item }) => renderItem({ item, getDpRouteTaskWaiting, getDpRouteTask })}
                    onEndReachedThreshold={0.2}
                    ListEmptyComponent={renderEmpty}
                    onEndReached={() => {
                        if (getOveruseDieselOilList.isResultStatus == 2 && !isComplete) {
                            getOveruseDieselOilListMore()
                        }
                    }}
                    ListFooterComponent={overuseDieselOilListReducer.getOveruseDieselOilListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        overuseDieselOilListReducer: state.overuseDieselOilListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getOveruseDieselOilListMore: () => {
        dispatch(actions.overuseDieselOilListAction.getOveruseDieselOilListMore())
    },
    getDpRouteTaskWaiting: () => {
        dispatch(actions.overuseDieselOilInfoAction.getDpRouteTaskWaiting())
    },
    getDpRouteTask: (param) => {
        dispatch(actions.overuseDieselOilInfoAction.getDpRouteTask(param))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(OveruseDieselOilList)

const styles = StyleSheet.create({
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
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

