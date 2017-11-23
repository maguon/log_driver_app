import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    Button,
    TouchableNativeFeedback,
    ActivityIndicator,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as homeAction from '../../../actions/HomeAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { MapView, Marker } from 'react-native-amap3d'

class Home extends Component {
    constructor(props) {
        super(props)
        this.renderTaskItem = this.renderTaskItem.bind(this)
        this.changeTaskStatus = this.changeTaskStatus.bind(this)
    }

    componentDidMount() {
        this.props.setGetMileageInfoWaiting()
        const { user } = this.props.userReducer.data
        InteractionManager.runAfterInteractions(() => this.props.getMileageInfo({
            mileageInfoParam: {
                OptionalParam: {
                    taskStatus: 9,
                    loadDistance: 5,
                    noLoadDistance: 5,
                    dateIdStart: moment().format('YYYY-MM-01'),
                    dateIdEnd: moment().format('YYYY-MM-DD')
                }
            },
            taskListParam: {
                OptionalParam: {
                    taskStatusArr: '1,2,3,4,9',
                    dateIdStart: moment().format('YYYY-MM-01'),
                    dateIdEnd: moment().format('YYYY-MM-DD')
                }
            },
            getDriverId: {
                requiredParam: {
                    userId: user.userId
                }
            }
        }))
    }

    changeTaskStatus() {

    }


    renderTaskItem(item, key) {
        // console.log(item)
        return <TouchableNativeFeedback key={key} onPress={() => { Actions.instructExecuting({ initParam: { taskInfo: item } }) }}>
            <View style={{ marginVertical: 10, marginHorizontal: 10, borderWidth: 1, borderColor: '#e1e2e6' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#edf1f4', paddingVertical: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcon name='truck' style={{ color: '#00cade', paddingHorizontal: 5 }} size={20} />
                        <Text style={{ color: '#8e9fa3', fontWeight: 'bold' }}>{item.city_route_start ? item.city_route_start : ''}—>{item.city_route_end ? item.city_route_end : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ color: '#8e9fa3', paddingRight: 50, fontSize: 11 }}>
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
                        <Text style={{ color: '#8e9fa3', fontSize: 11 }}>指令时间：{item.task_start_date ? moment(new Date(item.task_start_date)).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#8e9fa3', paddingRight: 50, fontSize: 11 }}>指定装载：{item.plan_count ? `${item.plan_count}` : '0'}</Text>
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    right: 10, top: 10
                }}>
                    {item.task_status == 1 && <TouchableNativeFeedback onPress={() => this.changeTaskStatus(2)}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{
                            borderRadius: 15,
                            width: 30,
                            height: 30,
                            backgroundColor: '#00cade',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: '#fff', fontSize: 11 }}>接受</Text>
                        </View>
                    </TouchableNativeFeedback>}
                    {item.task_status == 2 && <TouchableNativeFeedback onPress={() => this.changeTaskStatus(3)}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{
                            borderRadius: 15,
                            width: 30,
                            height: 30,
                            backgroundColor: '#00cade',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: '#fff', fontSize: 11 }}>执行</Text>
                        </View>
                    </TouchableNativeFeedback>}
                    {item.task_status == 3 && <TouchableNativeFeedback onPress={() => { }}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{
                            borderRadius: 15,
                            width: 30,
                            height: 30,
                            backgroundColor: '#c4c4c4',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: '#fff', fontSize: 11 }}>等待</Text>
                        </View>
                    </TouchableNativeFeedback>}
                    {item.task_status == 4 && <TouchableNativeFeedback onPress={() => this.changeTaskStatus(9)}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{
                            borderRadius: 15,
                            width: 30,
                            height: 30,
                            backgroundColor: '#00cade',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: '#fff', fontSize: 11 }}>完成</Text>
                        </View>
                    </TouchableNativeFeedback>}
                </View>
            </View>
        </TouchableNativeFeedback>
    }

    render() {
        const { taskList, mileageInfo } = this.props.homeReducer.data
        const { getHomeMileageInfo } = this.props.homeReducer
        //  console.log(this.props.userReducer)
        if (getHomeMileageInfo.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getHomeMileageInfo.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        ListHeaderComponent={<View>
                            <View style={{ backgroundColor: '#00cade', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRadius: 40, width: 80, height: 80, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#00cade', fontSize: 11 }}>重载里程</Text>
                                        <Text style={{ color: '#00cade' }}>{mileageInfo.load_distance ? `${mileageInfo.load_distance}` : '0'}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRadius: 50, width: 100, height: 100, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#00cade', fontSize: 11 }}>本月里程</Text>
                                        <Text style={{ color: '#00cade' }}>{mileageInfo.distanceCount ? `${mileageInfo.distanceCount}` : '0'}</Text>
                                        <Text style={{ color: '#00cade', fontSize: 11 }}>公里</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRadius: 40, width: 80, height: 80, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#00cade', fontSize: 11 }}>空载里程</Text>
                                        <Text style={{ color: '#00cade' }}>{mileageInfo.no_load_distance ? `${mileageInfo.no_load_distance}` : '0'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', backgroundColor: '#b0bfc6', paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name='ios-pin' style={{ color: '#dce2e7' }} size={20} />
                                        <Text style={{ color: '#fff', paddingLeft: 10, fontSize: 11 }}>大连—>沈阳</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: '#fff', fontSize: 11 }}>在途</Text>
                                    </View>
                                </View>
                                <View style={{ height: 180 }}>
                                    <MapView
                                        zoomLevel={16}
                                        coordinate={{ latitude: 41.8, longitude: 123.4 }}
                                        showsZoomControls={false}
                                        style={{ flex: 1 }}
                                    >
                                        <Marker
                                            image='flag'
                                            title=''
                                            coordinate={{ latitude: 41.8, longitude: 123.4 }}
                                        />
                                    </MapView>
                                </View>
                            </View>
                        </View>}
                        data={taskList}
                        renderItem={({ item, index }) => this.renderTaskItem(item, index)}
                    />
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMileageInfo: (param) => {
        dispatch(homeAction.getMileageInfo(param))
    },
    setGetMileageInfoWaiting: () => {
        dispatch(homeAction.setGetMileageInfoWaiting())
    },
    changeTaskStatus: (param) => {
        dispatch(homeAction.changeTaskStatus(param))
    },
    setChangeTaskStatusWaiting: () => {
        dispatch(homeAction.setChangeTaskStatusWaiting())
    },
    resetChangeTaskStatus: () => {
        dispatch(homeAction.resetChangeTaskStatus())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)