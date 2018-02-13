import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { Container, Spinner } from 'native-base'
import { Icon } from 'native-base'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../GlobalStyles'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import * as accidentResponsibilityListAction from '../../actions/AccidentResponsibilityListAction'

const renderItem = props => {
    const { item: { accident_status, created_on, end_date, under_cost }, item } = props
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => Actions.accidentResponsibilityInfo({ responsibilityInfo: item })}>
            <View style={styles.itemHeader}>
                <Text style={[globalStyles.midText]}>事故责任</Text>
                <Text style={[globalStyles.midText, styles.itemWarnColor]}>
                    {accident_status == 1 && '待处理'}
                    {accident_status == 2 && '处理中'}
                    {accident_status == 3 && '已处理'}
                </Text>
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <Icon name='ios-time-outline' style={styles.itemBlockIcon} style={styles.itemBlockIcon} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>
                        {created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}
                        {end_date ? ` ~ ${moment(end_date).format('YYYY-MM-DD HH:mm:ss')}` : ''}
                    </Text>
                </View>
            </View>
            <View style={[styles.item, { justifyContent: 'flex-end' }]}>
                <View style={styles.itemBlock}>
                    <Text style={[globalStyles.midText, styles.itemBlockText, styles.itemWarnColor]}>{under_cost ? `${under_cost}` : ''} 元</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无申报记录</Text>
        </View>
    )
}

const AccidentResponsibilityList = props => {
    const { accidentResponsibilityListReducer: { data: { accidentResponsibilityList }, getAccidentResponsibilityList },
        accidentResponsibilityListReducer } = props
    if (getAccidentResponsibilityList.isResultStatus == 1) {
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
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmpty}
                    data={accidentResponsibilityList}
                    renderItem={renderItem}
                />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        accidentResponsibilityListReducer: state.accidentResponsibilityListReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AccidentResponsibilityList)

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
        padding: 5
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
    itemBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemBlockText: {
        paddingLeft: 5
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
    },
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    }
})