import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    Button,
    ActivityIndicator,
    InteractionManager,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as homeAction from '../../../actions/HomeAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { MapView, Marker } from 'react-native-amap3d'
import AMapLocation from 'react-native-amap-location'
import { styleColor } from '../../GlobalStyles'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0
        }
        this.renderTaskItem = this.renderTaskItem.bind(this)
        this.changeTaskStatus = this.changeTaskStatus.bind(this)
        this.renderListHeader = this.renderListHeader.bind(this)
        this.initView = this.initView.bind(this)
    }

    componentDidMount() {
        this.listener = AMapLocation.addEventListener((data) => {})
        AMapLocation.startLocation({
          accuracy: 'HighAccuracy',
          killProcess: true,
          needDetail: true,
        });
        this.props.setGetMileageInfoWaiting()
        this.initView()

    }

    initView() {
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
            truckDispatchParam: {
                OptionalParam: {
                    dispatchFlag: 1
                }
            },
            taskListParam: {
                OptionalParam: {
                    taskStatusArr: '1,2,3,4,9'
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

    componentWillUnmount() {
        // AMapLocation.stopLocation()
        // this.listener.remove()
    }

    componentWillReceiveProps(nextProps) {
        const { isPopRefresh } = nextProps
        if (isPopRefresh) {
            this.initView()
            Actions.refresh({ isPopRefresh: !isPopRefresh })
        }
    }



    renderListHeader() {
        const { mileageInfo, truckDispatch } = this.props.homeReducer.data
        return (
            <View>
                <View style={{ backgroundColor: styleColor, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderRadius: 40, width: 80, height: 80, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: styleColor, fontSize: 11 }}>重载里程</Text>
                            <Text style={{ color: styleColor }}>{mileageInfo.load_distance ? `${mileageInfo.load_distance}` : '0'}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderRadius: 50, width: 100, height: 100, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: styleColor, fontSize: 11 }}>本月里程</Text>
                            <Text style={{ color: styleColor }}>{mileageInfo.distanceCount ? `${mileageInfo.distanceCount}` : '0'}</Text>
                            <Text style={{ color: styleColor, fontSize: 11 }}>公里</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderRadius: 40, width: 80, height: 80, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: styleColor, fontSize: 11 }}>空载里程</Text>
                            <Text style={{ color: styleColor }}>{mileageInfo.no_load_distance ? `${mileageInfo.no_load_distance}` : '0'}</Text>
                        </View>
                    </View>
                </View>
                <View>

                    <View style={{ flexDirection: 'row', backgroundColor: '#9AAAB2', paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                        {!!truckDispatch.current_city && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-pin' style={{ color: '#dce2e7' }} size={20} />
                            <Text style={{ color: '#fff', paddingLeft: 10, fontSize: 11 }}>{truckDispatch.city_name ? `${truckDispatch.city_name}` : ''}</Text>
                        </View>}
                        {!truckDispatch.current_city&& <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-pin' style={{ color: '#dce2e7' }} size={20} />
                            <Text style={{ color: '#fff', paddingLeft: 10, fontSize: 11 }}>该车辆暂时不能接受调度任务</Text>
                        </View>}
                        {!!truckDispatch.task_start && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-pin' style={{ color: '#dce2e7' }} size={20} />
                            <Text style={{ color: '#fff', paddingLeft: 10, fontSize: 11 }}>{truckDispatch.task_start_name ? `${truckDispatch.task_start_name}` : ''}</Text>
                            <MaterialCommunityIcon name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#fff' }} />
                            <Text style={{ color: '#fff', paddingLeft: 5, fontSize: 11 }}>{truckDispatch.task_end_name ? `${truckDispatch.task_end_name}` : ''}</Text>
                        </View>}
                        {!!truckDispatch.task_start && <View>
                            <Text style={{ color: '#fff', fontSize: 11 }}>在途</Text>
                        </View>}
                    </View>
                    <View style={{ height: 180 }}>
                        <MapView
                            locationEnabled
                            locationInterval={10000}
                            zoomLevel={14}
                            rotateEnabled={true}
                            showsCompass={true}
                            coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                            onLocation={({ nativeEvent }) => {
                                this.setState({
                                    latitude: nativeEvent.latitude,
                                    longitude: nativeEvent.longitude,
                                })
                            }}
                            showsZoomControls={false}
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>
            </View>
        )
    }


    renderTaskItem(item, key) {
        return <TouchableOpacity key={key} onPress={() => { Actions.instructExecuting({ initParam: { taskInfo: item } }) }}>
            <View style={{ marginVertical: 10, marginHorizontal: 10, borderWidth: 1, borderColor: '#e1e2e6' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#edf1f4', paddingVertical: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcon name='truck' style={{ color: styleColor, paddingHorizontal: 5 }} size={20} />
                        <Text style={{ color: '#8e9fa3', fontWeight: 'bold' }}>{item.city_route_start ? item.city_route_start : ''}</Text>
                        <MaterialCommunityIcon name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#8c989f' }} />
                        <Text style={{ color: '#8e9fa3', fontWeight: 'bold', paddingLeft: 5 }}>{item.city_route_end ? item.city_route_end : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ color: '#8e9fa3', paddingRight: 10, fontSize: 11 }}>
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
                        <Text style={{ color: '#8e9fa3', fontSize: 11 }}>指令时间：{item.task_plan_date ? moment(new Date(item.task_plan_date)).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Text style={{ color: '#8e9fa3', paddingRight: 50, fontSize: 11 }}>指定装载：{item.plan_count ? `${item.plan_count}` : '0'}</Text> */}
                    </View>
                </View>
                {/* <View style={{
                    position: 'absolute',
                    right: 10, top: 10
                }}>
                    {item.task_status == 1 && <TouchableOpacity onPress={() => this.changeTaskStatus(2)}>
                        <View style={{
                            borderRadius: 15,
                            width: 30,
                            height: 30,
                            backgroundColor: styleColor,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: '#fff', fontSize: 11 }}>接受</Text>
                        </View>
                    </TouchableOpacity>}
                    {item.task_status == 2 && <TouchableOpacity onPress={() => this.changeTaskStatus(3)}>
                        <View style={{
                            borderRadius: 15,
                            width: 30,
                            height: 30,
                            backgroundColor: styleColor,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: '#fff', fontSize: 11 }}>执行</Text>
                        </View>
                    </TouchableOpacity>}
                    {item.task_status == 3 && <TouchableOpacity onPress={() => { }}>
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
                    </TouchableOpacity>}
                    {item.task_status == 4 && <TouchableOpacity onPress={() => this.changeTaskStatus(9)}>
                        <View style={{
                            borderRadius: 15,
                            width: 30,
                            height: 30,
                            backgroundColor: styleColor,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: '#fff', fontSize: 11 }}>完成</Text>
                        </View>
                    </TouchableOpacity>}
                </View> */}
            </View>
        </TouchableOpacity>
    }

    render() {
        const { taskList } = this.props.homeReducer.data
        const { getHomeMileageInfo } = this.props.homeReducer
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
                        ListHeaderComponent={this.renderListHeader()}
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