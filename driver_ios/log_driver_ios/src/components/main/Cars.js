import React, {Component} from 'react'
import {View, Text, ActivityIndicator, FlatList, TouchableOpacity, InteractionManager} from 'react-native'
import {Button,Icon,Toast } from 'native-base'
import {connect} from 'react-redux'
import {Actions} from "react-native-router-flux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles from '../utils/GlobalStyles'
import ConfirmModal from '../modules/ConfirmModal'
import * as actions from '../../actions/index'

class Cars extends Component {
    constructor(props) {
        super(props)
        this.state={
            confirmModalVisible:false
        }
        this.onPressOk=this.onPressOk.bind(this)
        this.onPressCancel = this.onPressCancel.bind(this)
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

    componentWillReceiveProps(nextProps) {
        const { carList } = nextProps.carsReducer.data
        const { finishCarry } = nextProps.carsReducer
        const car = carList.find(item => {
            return item.removeCommandCar.isResultStatus == 2
        })
        if (car) {
            Toast.show({text:'移除成功！'})
            this.props.resetRemoveCommandCar(car.data.id)
        }

        if (finishCarry.isResultStatus == 2) {
            Toast.show({text:'装车完毕！'})
            this.props.resetFinishCarry()
        }
    }

    //点击事件
    onSelectCar(param){
        const { user } = this.props.loginReducer.data
        const { taskInfo } = this.props.carsReducer.data
        // this.props.pushCarInCommandWaiting()
        InteractionManager.runAfterInteractions(() => this.props.pushCarInCommand({
            requiredParam: {
                userId: user.uid,
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
    removeCar(param){
        const { taskInfo } = this.props.carsReducer.data
        const { user } = this.props.loginReducer.data
        this.props.removeCommandCar({
            requiredParam: {
                userId: user.uid,
                dpRouteTaskDetailId: param.data.id
            },
            OptionalParam: {
                truckId: taskInfo.truck_id,
                carId: param.data.car_id
            }
        })
    }

    renderListFooter(){
        const { taskInfo } = this.props.carsReducer.data
        if (taskInfo.load_task_status == 1) {
            return <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button small style={{ backgroundColor: globalStyles.styleColor, padding: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, marginTop: 50 }} onPress={this.finishCarry}>
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>完成装车</Text>
                </Button>
            </View>
        } else {
            return <View />
        }
    }
    onPressOk(){
        this.setState({ confirmModalVisible: false })
        const { user } = this.props.loginReducer.data
        const { taskInfo } = this.props.carsReducer.data
        this.props.finishCarry({

            requiredParam: {
                userId: user.uid,
                dpRouteLoadTaskId: taskInfo.id,
                loadTaskStatus: 3
            }
        })

    }
    onPressCancel(){
        this.setState({ confirmModalVisible: false })
    }
    finishCarry(){
        this.setState({ confirmModalVisible: true })
    }
    renderListItem(item){
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
                              style={{ color:globalStyles.styleColor, marginLeft: 10, fontSize: 26 }} />
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
                          style={{ color: globalStyles.styleColor, marginLeft: 10, fontSize: 26 }} />
                </TouchableOpacity>
            </View>
        }
    }



    render() {
        const {carList, taskInfo} = this.props.carsReducer.data
        const {pushCarInCommand, getCommandCarList} = this.props.carsReducer

        if (getCommandCarList.isResultStatus == 1) {
            return (
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator
                            animating={getCommandCarList.isResultStatus == 1}
                            style={{height: 80}}
                            size="large"
                        />
                    </View>
                </View>)
        } else {
            return (
                <View style={{flex: 1}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: '#f2f6f9',
                        borderBottomWidth: 0.5,
                        borderColor: '#a8a8a8'
                    }}>
                        <Text style={globalStyles.smallText}>计划运送：{taskInfo.plan_count ? `${taskInfo.plan_count}` : '0'}</Text>
                        <View style={{flexDirection: 'row'}}>
                            {taskInfo.load_task_status == 1 && pushCarInCommand.isResultStatus != 1 &&
                            <Button small
                                    style={{
                                        backgroundColor:globalStyles.styleColor,
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    }}
                                    onPress={() => Actions.searchCar({
                                        onSelect: this.onSelectCar,
                                        initParam: {carStatus: 1, commandInfo: this.props.initParam.commandInfo}
                                    })}>
                                <MaterialCommunityIcons name='car' size={14} style={{color: '#fff'}}/>
                                <Text style={[globalStyles.smallText, {
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    paddingLeft: 10
                                }]}>装 车</Text>
                            </Button>}
                        </View>
                        {taskInfo.load_task_status == 1 && pushCarInCommand.isResultStatus == 1 &&
                        <View style={{width: 70, alignItems: 'center'}}>
                            <ActivityIndicator
                                animating={true}
                                style={{height: 20, alignSelf: 'center'}}
                                size="small"
                            />
                        </View>}
                    </View>
                    <View style={{flex: 1}}>
                        <FlatList
                            keyExtractor={(item, index) => index}
                            data={carList}
                            renderItem={({item, index}) => this.renderListItem(item, index)}
                            ListFooterComponent={this.renderListFooter}/>
                    </View>
                    <ConfirmModal
                        title='确认要完成装车吗？'
                        isVisible={this.state.confirmModalVisible}
                        onPressOk={this.onPressOk}
                        onPressCancel={this.onPressCancel}
                    />
                </View>
            )

        }
    }

}
const mapStateToProps=(state)=>{
    return{
        loginReducer:state.loginReducer,
        carsReducer:state.carsReducer
    }
}

const mapDispatchToProps=(dispatch)=>({
    removeCommandCar: (param) => {
        dispatch(actions.carsAction.removeCommandCar(param))
    },
    resetRemoveCommandCar: (param) => {
        dispatch(actions.carsAction.resetRemoveCommandCar(param))
    },
    pushCarInCommand: (param) => {
        dispatch(actions.carsAction.pushCarInCommand(param))
    },
    resetPushCarInCommand: (param) => {
        dispatch(actions.carsAction.resetPushCarInCommand(param))
    },
    pushCarInCommandWaiting: () => {
        dispatch(actions.carsAction.pushCarInCommandWaiting())
    },
    getCommandCarList: (param) => {
        dispatch(actions.carsAction.getCommandCarList(param))
    },
    getCommandCarListWaiting: () => {
        dispatch(actions.carsAction.getCommandCarListWaiting())
    },
    finishCarry: (param) => {
        dispatch(actions.carsAction.finishCarry(param))
    },
    resetFinishCarry: () => {
        dispatch(actions.carsAction.resetFinishCarry())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cars)
