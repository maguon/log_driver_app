import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import { Icon, Button } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import * as branchInstructExecutingAction from '../../actions/BranchInstructExecutingAction'
import { MapView, Marker } from 'react-native-amap3d'

class BranchInstructExecuting extends Component {
    constructor(props) {
        super(props)
        this.renderListItem = this.renderListItem.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
        this.changeCarLoadStatus = this.changeCarLoadStatus.bind(this)
        this.changeLoadTaskStatus = this.changeLoadTaskStatus.bind(this)
    }

    componentWillMount() {
        this.props.setLoadTaskInfo(this.props.initParam.loadTaskInfo)
    }

    componentDidMount() {
        const { loadTaskInfo } = this.props.initParam
        this.props.setGetRouteLoadTaskListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getRouteLoadTaskList({
            requiredParam: {
                dpRouteLoadTaskId: loadTaskInfo.id
            },
            OptionalParam: {
                receiveId: this.props.branchInstructExecutingReducer.data.loadTaskInfo.receive_id,
            }
        }))
    }

    changeLoadTaskStatus() {
        const { user } = this.props.userReducer.data
        const { loadTaskInfo } = this.props.branchInstructExecutingReducer.data
        this.props.changeLoadTaskStatus({
            requiredParam: {
                userId: user.userId,
                dpRouteLoadTaskId: loadTaskInfo.id,
                loadTaskStatus: 7
            }
        })
    }

    changeCarLoadStatus(param) {
        const { user } = this.props.userReducer.data
        this.props.changeCarLoadStatus({
            requiredParam: {
                userId: user.userId,
                dpRouteTaskDetailId: param,
                carLoadStatus: 2
            },
            putParam: {
                truckId: user.truckId,
            }
        })
    }

    renderFooter() {
        const { routeLoadTaskList, loadTaskInfo } = this.props.branchInstructExecutingReducer.data
        // const { loadTaskInfo } = this.props.initParam
        const total = routeLoadTaskList.reduce((sum, value) => {
            return sum && value.car_load_status == 2 //&& value.exception_status != 1
        }, true)
        if (total && loadTaskInfo.load_task_status == 3) {
            return <View style={{ padding: 10, alignSelf: 'flex-end' }}>
                <Button small rounded onPress={this.changeLoadTaskStatus} style={{ backgroundColor: '#00cade' }}>
                    <Text style={{ color: '#fff' }}>完成</Text>
                </Button>
            </View>
        } else if (!total && loadTaskInfo.load_task_status == 3) {
            return <View style={{ padding: 10, alignSelf: 'flex-end' }}>
                <Button small rounded disabled style={{ backgroundColor: '#c4c4c4' }}>
                    <Text style={{ color: '#fff' }}>完成</Text>
                </Button>
            </View>
        }
    }

    renderListItem(item, key) {
        return <View key={key} style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ccc', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', flex: 7 }}>
                <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                <Text style={{ color: '#ccc', fontSize: 11, paddingLeft: 10 }}>VIN码：<Text style={{ color: item.exception_status == 1 ? '#d69aa5' : '#8b959b' }}>{item.vin ? item.vin : ''}</Text></Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 2 }}>
                <Text style={{ color: '#8b959b', fontSize: 11 }}>{item.make_name ? item.make_name : ''}</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
                {item.car_load_status == 2 && <Text style={{ color: '#00cade', fontSize: 11, marginVertical: 10 }}>{item.car_load_status == 2 && '已送达'}</Text>}
                {item.car_load_status == 1 && <TouchableOpacity onPress={() => this.changeCarLoadStatus(item.id)}>
                    <Icon name='ios-checkmark-circle' style={{ color: '#00cade', fontSize: 25, marginVertical: 5 }} />
                </TouchableOpacity>}
                {/* {!!item.exception_status && <Text style={{ color: '#d69aa5', fontSize: 11, paddingLeft: 8 }}>{item.exception_status == 1 && '异常'}</Text>}
                {!item.exception_status && <Icon name='ios-alert' style={{ color: '#d69aa5', paddingLeft: 8, fontSize: 25 }} />} */}
            </View>
        </View>
    }


    render() {
        //     console.log(this.props.initParam)
        console.log('this.props.branchInstructExecutingReducer', this.props.branchInstructExecutingReducer)
        //const { loadTaskInfo } = this.props.initParam
        const { getRouteLoadTaskList } = this.props.branchInstructExecutingReducer

        if (getRouteLoadTaskList.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getRouteLoadTaskList.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            const { routeLoadTaskList, loadTaskInfo } = this.props.branchInstructExecutingReducer.data
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ height: 200, backgroundColor: '#8b959b' }}>

                        <MapView
                            zoomLevel={16}
                            coordinate={loadTaskInfo.lat && loadTaskInfo.lng ? { latitude: loadTaskInfo.lat, longitude: loadTaskInfo.lng } : { latitude: 38.92, longitude: 121.60 }}
                            showsZoomControls={false}
                            style={{ flex: 1 }}
                        >
                            <Marker
                                image='flag'
                                title={loadTaskInfo.short_name}
                                coordinate={loadTaskInfo.lat && loadTaskInfo.lng ? { latitude: loadTaskInfo.lat, longitude: loadTaskInfo.lng } : { latitude: 38.92, longitude: 121.60 }}
                            />
                        </MapView>
                        <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', flexDirection: 'row', padding: 5, top: 0, right: 0, justifyContent: 'space-between', position: 'absolute' }}>
                            <Text style={{ color: '#00cade' }}>{loadTaskInfo.addr_name ? loadTaskInfo.addr_name : ''} </Text>
                            <Text style={{ paddingHorizontal: 5 }}>--></Text>
                            <Text style={{ color: '#00cade' }}>{loadTaskInfo.city_name ? loadTaskInfo.city_name : ''}</Text>
                            <Text style={{ paddingLeft: 20, color: '#00cade' }}>{loadTaskInfo.short_name ? loadTaskInfo.short_name : ''}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        padding: 10,
                        backgroundColor: '#eff3f5',
                        justifyContent: 'space-between',
                        borderColor: '#ccc',
                        borderBottomWidth: 0.5,
                        borderTopWidth: 0.5
                    }}>
                        <View>
                            <Text style={{ color: '#8b959b' }}>计划运送：{loadTaskInfo.plan_count ? `${loadTaskInfo.plan_count}` : '0'}</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#8b959b' }}>实际送达：<Text style={{ color: '#00cade' }}>{loadTaskInfo.car_count ? `${loadTaskInfo.car_count}` : '0'}</Text></Text>
                        </View>
                        {/* <View>
                        <Text style={{ color: '#8b959b' }}>异常：<Text style={{ color: '#d69aa5' }}>{loadTaskInfo.car_exception_count ? `${loadTaskInfo.car_exception_count}` : '0'}</Text></Text>
                    </View> */}
                    </View>
                    <FlatList
                        data={routeLoadTaskList}
                        renderItem={({ item, index }) => this.renderListItem(item, index)}
                        ListFooterComponent={this.renderFooter()} />
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        branchInstructExecutingReducer: state.branchInstructExecutingReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRouteLoadTaskList: (param) => {
        dispatch(branchInstructExecutingAction.getRouteLoadTaskList(param))
    },
    setGetRouteLoadTaskListWaiting: () => {
        dispatch(branchInstructExecutingAction.setGetRouteLoadTaskListWaiting())
    },
    changeCarLoadStatus: (param) => {
        dispatch(branchInstructExecutingAction.changeCarLoadStatus(param))
    },
    setChangeCarLoadStatusWaiting: () => {
        dispatch(branchInstructExecutingAction.setChangeCarLoadStatusWaiting())
    },
    changeLoadTaskStatus: (param) => {
        dispatch(branchInstructExecutingAction.changeLoadTaskStatus(param))
    },
    setChangeLoadTaskStatusWaiting: () => {
        dispatch(branchInstructExecutingAction.setChangeLoadTaskStatusWaiting())
    },
    setLoadTaskInfo: (param) => {
        dispatch(branchInstructExecutingAction.setLoadTaskInfo(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchInstructExecuting)
