import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Spinner, Container } from 'native-base'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as homeAction from './HomeAction'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { MapView } from 'react-native-amap3d'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import * as  instructExecutingAction from '../../instructExecuting/InstructExecutingAction'



class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0
        }
        this.renderTaskItem = this.renderTaskItem.bind(this)
        this.renderListHeader = this.renderListHeader.bind(this)
    }

    componentDidMount() {
        this.props.getMileageInfoWaiting()
        this.props.getMileageInfo()
    }

    renderListHeader() {
        const { homeReducer: { data: { mileageInfo, truckDispatch } } } = this.props
        // console.log('this.props', this.props)
        return (
            <View>
                <View style={{ backgroundColor: styleColor, flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ borderRadius: 40, width: 80, height: 80, backgroundColor: '#e5f1dc', borderWidth: 4, borderColor: '#acd086', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[globalStyles.smallText, globalStyles.styleColor]}>重载里程</Text>
                        <Text style={[globalStyles.largeText, globalStyles.styleColor]}>{mileageInfo.load_distance ? `${mileageInfo.load_distance}` : '0'}</Text>
                    </View>
                    <View style={{ borderRadius: 50, width: 100, height: 100, backgroundColor: '#e5f1dc', borderWidth: 4, borderColor: '#acd086', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[globalStyles.smallText, globalStyles.styleColor]}>本月里程</Text>
                        <Text style={[globalStyles.largeText, globalStyles.styleColor]}>{mileageInfo.distanceCount ? `${mileageInfo.distanceCount}` : '0'}</Text>
                        <Text style={[globalStyles.smallText, globalStyles.styleColor]}>公里</Text>
                    </View>
                    <View style={{ borderRadius: 40, width: 80, height: 80, backgroundColor: '#e5f1dc', borderWidth: 4, borderColor: '#acd086', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[globalStyles.smallText, globalStyles.styleColor]}>空载里程</Text>
                        <Text style={[globalStyles.largeText, globalStyles.styleColor]}>{mileageInfo.no_load_distance ? `${mileageInfo.no_load_distance}` : '0'}</Text>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#9AAAB2', paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                        {truckDispatch.dispatch_flag == 0 && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-pin' style={{ color: '#dce2e7' }} size={20} />
                            <Text style={[globalStyles.smallText, { color: '#fff', paddingLeft: 10 }]}>该车辆暂时不能接受调度任务</Text>
                        </View>}
                        {truckDispatch.dispatch_flag == 1 && !!truckDispatch.current_city && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-pin' style={{ color: '#dce2e7' }} size={20} />
                            <Text style={[globalStyles.smallText, { color: '#fff', paddingLeft: 10 }]}>{truckDispatch.city_name ? `${truckDispatch.city_name}` : ''}</Text>
                        </View>}
                        {truckDispatch.dispatch_flag == 1 && !!truckDispatch.task_start && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-pin' style={{ color: '#dce2e7' }} size={20} />
                            <Text style={[globalStyles.smallText, { color: '#fff', paddingLeft: 10 }]}>{truckDispatch.task_start_name ? `${truckDispatch.task_start_name}` : ''}</Text>
                            <MaterialCommunityIcon name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#fff' }} />
                            <Text style={[globalStyles.smallText, { color: '#fff', paddingLeft: 5 }]}>{truckDispatch.task_end_name ? `${truckDispatch.task_end_name}` : ''}</Text>
                        </View>}
                        {truckDispatch.dispatch_flag == 1 && !!truckDispatch.task_start && <View>
                            <Text style={[globalStyles.smallText, { color: '#fff' }]}>在途</Text>
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
        const { setTaskInfo } = this.props
        return <TouchableOpacity key={key} onPress={() => {
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
    }

    render() {
        const { homeReducer: { data: { taskList }, getHomeMileageInfo } } = this.props
        if (getHomeMileageInfo.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                        ListHeaderComponent={this.renderListHeader()}
                        data={taskList}
                        renderItem={({ item, index }) => this.renderTaskItem(item, index)}
                    />
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer,
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMileageInfo: () => {
        dispatch(homeAction.getMileageInfo())
    },
    getMileageInfoWaiting: () => {
        dispatch(homeAction.getMileageInfoWaiting())
    },
    setTaskInfo: (param) => {
        dispatch(instructExecutingAction.setTaskInfo(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)