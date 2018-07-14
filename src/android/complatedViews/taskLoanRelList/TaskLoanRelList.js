import React from 'react'
import { FlatList, Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Spinner, Container } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import moment from 'moment'

const renderItem = props => {
    const { item: { dp_route_task_id, plan_count, city_route_end, city_route_start, task_plan_date, distance } } = props
    return (
        <View style={styles.itemContainer}>
            <View style={styles.item}>
                <Text style={globalStyles.smallText}>调度编号：{dp_route_task_id ? `${dp_route_task_id}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={[globalStyles.midText, globalStyles.styleColor, { fontWeight: 'bold' }]}>{city_route_start ? `${city_route_start}` : ''} - {city_route_end ? `${city_route_end}` : ''}</Text>
                <Text style={globalStyles.midText}><Text style={globalStyles.styleColor}>{distance ? `${distance}` : ''}</Text>公里</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.smallText}>装车数：{plan_count ? `${plan_count}` : ''}</Text>
                <Text style={globalStyles.smallText}>计划执行时间：{task_plan_date ? `${moment(task_plan_date).format('YYYY-MM-DD')}` : ''}</Text>
            </View>
        </View >
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无关联调度记录</Text>
        </View>
    )
}

const TaskLoanRelList = props => {
    const { data: { taskLoanRelList }, getTaskLoanRelList } = props.taskLoanRelListReducer
    if (getTaskLoanRelList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <FlatList
                keyExtractor={(item, index) => index}
                data={taskLoanRelList}
                ListEmptyComponent={renderEmpty}
                renderItem={renderItem}
            />
        )
    }
}
const styles = StyleSheet.create({
    item: {
        margin: 7.5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    itemContainer: {
        margin: 7.5,
        borderBottomWidth: 0.3,
        borderColor: '#ddd'
    }
})


const mapStateToProps = (state) => {
    return {
        taskLoanRelListReducer: state.taskLoanRelListReducer
    }
}

export default connect(mapStateToProps)(TaskLoanRelList)