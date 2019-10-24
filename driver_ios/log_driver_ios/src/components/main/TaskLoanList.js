import React, {Component} from 'react'
import {FlatList, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator} from 'react-native'
import {Container, Spinner} from 'native-base'
import globalStyles, {styleColor} from '../utils/GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Actions} from 'react-native-router-flux'
import {reset} from 'redux-form'
import {connect} from 'react-redux'
import moment from 'moment'
import * as actions from '../../actions/index'

const renderItem = props => {
    const {item: {id, truck_num, grant_date, task_loan_status, refund_date, repayment_money, grant_actual_money, refund_actual_money}, item} = props
    // console.log('props', props)
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => {
            Actions.taskLoan({initParam: {taskLoan: item}})
        }}>
            <View style={styles.itemHeader}>
                <Text style={globalStyles.smallText}>编号：{id ? `${id}` : ''}</Text>
                {task_loan_status == 1 && <Text style={[globalStyles.smallText]}>已发放</Text>}
                {task_loan_status == 2 && <Text style={[globalStyles.smallText, globalStyles.styleColor]}>已报销</Text>}
            </View>
            <View style={styles.item}>
                <View style={styles.itemBlock}>
                    <MaterialCommunityIcons name='truck'
                                            style={[globalStyles.styleColor, styles.itemBlockMaterialIcon]}/>
                    <Text style={globalStyles.midText}>{truck_num ? `${truck_num}` : ''}</Text>
                </View>
                {task_loan_status == 1 && <Text
                    style={globalStyles.midText}>领取时间：{grant_date ? `${moment(grant_date).format('YYYY-MM-DD HH:mm')}` : '0'}</Text>}
                {task_loan_status == 2 && <Text
                    style={globalStyles.midText}>报销时间：{refund_date ? `${moment(refund_date).format('YYYY-MM-DD HH:mm')}` : '0'}</Text>}
            </View>
            <View style={styles.item}>
                {task_loan_status == 2 && <Text style={globalStyles.midText}>报销金额(元)：<Text
                    style={{color: 'red'}}>{refund_actual_money ? `${refund_actual_money}` : '0'}</Text></Text>}
                {task_loan_status == 2 && <Text style={globalStyles.midText}>还款金额(元)：<Text
                    style={{color: 'red'}}>{repayment_money ? `${repayment_money}` : '0'}</Text></Text>}
                {task_loan_status == 1 && <Text/>}
                {task_loan_status == 1 && <Text style={globalStyles.midText}>领取金额(元)：<Text
                    style={{color: 'red'}}>{grant_actual_money ? `${grant_actual_money}` : '0'}</Text></Text>}
            </View>
        </TouchableOpacity>
    )
}

const ListFooterComponent = () => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small'/>
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无出车款记录</Text>
        </View>
    )
}

class TaskLoanList extends Component {
    constructor(props) {
        super(props)
    }


    componentWillUnmount() {
        this.props.resetSearchTaskLoanFrom()
    }

    render() {
        const {taskLoanListReducer: {data: {taskLoanList, isComplete}, getTaskLoanList}, taskLoanListReducer, getTaskLoanListMore} = this.props
        if (getTaskLoanList.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor}/>
                </Container>
            )
        } else {
            return (
                <FlatList
                    keyExtractor={(item, index) => `${index}`}
                    style={{padding: 5, backgroundColor: '#edf1f4'}}
                    data={taskLoanList}
                    ListEmptyComponent={renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getTaskLoanList.isResultStatus == 2 && !isComplete) {
                            getTaskLoanListMore()
                        }
                    }}
                    ListFooterComponent={taskLoanListReducer.getTaskLoanListMore.isResultStatus == 1 ? ListFooterComponent :
                        <View style={{height: 10}}/>}
                    renderItem={renderItem}
                />
            )
        }
    }
}


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
        marginRight: 5
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
    itemBlockTitle: {},
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


const mapStateToProps = (state) => {
    return {
        taskLoanListReducer: state.taskLoanListReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getTaskLoanListMore: () => {
        dispatch(actions.taskLoanListAction.getTaskLoanListMore())
    },
    resetSearchTaskLoanFrom: () => {
        dispatch(reset('searchTaskLoanForm'))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(TaskLoanList)

