import React from 'react'
import { Text, TouchableOpacity, FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import { Container, Card, CardItem, Body, Spinner } from "native-base"
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import moment from 'moment'
import FontAwesome from "react-native-vector-icons/FontAwesome";

const renderItem = props => {
    const { item } = props
    // console.log('item',item)
    return (
        <TouchableOpacity onPress={() => Actions.peccancyInfo({ initParam: { peccancyId: item.id } })}>
            <Card style={{ backgroundColor: '#fff' }}>
                <CardItem header style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>违章扣款编号：{item.id ? `${item.id}` : ''}</Text>
                </CardItem>
                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' , height:30}}>
                        <Text style={[globalStyles.smallText,{fontWeight:"bold" }]}>货车牌号：{item.truck_num ? `${item.truck_num}` : ''} </Text>
                        <Text style={globalStyles.smallText}>扣分：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.fine_score ? `${item.fine_score}` : '0'}</Text></Text>
                    </Body>
                    <Body footer style={{  flexDirection: 'row', justifyContent: 'space-between' , height:30 }}>
                        <Text style={globalStyles.smallText}>违章时间：{item.start_date ? `${moment(item.start_date).format('YYYY-MM-DD')}` : ''}</Text>
                        {item.handle_date&&<Text style={globalStyles.smallText}>处理时间：{`${moment(item.handle_date).format('YYYY-MM-DD')}` }</Text>}
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' , height:30}}>
                        <Text style={globalStyles.smallText}>个人承担罚款：</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <FontAwesome name="rmb" size={15} color={'#838485'}/>
                            <Text style={{ color: 'red', fontSize:20 , marginLeft:5}}>{item.under_money ? `${item.under_money}` : '0'}</Text>
                        </View>

                    </Body>
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
                    keyExtractor={(item, index) => `${index}`}
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
        dispatch(actions.peccancyListAction.getPeccancyListMore())
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
