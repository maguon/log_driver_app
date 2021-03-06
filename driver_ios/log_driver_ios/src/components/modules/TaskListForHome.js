import React from 'react'
import {
    Text,
    Dimensions,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {Container, Spinner} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import {Actions} from 'react-native-router-flux'
import * as actions from '../../actions/index'
import globalStyles, {styleColor} from '../utils/GlobalStyles'

const window = Dimensions.get('window')

//路线单项组件
const TaskListItem = props => {
    const {item, setTaskInfo} = props
    return (
        <TouchableOpacity onPress={() => {
            setTaskInfo(item)
            Actions.instructExecuting()
        }}>
            <View style={styles.taskItem}>
                <View style={styles.item}>
                    <Icon name='truck' style={[globalStyles.styleColor, {paddingLeft: 10}]} size={20}/>
                    <Text
                        style={[globalStyles.largeText, {paddingLeft: 5}]}>{item.city_route_start ? item.city_route_start : ''}</Text>
                    <Icon name='transfer-right' style={{paddingLeft: 5}} size={15}/>
                    <Text
                        style={[globalStyles.largeText, {paddingLeft: 5}]}>{item.city_route_end ? item.city_route_end : ''}</Text>


                    <Text style={[globalStyles.smallText, {position: 'absolute', right: 30}]}>
                        {item.task_status == 1 && '未接受'}
                        {item.task_status == 2 && '已接受'}
                        {item.task_status == 3 && '已执行'}
                        {item.task_status == 4 && '在途'}
                        {item.task_status == 8 && '取消安排'}
                        {item.task_status == 9 && '已完成'}
                    </Text>
                    <Icon name='chevron-right'
                          style={[globalStyles.textColor, {position: 'absolute', right: 0, top: 30}]} size={25}></Icon>
                </View>


                <View style={styles.item}>
                    <Text
                        style={[globalStyles.smallText, {paddingLeft: 35}]}>指定时间：{item.task_plan_date ? moment(new Date(item.task_plan_date)).format('YYYY-MM-DD') : ''}</Text>
                    <Text style={[globalStyles.smallText, {position: 'absolute', right: 30,}]}>指定装载：{item.plan_count ? item.plan_count : 0}</Text>
                </View>
                <View style={styles.line}></View>

            </View>

        </TouchableOpacity>
    )
}

//没有路线
const TaskListEmpty = () => {
    return (
        <View style={styles.taskListEmpty}>
            <Text style={globalStyles.midText}>暂无路线</Text>
        </View>
    )
}

//判断数据源 对应显示
const TaskListForHome = props => {
    const {taskListForHomeReducer: {data: {taskList}, getTaskListHome}, setTaskInfo} = props
    // console.log('taskList', taskList)
    if (getTaskListHome.isResultStatus != 1) {
        if (taskList.length > 0) {
            return (
                <FlatList
                    keyExtractor={(item, index) => `${index}`}
                    data={taskList}
                    removeClippedSubviews={true}
                    renderItem={itemProps => TaskListItem({setTaskInfo, ...itemProps})}/>
            )
        } else {
            return (
                <TaskListEmpty/>
            )
        }

    } else {
        return(
        <Container>
            <Spinner color={styleColor}/>
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
            dispatch(actions.instructExecutingAction.setTaskInfo(param))
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
    },

    taskItem: {
        width: window.width,
        height: 80,
        flexDirection: 'column',
        backgroundColor: '#f6fbfc',
    },
    item: {
        width: window.width,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        width: window.width,
        height: 2,
        position: "absolute",
        bottom: 0,
        left: 35,
        backgroundColor: '#ecedee'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(TaskListForHome)
