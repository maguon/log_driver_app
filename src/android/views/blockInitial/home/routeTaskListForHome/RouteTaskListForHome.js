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
import { Container, Spinner, Button } from 'native-base'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const RouteTaskListItem = props => {
    const { item } = props
    if (item.load_task_status != 1) {
        return <TouchableOpacity onPress={() => {
            Actions.branchInstructExecuting({ initParam: { loadTaskInfo: item, task_status: item.task_status } })
        }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', padding: 10, alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[globalStyles.midText, { color: '#8b959b', fontWeight: 'bold' }]}>
                                {item.addr_name ? item.addr_name : ''}{item.load_task_type == 2 && <Text style={{ color: 'red' }}>(转)</Text>} -->
                                {item.transfer_flag == 0 && item.city_name ? ` ${item.city_name}` : ''}{item.transfer_flag == 0 && ' - '}{item.transfer_flag == 0 && item.short_name ? item.short_name : ''}
                                {item.transfer_flag == 1 && item.transfer_city_name ? ` ${item.transfer_city_name}` : ''}{item.transfer_flag == 1 && ' - '}{item.transfer_flag == 1 && item.transfer_addr_name ? item.transfer_addr_name : ''}
                                {item.transfer_flag == 1 && <Text style={{ color: 'red' }}>(转)</Text>}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'left', flex: 1 }]}>计划运送：{item.plan_count ? item.plan_count : '0'}</Text>
                        <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'center', flex: 1 }]}>实际运送：<Text style={{ color: styleColor }}>{item.car_count ? item.car_count : '0'}</Text></Text>
                        <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'right', flex: 1 }]}>
                            {item.load_task_status == 3 && '已装车'}
                            {item.load_task_status == 7 && '已到达'}
                            {item.load_task_status == 8 && '取消任务'}
                            {item.load_task_status == 9 && '已完成'}
                        </Text>
                    </View>
                </View>
                <View>
                    <EvilIcons name='chevron-right' size={40} color='#8b959b' />
                </View>
            </View>
        </TouchableOpacity>
    }
    else {
        return (
            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[globalStyles.midText, { color: '#8b959b', fontWeight: 'bold' }]}>
                            {item.addr_name ? item.addr_name : ''}{item.load_task_type == 2 && <Text style={{ color: 'red' }}>(转)</Text>} -->
                                {item.transfer_flag == 0 && item.city_name ? ` ${item.city_name}` : ''}{item.transfer_flag == 0 && ' - '}{item.transfer_flag == 0 && item.short_name ? item.short_name : ''}
                            {item.transfer_flag == 1 && item.transfer_city_name ? ` ${item.transfer_city_name}` : ''}{item.transfer_flag == 1 && ' - '}{item.transfer_flag == 1 && item.transfer_addr_name ? item.transfer_addr_name : ''}
                            {item.transfer_flag == 1 && <Text style={{ color: 'red' }}>(转)</Text>}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'left', flex: 1 }]}>计划运送：{item.plan_count ? item.plan_count : '0'}</Text>
                    <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'left', flex: 1 }]}>实际运送：<Text style={{ color: styleColor }}>{item.car_count ? item.car_count : '0'}</Text></Text>
                    {(item.task_status == 2 || item.task_status == 1) && <Text style={[globalStyles.smallText, { color: '#8b959b', textAlign: 'right', flex: 1 }]}>
                        未达到装车条件
                    </Text>}
                    {item.task_status >= 3 && <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Button small rounded style={{ height: 20, backgroundColor: styleColor, alignSelf: 'flex-end' }} onPress={() => {
                            Actions.cars({ initParam: { commandInfo: item } })
                        }}>
                            <Text style={[globalStyles.smallText, { color: '#fff', padding: 5 }]}>装车</Text>
                        </Button>
                    </View>}
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={[globalStyles.smallText, { color: '#8b959b' }]}>计划运送时间：{item.plan_date ? moment(`${item.plan_date}`).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                </View>
            </View>
        )
    }
}

const RouteTaskListEmpty = () => {
    return (
        <View style={styles.taskListEmpty}>
            <Text style={globalStyles.midText}>暂无任务</Text>
        </View>
    )
}

const RouteTaskListForHome = props => {
    const { routeTaskListForHomeReducer: { data: { routeTaskList }, getRouteTaskListForHome } } = props
    if (getRouteTaskListForHome.isResultStatus != 1) {
        if (routeTaskList.length > 0) {
            return (
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={routeTaskList}
                    removeClippedSubviews={true}
                    renderItem={itemProps => RouteTaskListItem({ ...itemProps })} />
            )
        } else {
            return (
                <RouteTaskListEmpty />
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


const mapStateToProps = (state, ownProps) => {
    const { taskId } = ownProps
    const { routeTaskListForHomeReducer: { data: { routeTaskList } } } = state
    return {
        routeTaskListForHomeReducer: {
            ...state.routeTaskListForHomeReducer,
            data: {
                routeTaskList: !taskId ? routeTaskList : routeTaskList.filter(item => item.dp_route_task_id == taskId)
            }
        }
    }
}

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

export default connect(mapStateToProps)(RouteTaskListForHome) 