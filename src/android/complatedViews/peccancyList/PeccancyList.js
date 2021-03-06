import React from 'react'
import { Text, TouchableOpacity, FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import { Container, Card, CardItem, Body, Spinner } from "native-base"
import globalStyles, { styleColor } from '../../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import moment from 'moment'

const renderItem = props => {
    const { item } = props
    // console.log('item',item)
    return (
        <TouchableOpacity onPress={() => Actions.peccancyInfo({ initParam: { peccancyId: item.id } })}>
            <Card style={{ backgroundColor: '#fff' }}>
                <CardItem header style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>违章扣款编号：{item.id ? `${item.id}` : ''}</Text>
                    {/* {item.stat_status == 1 && <Text style={[globalStyles.midText, { color: 'red' }]}>未扣</Text>}
                    {item.stat_status == 2 && <Text style={globalStyles.midText}>已扣</Text>} */}
                </CardItem>
                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>货车牌号：{item.truck_num ? `${item.truck_num}` : ''} </Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>扣分：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.fine_score ? `${item.fine_score}` : '0'}</Text></Text>
                        <Text style={globalStyles.smallText}>个人承担罚款：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.under_money ? `${item.under_money}` : '0'}</Text>元</Text>
                    </Body>
                </CardItem>
                <CardItem footer style={{  flexDirection: 'row', justifyContent: 'space-between'  }}>
                    <Text style={globalStyles.smallText}>违章时间：{item.start_date ? `${moment(item.start_date).format('YYYY-MM-DD')}` : ''}</Text>
                    {item.handle_date&&<Text style={globalStyles.smallText}>处理时间：{`${moment(item.handle_date).format('YYYY-MM-DD')}` }</Text>}
                </CardItem>
            </Card>
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
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无违章扣款记录</Text>
        </View>
    )
}

const PeccancyList = props => {
    const { peccancyListReducer: { data: { peccancyList, isComplete }, getPeccancyList }, peccancyListReducer, getPeccancyListMore } = props
    if (getPeccancyList.isResultStatus == 1) {
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
                    data={peccancyList}
                    renderItem={renderItem}
                    onEndReachedThreshold={0.2}
                    ListEmptyComponent={renderEmpty}
                    onEndReached={() => {
                        if (getPeccancyList.isResultStatus == 2 && !isComplete) {
                            getPeccancyListMore()
                        }
                    }}
                    ListFooterComponent={peccancyListReducer.getPeccancyListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        peccancyListReducer: state.peccancyListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPeccancyListMore: () => {
        dispatch(actions.peccancyList.getPeccancyListMore())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(PeccancyList)


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
