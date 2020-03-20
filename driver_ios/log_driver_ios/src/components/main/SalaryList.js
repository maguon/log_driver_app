import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, InteractionManager } from 'react-native'
import { Container, Spinner ,Toast} from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import * as actions from '../../actions/index'


const renderItem = props => {
    const { item, item: { plan_salary, actual_salary, truck_num, month_date_id, drive_name, grant_status, id },
        getSalaryTaskListWaiting, getSalaryTaskList } = props
    return (
        <TouchableOpacity onPress={() => {
            getSalaryTaskListWaiting()
            Actions.salary({ salaryId: item.id })
            InteractionManager.runAfterInteractions(() => getSalaryTaskList({ salaryId: id }))
        }}>
            <View style={{ margin: 5, borderColor: '#ddd', borderWidth: 0.5 }}>
                <View style={[styles.listItemBody, { padding: 10, borderColor: '#ddd', borderBottomWidth: 0.5 }]}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>{month_date_id ? `${month_date_id}` : ''}</Text>
                    {grant_status == 3 && <Text style={[globalStyles.midText, globalStyles.styleColor]}>已发放</Text>}
                    {grant_status == 2 && <Text style={[globalStyles.midText, { color: 'red' }]}>未发放</Text>}
                </View>
                <View style={styles.listItemPadding} >
                    <View style={[styles.listItemBody, styles.listItemPadding]}>
                        <Text style={globalStyles.midText}>月份：{month_date_id ? `${month_date_id}` : ''}</Text>
                        <Text style={[globalStyles.midText]}>实发工资：{actual_salary ? `${actual_salary}` : '0'} 元</Text>

                    </View>
                    {/*<View style={[styles.listItemBody, styles.listItemPadding]}>*/}
                        {/*<Text style={[globalStyles.midText]}>应发工资：{plan_salary ? `${plan_salary}` : '0'} 元</Text>*/}
                        {/*<Text style={[globalStyles.midText]}>货车牌号：{truck_num ? `${truck_num}` : ''}</Text>*/}
                    {/*</View>*/}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const renderListFooter = props => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const renderListEmpty = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Text style={globalStyles.midText}>暂无工资记录</Text>
        </View>
    )
}


const SalaryList = props => {
    const { salaryListReducer: { data: { salaryList, isCompleted } }, getSalaryListMore, salaryListReducer, getSalaryTaskListWaiting, getSalaryTaskList } = props
    if (salaryListReducer.getSalaryList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <FlatList
                    contentContainerStyle={{ margin: 5 }}
                    data={salaryList}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (salaryListReducer.getSalaryList.isResultStatus == 2 && !isCompleted) {
                            getSalaryListMore()
                        } else {
                            // Toast.show({text:'已全部加载完毕！'})
                        }
                    }}
                    ListEmptyComponent={salaryListReducer.getSalaryList.isResultStatus != 1 && salaryList.length == 0 && renderListEmpty}
                    ListFooterComponent={salaryListReducer.getSalaryList.isResultStatus == 1 ? renderListFooter : <View style={{ height: 15 }} />}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item }) => renderItem({ item, getSalaryTaskListWaiting, getSalaryTaskList })} />
            </Container>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        salaryListReducer: state.salaryListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getSalaryListMore: () => {
        dispatch(actions.salaryListAction.getSalaryListMore())
    },
    getSalaryTaskListWaiting: () => {
        dispatch(actions.salaryAction.getSalaryTaskListWaiting())
    },
    getSalaryTaskList: req => {
        dispatch(actions.salaryAction.getSalaryTaskList(req))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SalaryList)


const styles = StyleSheet.create({
    listItemPadding: {
        padding: 5
    },
    listItemBorderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfdfdf'
    },
    listItemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
