import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { Icon, Button } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import * as branchInstructAction from './BranchInstructAction'
import { MapView, Marker } from 'react-native-amap3d'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../../GlobalStyles'

class BranchInstruct extends Component {
    constructor(props) {
        super(props)
        this.renderListItem = this.renderListItem.bind(this)
    }

    componentDidMount() {
        this.props.setGetRouteLoadTaskListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getRouteLoadTaskList({
            requiredParam: {
                dpRouteLoadTaskId: this.props.initParam.routeLoadInfo.id
            },
            OptionalParam: {
                receiveId: this.props.initParam.routeLoadInfo.receive_id,
            }
        }))
    }

    renderListItem(item, key) {
        return <View key={key} style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ccc' }}>
            <View style={{ flexDirection: 'row', flex: 7 }}>
                <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                <Text style={[globalStyles.smallText, { color: '#ccc', paddingLeft: 10 }]}>VIN码：<Text style={{ color: item.exception_status == 1 ? '#d69aa5' : '#8b959b' }}>{item.vin ? item.vin : ''}</Text></Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 2 }}>
                <Text style={[globalStyles.smallText, { color: '#8b959b' }]}>{item.make_name ? item.make_name : ''}</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end' }}>
                <Text style={[globalStyles.smallText, { color: styleColor }]}>{item.car_load_status == 1 && '已装车'}{item.car_load_status == 2 && '已送达'}</Text>
                {/* <Text style={{ color: '#d69aa5', fontSize: 11, paddingLeft: 8 }}>{item.exception_status == 1 && '异常'}</Text> */}
            </View>
        </View>
    }


    render() {
        const { routeLoadInfo } = this.props.initParam
        const { routeLoadTaskList } = this.props.branchInstructReducer.data
        const { getRouteLoadTaskList } = this.props.branchInstructReducer
        // console.log('this.props.branchInstructReducer',this.props.branchInstructReducer)
        // console.log('routeLoadInfo',routeLoadInfo)
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
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ height: 200, backgroundColor: '#8b959b' }}>
                        {this.props.branchInstructReducer.data.loadTaskInfo.lat && this.props.branchInstructReducer.data.loadTaskInfo.lng && <MapView
                            locationEnabled
                            zoomLevel={14}
                            coordinate={this.props.branchInstructReducer.data.loadTaskInfo.lat && this.props.branchInstructReducer.data.loadTaskInfo.lng ? { latitude: this.props.branchInstructReducer.data.loadTaskInfo.lat, longitude: this.props.branchInstructReducer.data.loadTaskInfo.lng } : { latitude: 38.92, longitude: 121.60 }}
                            showsZoomControls={false}
                            rotateEnabled={true}
                            showsCompass={true}
                            style={{ flex: 1 }}
                        >
                            <Marker
                                image='flag'
                                title=''
                                coordinate={this.props.branchInstructReducer.data.loadTaskInfo.lat && this.props.branchInstructReducer.data.loadTaskInfo.lng ? { latitude: this.props.branchInstructReducer.data.loadTaskInfo.lat, longitude: this.props.branchInstructReducer.data.loadTaskInfo.lng } : { latitude: 38.92, longitude: 121.60 }}
                            />
                        </MapView>}
                        {(!this.props.branchInstructReducer.data.loadTaskInfo.lat || !this.props.branchInstructReducer.data.loadTaskInfo.lng) && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff' }}>未设置目的地经纬度</Text>
                        </View>}
                        <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', flexDirection: 'row', padding: 5, top: 0, right: 0, justifyContent: 'space-between', position: 'absolute' }}>
                            <Text style={[globalStyles.midText, { color: styleColor }]}>{routeLoadInfo.addr_name ? routeLoadInfo.addr_name : ''} </Text>
                            <MaterialCommunityIcons name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#8c989f' }} />
                            <Text style={[globalStyles.midText, { paddingLeft: 5, color: styleColor }]}>{routeLoadInfo.city_name ? routeLoadInfo.city_name : ''}{routeLoadInfo.short_name ? `(${routeLoadInfo.short_name})` : ''}</Text>
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
                            <Text style={[globalStyles.midText, { color: '#8b959b' }]}>计划运送：{routeLoadInfo.plan_count ? `${routeLoadInfo.plan_count}` : '0'}</Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText, { color: '#8b959b' }]}>实际送达：<Text style={{ color: styleColor }}>{routeLoadInfo.car_count ? `${routeLoadInfo.car_count}` : '0'}</Text></Text>
                        </View>
                        {/* <View>
                            <Text style={{ color: '#8b959b' }}>异常：<Text style={{ color: '#d69aa5' }}>{routeLoadInfo.car_exception_count ? `${routeLoadInfo.car_exception_count}` : '0'}</Text></Text>
                        </View> */}
                    </View>
                    <FlatList
                        data={routeLoadTaskList}
                        renderItem={({ item, index }) => this.renderListItem(item, index)} />
                    {/* 
                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <View style={{ flexDirection: 'row', flex: 7 }}>
                        <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                        <Text style={{ color: '#ccc', fontSize: 11, paddingLeft: 10 }}>VIN码：<Text style={{ color: '#d69aa5' }}>12345678901234567</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 2 }}>
                        <Text style={{ color: '#8b959b', fontSize: 11 }}>一汽大众</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end' }}>
                        <Text style={{ color: '#d69aa5', fontSize: 11 }}>异常</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 7 }}>
                        <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                        <Text style={{ color: '#ccc', fontSize: 11, paddingLeft: 10 }}>VIN码：<Text style={{ color: '#8b959b' }}>12345678901234567</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 2 }}>
                        <Text style={{ color: '#8b959b', fontSize: 11 }}>一汽大众</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end' }}>
                        <View>
                            <Icon name='ios-checkmark-circle' style={{ fontSize: 25, color: styleColor }} />
                        </View>
                        <View style={{ paddingLeft: 5 }}>
                            <Icon name='md-alert' style={{ fontSize: 25, color: '#d69aa5' }} />
                        </View>
                    </View>
                </View> */}
                    {/* <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', paddingTop: 10, paddingRight: 10 }}>
                    <Button small rounded onPress={() => { }} style={{ backgroundColor: styleColor }}>
                        <Text style={{ color: '#fff' }}>完成</Text>
                    </Button>
                </View> */}
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        branchInstructReducer: state.branchInstructReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRouteLoadTaskList: (param) => {
        dispatch(branchInstructAction.getRouteLoadTaskList(param))
    },
    setGetRouteLoadTaskListWaiting: () => {
        dispatch(branchInstructAction.setGetRouteLoadTaskListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchInstruct)