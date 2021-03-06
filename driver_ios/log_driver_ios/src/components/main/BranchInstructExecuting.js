import React, {Component} from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Linking,
    Alert,
    Dimensions
} from 'react-native'
import {Icon, Button} from 'native-base'
import {connect} from 'react-redux'
import * as actions from '../../actions/index'
import {MapView, Marker} from 'react-native-amap3d'
import globalStyles, {styleColor} from '../utils/GlobalStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const window = Dimensions.get('window')

class BranchInstructExecuting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            modalContacts: false
        }
        this.renderListItem = this.renderListItem.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
        this.changeCarLoadStatus = this.changeCarLoadStatus.bind(this)
        this.changeLoadTaskStatus = this.changeLoadTaskStatus.bind(this)
        this.initView = this.initView.bind(this)
    }

    componentWillMount() {
        this.props.setLoadTaskInfo(this.props.initParam.loadTaskInfo)
    }

    componentDidMount() {
        this.props.setGetRouteLoadTaskListWaiting()
        this.initView()
    }

    initView() {
        const {loadTaskInfo} = this.props.initParam
        InteractionManager.runAfterInteractions(() => {
            this.props.getCoordinate({
                OptionalParam: {
                    receiveId: this.props.branchInstructExecutingReducer.data.loadTaskInfo.receive_id,
                }
            })
            this.props.getRouteLoadTaskList({
                requiredParam: {
                    dpRouteLoadTaskId: loadTaskInfo.id
                },
                OptionalParam: {
                    receiveId: this.props.branchInstructExecutingReducer.data.loadTaskInfo.receive_id,
                },
                dpRouteTaskId: loadTaskInfo.dp_route_task_id
            })
        })
    }

    changeLoadTaskStatus() {
        Alert.alert(
            '提示',
            `确认完成吗？`,
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: '确定', onPress: () => {
                        const {user} = this.props.loginReducer.data
                        const {loadTaskInfo} = this.props.branchInstructExecutingReducer.data
                        this.props.changeLoadTaskStatus({
                            requiredParam: {
                                userId: user.uid,
                                dpRouteLoadTaskId: loadTaskInfo.id,
                                loadTaskStatus: 7,
                                dpRouteTaskId: loadTaskInfo.dp_route_task_id
                            }
                        })
                    }
                },
            ],
            {cancelable: false}
        )
    }

    changeCarLoadStatus(param) {

        Alert.alert(
            '提示',
            `确认该车辆送达？`,
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: '确定', onPress: () => {
                        const { user } = this.props.loginReducer.data
                        this.props.toChangeCarLoadStatus({
                            requiredParam: {
                                userId: user.uid,
                                dpRouteTaskDetailId: param,
                                carLoadStatus: 2
                            }
                        })
                    }
                },
            ],
            {cancelable: false}
        )

    }

    renderFooter() {

        // const { loadTaskInfo } = this.props.initParam
        const {task_status} = this.props.initParam
        if (task_status < 4) {
            return <View />
        } else {
            const {routeLoadTaskList, loadTaskInfo} = this.props.branchInstructExecutingReducer.data
            const total = routeLoadTaskList.reduce((sum, value) => {
                return sum && value.car_load_status == 2
            }, true)
            if (total && loadTaskInfo.load_task_status == 3) {
                return <View style={{padding: 10, alignSelf: 'flex-end'}}>
                    <Button style={{
                        backgroundColor: styleColor,
                        justifyContent: 'center',
                        width: window.width * 0.9,
                        padding: 10,
                        marginBottom: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 50
                    }} onPress={this.changeLoadTaskStatus}>
                        <Text style={[globalStyles.midText, {color: '#fff'}]}>完成</Text>
                    </Button>
                </View>
            } else if (!total && loadTaskInfo.load_task_status == 3) {
                return <View style={{padding: 10, alignSelf: 'flex-end'}}>
                    <Button style={{
                        backgroundColor: '#c4c4c4',
                        justifyContent: 'center',
                        width: window.width * 0.9,
                        padding: 10,
                        marginBottom: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 50
                    }}>
                        <Text style={[globalStyles.midText, {color: '#fff'}]}>完成</Text>
                    </Button>
                </View>
            }
        }

    }

    renderListItem(item, key) {
        // console.log('item', item)
        // console.log('this.props', this.props)
        const {taskListForHomeReducer: {data: {taskList}}} = this.props

        const {task_status} = this.props.initParam
        return <View key={key} style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            borderBottomWidth: 0.5,
            borderColor: '#ccc',
            alignItems: 'center'
        }}>
            <View style={{flexDirection: 'row', flex: 7}}>
                <Icon name='ios-car' style={{fontSize: 15, color: '#8b959b'}}/>
                <Text style={[globalStyles.smallText, {color: '#8b959b', paddingLeft: 10}]}>VIN码：<Text
                    style={{color: item.exception_status == 1 ? '#d69aa5' : '#8b959b'}}>{item.vin ? item.vin : ''}</Text></Text>
            </View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <Text style={[globalStyles.smallText, {
                    color: '#8b959b',
                    marginVertical: task_status < 4 ? 10 : 0
                }]}>{item.make_name ? item.make_name : ''}</Text>
            </View>
            <View style={{flexDirection: 'row', flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
                {item.car_load_status == 2 && task_status > 3 && <Text style={[globalStyles.smallText, {color: styleColor, marginVertical: 10}]}>
                    {item.car_load_status == 2 && '已送达'}</Text>}

                {item.car_load_status == 1 && task_status > 3 && <TouchableOpacity onPress={() => {
                    this.changeCarLoadStatus(item.id)
                }}>
                    <Icon name='ios-checkmark-circle' style={{color: styleColor, fontSize: 25, marginVertical: 5}}/>
                </TouchableOpacity>}
            </View>
        </View>
    }


    render() {
        //console.log('this.props====================', this.props)
        //console.log('this.props.branchInstructExecutingReducer======================', this.props.branchInstructExecutingReducer)
        // const { loadTaskInfo } = this.props.initParam
        const {getRouteLoadTaskList} = this.props.branchInstructExecutingReducer

        //console.log('getRouteLoadTaskList======================', getRouteLoadTaskList)


        if (getRouteLoadTaskList.isResultStatus == 1) {
            return (
                <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator
                        animating={getRouteLoadTaskList.isResultStatus == 1}
                        style={{height: 80}}
                        size="large"
                    />
                </View>
            )
        } else {
            const {routeLoadTaskList, loadTaskInfo, contactList} = this.props.branchInstructExecutingReducer.data
            // console.log('loadTaskInfo', loadTaskInfo)
            return (
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <View style={{height: 200, backgroundColor: '#8b959b'}}>
                        {loadTaskInfo.lat && loadTaskInfo.lng && <MapView
                            locationEnabled
                            zoomLevel={14}
                            coordinate={loadTaskInfo.lat && loadTaskInfo.lng ? {
                                latitude: loadTaskInfo.lat,
                                longitude: loadTaskInfo.lng
                            } : {latitude: 38.92, longitude: 121.60}}
                            showsZoomControls={false}
                            rotateEnabled={true}
                            showsCompass={true}
                            style={{flex: 1}}
                        >
                            <Marker
                                image='flag'
                                title={loadTaskInfo.short_name}
                                coordinate={loadTaskInfo.lat && loadTaskInfo.lng ? {
                                    latitude: loadTaskInfo.lat,
                                    longitude: loadTaskInfo.lng
                                } : {latitude: 38.92, longitude: 121.60}}
                            />
                        </MapView>}
                        {(!loadTaskInfo.lat || !loadTaskInfo.lng) &&
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={[globalStyles.midText, {color: '#fff'}]}>未设置目的地经纬度</Text>
                        </View>}
                        {(loadTaskInfo.lat && loadTaskInfo.lng) && <Button small style={{
                            backgroundColor: styleColor, top: 10,
                            left: 5, width: 30, height: 30, position: 'absolute', justifyContent: 'center'
                        }}
                                                                           onPress={() => {
                                                                               this.setState({modalContacts: true})
                                                                           }}>
                            <MaterialIcons name='near-me' style={{color: '#fff'}} size={20}/>

                        </Button>}
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        backgroundColor: '#fff',
                        justifyContent: 'space-between',
                        borderColor: '#ccc',
                        borderTopWidth: 0.5,
                        alignItems: 'center'
                    }}>
                        <View style={{flex: 3}}>
                            <Text
                                style={[globalStyles.largeText, {color: styleColor}]}>前往：
                                {loadTaskInfo.short_name ? loadTaskInfo.short_name : ''} {loadTaskInfo.make_name ?
                                    `(${loadTaskInfo.make_name})` : ''}</Text>
                            <Text style={[globalStyles.smallText, {color: '#8b959b', paddingTop: 5}]}>
                                <MaterialIcons name='place' size={15}/>
                                {loadTaskInfo.address ? loadTaskInfo.address : ''}</Text>
                        </View>
                        <View style={{flex: 0.5}}>
                            <Button small style={{
                                width: 30,
                                height: 30,
                                alignSelf: 'center',
                                backgroundColor: styleColor,
                                justifyContent: 'center'
                            }} onPress={() => {
                                Alert.alert(
                                    '需求备注',
                                    `${loadTaskInfo.demand_remark ? loadTaskInfo.demand_remark : '无'}`,
                                    [
                                        {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    ],
                                    {cancelable: false}
                                )
                            }}>
                                <MaterialIcons name="assignment" style={{color: '#fff'}} size={20}/>
                            </Button>

                        </View>
                        <View style={{flex: 0.5}}>
                            <Button small style={{
                                width: 30,
                                height: 30,
                                alignSelf: 'center',
                                backgroundColor: styleColor,
                                justifyContent: 'center'
                            }} onPress={() => {

                                if (contactList.length > 0) {
                                    this.setState({modalVisible: true})
                                } else {
                                    // Toast.show({text: '该经销商暂无联系人'})
                                    Alert.alert(
                                        '',
                                        '该经销商暂无联系人',
                                        [
                                            {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                        ],
                                        {cancelable: false}
                                    )
                                }
                            }}>
                                <MaterialIcons name='local-phone' style={{color: '#fff'}} size={20}/>
                            </Button>
                        </View>
                    </View>
                    {loadTaskInfo.cleanRelStatus && <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        backgroundColor: '#f1f6f9',
                        justifyContent: 'space-between',
                        borderColor: '#ccc',
                        borderBottomWidth: 0.5,
                        borderTopWidth: 0.5
                    }}>
                        <View>
                            <Text
                                style={[globalStyles.midText, {color: '#8b959b'}]}>洗车费：{loadTaskInfo.actual_price ? `${loadTaskInfo.actual_price}` : '0'}元</Text>
                        </View>
                        <View>
                            {loadTaskInfo.cleanRelStatus == 0 &&
                            <Text style={[globalStyles.midText, {color: '#8b959b'}]}>未通过</Text>}
                            {loadTaskInfo.cleanRelStatus == 1 &&
                            <Text style={[globalStyles.midText, {color: '#8b959b'}]}>未审核</Text>}
                            {loadTaskInfo.cleanRelStatus == 2 &&
                            <Text style={[globalStyles.midText, {color: '#8b959b'}]}>已通过</Text>}
                        </View>
                    </View>}
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        backgroundColor: '#f1f6f9',
                        justifyContent: 'space-between',
                        borderColor: '#ccc',
                        borderBottomWidth: 0.5,
                    }}>
                        <View>
                            <Text
                                style={[globalStyles.midText, {color: '#8b959b'}]}>计划运送：{loadTaskInfo.plan_count ? `${loadTaskInfo.plan_count}` : '0'}</Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText, {color: '#8b959b'}]}>实际送达：<Text
                                style={{color: styleColor}}>{loadTaskInfo.car_count ? `${loadTaskInfo.car_count}` : '0'}</Text></Text>
                        </View>
                    </View>

                    <FlatList
                        keyExtractor={(item, index) => `${index}`}
                        data={routeLoadTaskList}
                        renderItem={({item, index}) => this.renderListItem(item, index)}
                        ListFooterComponent={this.renderFooter()}/>
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.modalContacts}
                        onRequestClose={() => this.setState({modalContacts: false})}>

                        <TouchableOpacity
                            onPress={() => this.setState({modalContacts: false})}
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                flex: 1
                            }}>
                            <View style={{
                                backgroundColor: '#fff',
                                alignSelf: 'stretch',
                                justifyContent: 'center',
                                borderWidth: 0.5,
                                borderColor: '#ccc',
                            }}>
                                <View style={{borderBottomWidth: 1, borderColor: styleColor}}>
                                    <Text style={[globalStyles.midText, {
                                        paddingVertical: 10,
                                        color: styleColor,
                                        textAlign: 'center'
                                    }]}>请选择地图</Text>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        paddingVertical: 15,
                                        alignItems: 'center',
                                        borderBottomWidth: 0.5,
                                        borderColor: '#ccc'
                                    }}
                                    onPress={() => {
                                        this.setState({modalContacts: false})
                                        Linking.canOpenURL(`amapuri://route/plan/?sname=我的位置&did=BGVIS2&dlat=${loadTaskInfo.lat}&dlon=${loadTaskInfo.lng}&dname=${loadTaskInfo.address}&dev=0&t=0`).then(supported => {
                                            if (supported) {
                                                Linking.openURL(`amapuri://route/plan/?sname=我的位置&did=BGVIS2&dlat=${loadTaskInfo.lat}&dlon=${loadTaskInfo.lng}&dname=${loadTaskInfo.address}&dev=0&t=0`);
                                            } else {
                                                // console.log('无法打开该URI: ' +  'androidamap://route?dlat=40.055878&dlon=116.307854&dname=北京&t=2');
                                            }
                                        })
                                    }}>
                                    <Text>高德地图</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.setState({modalVisible: false})}
                    >
                        <TouchableOpacity
                            onPress={() => this.setState({modalVisible: false})}
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                flex: 1
                            }}>
                            <View style={{
                                backgroundColor: '#fff',
                                alignSelf: 'stretch',
                                justifyContent: 'center',
                                borderWidth: 0.5,
                                borderColor: '#ccc',
                            }}>
                                <View style={{borderBottomWidth: 1, borderColor: styleColor}}>
                                    <Text style={[globalStyles.midText, {
                                        paddingVertical: 10,
                                        color: styleColor,
                                        textAlign: 'center'
                                    }]}>联系人</Text>
                                </View>
                                <FlatList
                                    keyExtractor={(item, index) =>`${index}`}
                                    data={contactList}
                                    renderItem={({item, index}) => {
                                        return (
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                paddingHorizontal: 15,
                                                alignItems: 'center',
                                                borderBottomWidth: 0.5,
                                                borderColor: '#ccc'
                                            }}>
                                                {/* <Icon name='ios-person' style={{ flex: 1, fontSize: 20, color: '#ccc' }} /> */}
                                                <Text style={[globalStyles.midText, {
                                                    paddingVertical: 15,
                                                    flex: 4
                                                }]}>{item.contacts_name ? `${item.contacts_name}` : ''} {item.position ? `(${item.position})` : ''}</Text>
                                                <Text style={[globalStyles.midText, {
                                                    paddingVertical: 15,
                                                    flex: 3,
                                                    textAlign: 'center'
                                                }]}>{item.tel}</Text>
                                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                                    <TouchableOpacity style={{
                                                        width: 30,
                                                        height: 30,
                                                        backgroundColor: styleColor,
                                                        borderRadius: 15,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                                      onPress={() => {
                                                                          if (item.tel) {
                                                                              const url = `tel:${item.tel}`
                                                                              Linking.canOpenURL(url).then(supported => {
                                                                                  if (!supported) {
                                                                                      console.log('Can\'t handle url: ' + url);
                                                                                  } else {
                                                                                      this.setState({modalVisible: false})
                                                                                      return Linking.openURL(url);
                                                                                  }
                                                                              }).catch(err => console.log('An error occurred', err));
                                                                          }
                                                                      }}>
                                                        <Icon name='ios-call' style={{fontSize: 20, color: '#fff'}}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }}/>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        taskListForHomeReducer: state.taskListForHomeReducer,
        branchInstructExecutingReducer: state.branchInstructExecutingReducer,
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRouteLoadTaskList: (param) => {
        dispatch(actions.branchInstructExecutingAction.getRouteLoadTaskList(param))
    },
    setGetRouteLoadTaskListWaiting: () => {
        dispatch(actions.branchInstructExecutingAction.setGetRouteLoadTaskListWaiting())
    },
    toChangeCarLoadStatus: (param) => {
        dispatch(actions.branchInstructExecutingAction.changeCarLoadStatus(param))
    },
    setChangeCarLoadStatusWaiting: () => {
        dispatch(actions.branchInstructExecutingAction.setChangeCarLoadStatusWaiting())
    },
    changeLoadTaskStatus: (param) => {
        dispatch(actions.branchInstructExecutingAction.changeLoadTaskStatus(param))
    },
    setChangeLoadTaskStatusWaiting: () => {
        dispatch(actions.branchInstructExecutingAction.setChangeLoadTaskStatusWaiting())
    },
    setLoadTaskInfo: (param) => {
        dispatch(actions.branchInstructExecutingAction.setLoadTaskInfo(param))
    },
    getCoordinate: param => {
        dispatch(actions.branchInstructExecutingAction.getCoordinate(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchInstructExecuting)
//export default BranchInstructExecuting
