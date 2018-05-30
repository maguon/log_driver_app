import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    InteractionManager,
    ToastAndroid,
    TouchableOpacity
} from 'react-native'
import { Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as RouterDirection from '../../../util/RouterDirection'
import * as carsAction from './CarsAction'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { Actions } from 'react-native-router-flux'


class Cars extends Component {
    constructor(props) {
        super(props)
        this.onSelectCar = this.onSelectCar.bind(this)
        this.removeCar = this.removeCar.bind(this)
        this.renderListItem = this.renderListItem.bind(this)
        this.renderListFooter = this.renderListFooter.bind(this)
        this.finishCarry = this.finishCarry.bind(this)
    }

    componentDidMount() {
        const { commandInfo } = this.props.initParam
        this.props.getCommandCarListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getCommandCarList({
            requiredParam: {
                dpRouteLoadTaskId: commandInfo.id
            },
            taskInfo: commandInfo
        }))
    }

    onSelectCar(param) {
        console.log('this.props', this.props)
        console.log('param', param)
        const { user } = this.props.userReducer.data
        const { taskInfo } = this.props.carsReducer.data
        this.props.pushCarInCommandWaiting()
        InteractionManager.runAfterInteractions(() => this.props.pushCarInCommand({
            requiredParam: {
                userId: user.userId,
                dpRouteLoadTaskId: taskInfo.id,
            },
            OptionalParam: {
                truckId: taskInfo.truck_id,
                dpRouteTaskId: taskInfo.dp_route_task_id
            },
            postParam: {
                carId: param.item.id,
                vin: param.item.vin
            },
            car: {
                car_id: param.item.id,
                vin: param.item.vin,
                make_name: param.item.make_name
            }
        }))
    }

    componentWillReceiveProps(nextProps) {
        const { carList } = nextProps.carsReducer.data
        const { finishCarry } = nextProps.carsReducer
        const car = carList.find(item => {
            return item.removeCommandCar.isResultStatus == 2
        })
        if (car) {
            ToastAndroid.show('移除成功！', ToastAndroid.SHORT)
            this.props.resetRemoveCommandCar(car.data.id)
        }

        if (finishCarry.isResultStatus == 2) {
            ToastAndroid.show('装车完毕！', ToastAndroid.SHORT)
            this.props.resetFinishCarry()
        }
    }

    removeCar(param) {
        const { taskInfo } = this.props.carsReducer.data
        const { user } = this.props.userReducer.data
        this.props.removeCommandCar({
            requiredParam: {
                userId: user.userId,
                dpRouteTaskDetailId: param.data.id
            },
            OptionalParam: {
                truckId: taskInfo.truck_id,
                carId: param.data.car_id
            }
        })
    }

    renderListFooter() {
        const { taskInfo } = this.props.carsReducer.data
        if (taskInfo.load_task_status == 1) {
            return <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button small style={{ backgroundColor: styleColor, padding: 10, margin: 10 }} onPress={this.finishCarry}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>完成装车</Text>
                </Button>
            </View>
        } else {
            return <View />
        }
    }

    finishCarry() {
        const { user } = this.props.userReducer.data
        const { taskInfo } = this.props.carsReducer.data
        this.props.finishCarry({
            requiredParam: {
                userId: user.userId,
                dpRouteLoadTaskId: taskInfo.id,
                loadTaskStatus: 3
            }
        })
    }

    renderListItem(item, index) {
        const { taskInfo } = this.props.carsReducer.data
        if (taskInfo.load_task_status == 1) {
            return <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' }}>
                <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='car' size={14} style={{ color: '#8c989f' }} />
                    <Text style={[globalStyles.smallText, { paddingLeft: 10 }]}>VIN：{item.data.vin ? `${item.data.vin}` : ''}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={globalStyles.smallText}>{item.data.make_name ? `${item.data.make_name}` : ''}</Text>
                </View>
                {item.removeCommandCar.isResultStatus == 1 && <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator
                        animating={true}
                        style={{ height: 20, alignSelf: 'center' }}
                        size="small"
                    />
                </View>}
                {item.removeCommandCar.isResultStatus != 1 && <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => this.removeCar(item)}>
                        <Icon name='ios-close-circle'
                            style={{ color: '#fe8a95', fontSize: 26 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.carInfo({ initParam: { vin: item.data.vin, carId: item.data.car_id } })} >
                        <Icon name='ios-arrow-dropright-circle'
                            style={{ color: styleColor, marginLeft: 10, fontSize: 26 }} />
                    </TouchableOpacity>
                </View>}
            </View>
        } else {
            return <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' }}>
                <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='car' size={14} style={{ color: '#8c989f' }} />
                    <Text style={[globalStyles.smallText, { paddingLeft: 10 }]}>VIN：{item.data.vin ? `${item.data.vin}` : ''}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={globalStyles.smallText}>{item.data.make_name ? `${item.data.make_name}` : ''}</Text>
                </View>
                <TouchableOpacity
                    style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}
                    onPress={() => Actions.carInfo({ initParam: { vin: item.data.vin, carId: item.data.car_id } })}>
                    <Icon name='ios-arrow-dropright-circle'
                        style={{ color: styleColor, marginLeft: 10, fontSize: 26 }} />
                </TouchableOpacity>
            </View>
        }
    }

    render() {
        const { carList, taskInfo } = this.props.carsReducer.data
        const { pushCarInCommand, getCommandCarList } = this.props.carsReducer
        if (getCommandCarList.isResultStatus == 1) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator
                            animating={getCommandCarList.isResultStatus == 1}
                            style={{ height: 80 }}
                            size="large"
                        />
                    </View>
                </View>)
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#a8a8a8' }}>
                        <Text style={globalStyles.smallText}>计划运送：{taskInfo.plan_count ? `${taskInfo.plan_count}` : '0'}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {taskInfo.load_task_status == 1 && pushCarInCommand.isResultStatus != 1 && <Button small rounded
                                style={{ backgroundColor: styleColor, width: 90, height: 20, justifyContent: 'center', flexDirection: 'row' }}
                                onPress={() => Actions.searchCar({ onSelect: this.onSelectCar, initParam: { carStatus: 1 } })}>
                                <MaterialCommunityIcons name='car' size={14} style={{ color: '#fff' }} />
                                <Text style={[globalStyles.smallText, { color: '#fff', fontWeight: 'bold', paddingLeft: 10 }]}>装 车</Text>
                            </Button>}
                            {taskInfo.load_task_status == 1 && pushCarInCommand.isResultStatus != 1 && <Button small rounded
                                style={{ backgroundColor: styleColor, width: 110, height: 20, marginLeft: 10, justifyContent: 'center', flexDirection: 'row' }}
                                onPress={() => Actions.addCar({ onSelect: this.onSelectCar })}>
                                <MaterialCommunityIcons name='plus-circle-outline' size={14} style={{ color: '#fff' }} />
                                <Text style={[globalStyles.smallText, { color: '#fff', fontWeight: 'bold', paddingLeft: 10 }]}>新增车辆</Text>
                            </Button>}
                        </View>
                        {taskInfo.load_task_status == 1 && pushCarInCommand.isResultStatus == 1 && <View style={{ width: 70, alignItems: 'center' }}>
                            <ActivityIndicator
                                animating={true}
                                style={{ height: 20, alignSelf: 'center' }}
                                size="small"
                            />
                        </View>}
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            keyExtractor={(item, index) => index}
                            data={carList}
                            renderItem={({ item, index }) => this.renderListItem(item, index)}
                            ListFooterComponent={this.renderListFooter} />
                    </View>
                </View>
            )
        }
    }
}



const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        carsReducer: state.carsReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeCommandCar: (param) => {
        dispatch(carsAction.removeCommandCar(param))
    },
    resetRemoveCommandCar: (param) => {
        dispatch(carsAction.resetRemoveCommandCar(param))
    },
    pushCarInCommand: (param) => {
        dispatch(carsAction.pushCarInCommand(param))
    },
    resetPushCarInCommand: (param) => {
        dispatch(carsAction.resetPushCarInCommand(param))
    },
    pushCarInCommandWaiting: () => {
        dispatch(carsAction.pushCarInCommandWaiting())
    },
    getCommandCarList: (param) => {
        dispatch(carsAction.getCommandCarList(param))
    },
    getCommandCarListWaiting: () => {
        dispatch(carsAction.getCommandCarListWaiting())
    },
    finishCarry: (param) => {
        dispatch(carsAction.finishCarry(param))
    },
    resetFinishCarry: () => {
        dispatch(carsAction.resetFinishCarry())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cars)