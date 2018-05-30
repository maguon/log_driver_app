import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'
import * as instructAction from './InstructAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { styleColor } from '../../GlobalStyles'

class Instruct extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.setGetRouteTaskListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getRouteTaskList({
            OptionalParam: { dpRouteTaskId: this.props.initParam.routeInfo.id }
        }))
    }

    renderTaskItem(item, key) {
        return <TouchableOpacity
            key={key}
            onPress={() => Actions.branchInstruct({ initParam: { routeLoadInfo: item } })}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', padding: 10, alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>{item.addr_name ? item.addr_name : ''}</Text>
                            <MaterialCommunityIcons name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#8c989f' }} />
                            <Text style={{ fontSize: 15, color: '#8b959b', paddingLeft: 5, fontWeight: 'bold' }}>{item.city_name ? item.city_name : ''}{item.short_name ? `(${item.short_name})` : ''}</Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                            <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>经销商一</Text>
                        </View> */}
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'left', flex: 1 }}>计划运送：{item.plan_count ? item.plan_count : '0'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>实际运送：<Text style={{ color: styleColor }}>{item.car_count ? item.car_count : '0'}</Text></Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>异常：<Text style={{ color: '#d69aa5' }}>{item.car_exception_count ? `${item.car_exception_count}` : '0'}</Text></Text>
                        </View> */}
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>
                                {item.load_task_status == 1 && '未装车'}
                                {item.load_task_status == 3 && '已装车'}
                                {item.load_task_status == 7 && '已到达'}
                                {item.load_task_status == 8 && '取消任务'}
                                {item.load_task_status == 9 && '已完成'}
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <EvilIcons name='chevron-right' size={40} color='#8b959b' />
                </View>
            </View>
        </TouchableOpacity>
    }

    render() {
        const { routeInfo } = this.props.initParam
        const { taskList } = this.props.instructReducer.data
        const { getRouteTaskList } = this.props.instructReducer
        if (getRouteTaskList.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getRouteTaskList.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: '#eff3f5', padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                        <View>
                            <Text style={{ fontSize: 11, color: '#8b959b' }}>
                                指令编号：{routeInfo.id ? `${routeInfo.id}` : ''}
                            </Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', paddingTop: 10, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name='truck' size={20} color={styleColor} />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                                    <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>{routeInfo.city_route_start ? routeInfo.city_route_start : ''}</Text>
                                    <MaterialCommunityIcons name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#8c989f' }} />
                                    <Text style={{ fontSize: 15, color: '#8b959b',paddingLeft: 5, fontWeight: 'bold' }}>{routeInfo.city_route_end ? routeInfo.city_route_end : ''}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                    <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}><Text style={{ color: '#d69aa5' }}>{routeInfo.distance ? `${routeInfo.distance}` : ''}</Text>公里</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='ios-clock-outline' style={{ fontSize: 15, color: '#8b959b' }} />
                                <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指定执行时间：{routeInfo.task_start_date ? moment(new Date(routeInfo.task_start_date)).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row' }}>
                                <Icon name='ios-person' style={{ fontSize: 15, color: '#8b959b' }} />
                                <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指定调度：{routeInfo.route_op_name ? routeInfo.route_op_name : ''}</Text>
                            </View> */}
                        </View>
                        <View style={{ flexDirection: 'row', paddingBottom:10, justifyContent: 'space-between' }}>
                            {/* <View style={{ flexDirection: 'row' }}>
                                <Icon name='ios-clock-outline' style={{ fontSize: 15, color: '#8b959b' }} />
                                <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指定执行时间：{routeInfo.task_start_date ? moment(new Date(routeInfo.task_start_date)).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                            </View> */}
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='ios-person' style={{ fontSize: 15, color: '#8b959b' }} />
                                <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指定调度：{routeInfo.route_op_name ? routeInfo.route_op_name : ''}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                                <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>计划运送：{`${taskList.reduce((sum, value) => sum + (value.plan_count ? value.plan_count : 0), 0)}`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 11, color: '#8b959b' }}>实际运送：<Text style={{ color: styleColor }}>{routeInfo.car_count ? `${routeInfo.car_count}` : '0'}</Text></Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 11, color: '#8b959b' }}>异常：<Text style={{ color: '#d69aa5' }}>{`${taskList.reduce((sum, value) => sum + (value.car_exception_count ? value.car_exception_count : 0), 0)}`}</Text></Text>
                            </View> */}
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 11, color: styleColor }}>{routeInfo.task_status == 9 ? '完成' : ''}</Text>
                            </View>
                        </View>
                    </View>
                    <FlatList
                        data={taskList}
                        renderItem={({ item, index }) => this.renderTaskItem(item, key)} />
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        instructReducer: state.instructReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRouteTaskList: (param) => {
        dispatch(instructAction.getRouteTaskList(param))
    },
    setGetRouteTaskListWaiting: () => {
        dispatch(instructAction.setGetRouteTaskListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Instruct)
