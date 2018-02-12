import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import { Container } from 'native-base'
import { Icon, Spinner } from 'native-base'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../GlobalStyles'
import * as accidentListAction from '../../actions/AccidentListAction'
import moment from 'moment'

const renderItem = props => {
    const { item: { id, address, accident_explain, accident_status, accident_date, truck_num }, index } = props
    return (
        <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>No.{id ? `${id}` : ''}</Text>
                {accident_status == 1 && <Text style={[globalStyles.midText, styles.itemWarnColor]}>待处理</Text>}
                {accident_status == 2 && <Text style={[globalStyles.midText]}>处理中</Text>}
                {accident_status == 3 && <Text style={[globalStyles.midText]}>已处理</Text>}
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <MaterialCommunityIcons name='truck' size={14} color={'#bbb'} style={styles.itemBlockMaterialIcon} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>{truck_num ? `${truck_num}` : ''}</Text>
                </View>
                <View style={styles.itemBlock}>
                    <Icon name='ios-time-outline' style={styles.itemBlockIcon} style={styles.itemBlockIcon} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}>{accident_date ? `${moment(accident_date).format('YYYY-MM-DD')}` : ''}</Text>
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <Icon name='ios-pin' style={styles.itemBlockIcon} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}><Text>事故地点：</Text>{address ? `${address}` : ''}</Text>
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <MaterialCommunityIcons name='alert-circle' size={14} color={'#fe7378'} style={styles.itemBlockMaterialIcon} />
                    <Text style={[globalStyles.midText, styles.itemBlockText]}><Text>事故描述：</Text>{accident_explain ? `${accident_explain}` : ''}</Text>
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

const AccidentList = props => {
    console.log('props', props)
    const { accidentListReducer: { data: { accidentList,isComplete }, getAccidentList }, 
    accidentListReducer, getAccidentListMore } = props
    if (getAccidentList.isResultStatus == 1) {
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
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getAccidentList.isResultStatus == 2 && !isComplete) {
                            getAccidentListMore()
                        }
                    }}
                    ListFooterComponent={accidentListReducer.getAccidentListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                    data={accidentList}
                    renderItem={renderItem}
                />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        accidentListReducer: state.accidentListReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getAccidentListMore: () => {
        dispatch(accidentListAction.getAccidentListMore())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AccidentList)

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
    }
})