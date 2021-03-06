import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../../../GlobalStyles'
import { Container, Spinner } from 'native-base'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import * as  instructExecutingAction from '../../../instructExecuting/InstructExecutingAction'
import { Actions } from 'react-native-router-flux'


const TaskListItem = props => {
    const { item, setTaskInfo } = props
    // console.log('props', props)
    return (
        <TouchableOpacity onPress={() => {
            setTaskInfo(item)
            Actions.instructExecuting()
        }}>
            <View style={{ marginVertical: 10, marginHorizontal: 10, borderWidth: 1, borderColor: '#e1e2e6' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#edf1f4', paddingVertical: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcon name='truck' style={{ color: styleColor, paddingHorizontal: 5 }} size={20} />
                        <Text style={[globalStyles.midText, { color: '#8e9fa3', fontWeight: 'bold' }]}>{item.city_route_start ? item.city_route_start : ''}</Text>
                        <MaterialCommunityIcon name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#8c989f' }} />
                        <Text style={[globalStyles.midText, { color: '#8e9fa3', fontWeight: 'bold', paddingLeft: 5 }]}>{item.city_route_end ? item.city_route_end : ''}</Text>
                    </View>
                    {item.reverse_flag == 1 && <View style={{ flexDirection: 'row',alignItems: 'flex-end' }}>
                        <Text style={[globalStyles.smallText, { color: '#8e9fa3' }]}>倒板</Text>
                    </View>}
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={[globalStyles.smallText, { color: '#8e9fa3', paddingRight: 10 }]}>
                            {item.task_status == 1 && '未接受'}
                            {item.task_status == 2 && '已接受'}
                            {item.task_status == 3 && '已执行'}
                            {item.task_status == 4 && '在途'}
                            {item.task_status == 8 && '取消安排'}
                            {item.task_status == 9 && '已完成'}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5, backgroundColor: '#fff', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[globalStyles.smallText, { color: '#8e9fa3' }]}>指令时间：{item.task_plan_date ? moment(new Date(item.task_plan_date)).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const TaskListEmpty = () => {
    return (
        <View style={styles.taskListEmpty}>
            <Text style={globalStyles.midText}>暂无路线</Text>
        </View>
    )
}


const TaskListForHome = props => {
    const { taskListForHomeReducer: { data: { taskList }, getTaskListForHome }, setTaskInfo } = props
    // console.log('taskList',taskList)
    if (getTaskListForHome.isResultStatus != 1) {
        if (taskList.length > 0) {
            return (
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={taskList}
                    removeClippedSubviews={true}
                    renderItem={itemProps => TaskListItem({ setTaskInfo, ...itemProps })} />
            )
        } else {
            return (
                <TaskListEmpty />
            )
        }
    } else {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        taskListForHomeReducer: state.taskListForHomeReducer,
    }
}

const mapDispatchToProps = (dispatch) => ({
    setTaskInfo: (param) => {
        dispatch(instructExecutingAction.setTaskInfo(param))
    }
})

const styles = StyleSheet.create({
    taskListEmpty: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskListForHome) 