import React from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { Container, Spinner } from 'native-base'
import { connect } from 'react-redux'
import * as reduxActions from '../../../../actions/index'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import moment from 'moment'

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
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无现金过路费记录</Text>
        </View>
    )
}

const renderItem = props => {
    const { item: { etc_date, etc_fee } } = props
    return (
        <View style={styles.itemContainer}>
            <View style={[styles.item]}>
                <View style={styles.itemBlock}>
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>打款时间：{etc_date ? `${moment(etc_date).format('YYYY-MM-DD')}` : ''}</Text>
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>过路费金额：{etc_fee ? `${etc_fee}` : '0'}元</Text>
                </View>
            </View>
        </View>
    )
}


const CashToll = props => {
    const { getCashTollListMore, cashTollReducer, cashTollReducer: { data: { cashTollList, isComplete }, getCashTollList } } = props
    if (getCashTollList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container>
                <FlatList
                    keyExtractor={(item, index) => index}
                    style={{ padding: 5 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getCashTollList.isResultStatus == 2 && !isComplete) {
                            getCashTollListMore()
                        }
                    }}
                    ListFooterComponent={cashTollReducer.getCashTollListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                    data={cashTollList}
                    renderItem={renderItem}
                />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        cashTollReducer: state.cashTollReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCashTollListMore: () => {
        dispatch(reduxActions.cashToll.getCashTollListMore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CashToll)



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